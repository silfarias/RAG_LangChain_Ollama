import { router } from "./src/routes/question.routes.js";
import { env } from "./src/config/env.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
});