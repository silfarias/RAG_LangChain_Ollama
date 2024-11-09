import { env } from "./src/config/env.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
});