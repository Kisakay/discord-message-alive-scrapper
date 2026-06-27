import type { Message } from "discord.js-selfbot-v13";

export async function generateBase64ArrayFromAttachment(message: Message): Promise<string[]> {
    let attachments = message.attachments.values().toArray();

    if (attachments.length === 0) return [];

    let b64s: string[] = [];

    for (let attachment of attachments) {
        let url = attachment.proxyURL;

        const res = await fetch(url, {
            method: "GET",
        });

        const resBuffer = await res.arrayBuffer();

        const buffer = Buffer.from(resBuffer).toBase64();

        b64s.push(buffer);
    }


    return b64s || [];
}


export async function downloadAvatarInb64(url: string): Promise<string> {
    const res = await fetch(url, {
        method: "GET",
    });

    const resBuffer = await res.arrayBuffer();

    const buffer = Buffer.from(resBuffer).toBase64();

    return buffer || "";
}