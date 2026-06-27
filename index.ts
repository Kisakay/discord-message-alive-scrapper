import { Client, GuildChannel } from "discord.js-selfbot-v13";
import config from "./config.ts";
import "./colors.ts";
import { SquirrelDB } from 'squirreldb';
import type { MessageObject } from "./interface.ts";
import { downloadAvatarInb64, generateBase64ArrayFromAttachment } from "./func.ts";

import "./server.ts";

// ++++++++++++++++++++++++++++ CLIENT
const client = new Client();
const db = new SquirrelDB({ filePath: "database.sqlite", tables: ['messages'] });

await db.initTable('messages', {
    columns: [
        ['guild_id', "string"],
        ['channel_id', 'string'],
        ['metadatas', "json"]
    ]
})
client.on("ready", async () => {
    console.log("> ", client.user?.username, ' ( ID: ', client.user?.id, ' )');
});


client.on("messageCreate", async (message) => {
    if (message.guildId !== config.server_id) return;
    if (message.author.bot) return;

    try {
        const messageObject: MessageObject = {
            channel: {
                id: message.channel.id,
                name: (message.channel as GuildChannel).name,
                type: (message.channel as GuildChannel).type.toString(),
            },
            guildId: message.guildId || message.guild?.id!,
            message: {
                content: message.content,
                id: message.id,
                repliedMentions: message.reference?.messageId!,
                timestamp: message.createdTimestamp,
                files_b64: await generateBase64ArrayFromAttachment(message),
                files_urls: message.attachments.values().toArray().map(x => { return x?.proxyURL }) || [],
            },
            user: {
                avatar_url: message.author.displayAvatarURL({ format: "webp", size: 4096 }),
                displayName: message.author.globalName || message.author.displayName,
                flags: message.author.flags!,
                id: message.author.id,
                username: message.author.username,
                avatar_b64: await downloadAvatarInb64(message.author.displayAvatarURL({ format: "webp", size: 2048 }))
            }
        };

        await db.add('messages', {
            id: message.id,
            /**
        ['guild_id', "string"],
        ['channel_id', 'string'],
        ['metadatas', "json"]

             */
            guild_id: message.guildId,
            channel_id: message.channelId,
            metadatas: messageObject
        });
        console.log(`[`.boldText.blue, "+".green, "]".boldText.blue, ">>".gray, 'New message stored (', message.id, ')')

    } catch (error) {
        console.error(error)
    }
})


process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error)
client.login(config.client_token);

