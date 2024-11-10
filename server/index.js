import { router } from "./src/routes/question.routes.js";
import { environment } from "./src/config/env.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(environment.PORT, () => {
    console.log(`Server running on http://localhost:${environment.PORT}`);
});