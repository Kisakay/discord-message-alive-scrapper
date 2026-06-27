import { SquirrelDB } from 'squirreldb';

const database = new SquirrelDB({ filePath: "database.sqlite", tables: ['messages'] });

await database.initTable('messages', {
    columns: [
        ['guild_id', "string"],
        ['channel_id', 'string'],
        ['metadatas', "json"]
    ]
});

export default database;