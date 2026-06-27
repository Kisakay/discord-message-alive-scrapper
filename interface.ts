import type { UserFlags } from "discord.js-selfbot-v13";
import type { ChannelTypes } from "discord.js-selfbot-v13/typings/enums";

export interface MessageObject {
    guildId: string;
    channel: Channel;
    user: User;
    message: Message;
}

export interface Channel {
    id: string;
    name: string;
    type: string
}

export interface User {
    id: string;
    username: string;
    displayName: string;

    avatar_url: string;
    avatar_b64?: string;

    flags: UserFlags;


}

export interface Message {
    id: string;
    content: string;
    timestamp: number | Date;

    files_urls: string[];
    files_b64: string[];

    repliedMentions: string;


}