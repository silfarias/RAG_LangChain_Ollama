import { Router } from "express";
import { askQuestion } from "../controllers/question.controller.js";

const router = Router();

router.post('/ask', askQuestion);

export { router };