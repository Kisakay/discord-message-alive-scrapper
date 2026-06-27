import express from "express";
import config from "./config.ts";

import path from "node:path";

import "./colors"
import database from "./database";
export const app = express();

app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(process.cwd(), 'index.html')))

app.listen(config.server_port, () => {
    console.log(`[`.boldText.blue, "+".green, "]".boldText.blue, ">>".gray, 'Server is listening (', config.server_port, ')')
});

app.get("/api/get", async (req, res) => {
    let params = req.params;

    if (!params || params !== config.secret_key) {
        return res.status(403).json(JSON.stringify({ message: "Fils de viol, casse toi de là!" }))
    };

    const messages = await database.all("messages") || [];

    return res.status(200).send(JSON.stringify({ messages }));
});