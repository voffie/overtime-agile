import { Router } from "express";
import * as GameController from "../controllers/gameController.js";

export const GameRouter = Router();

GameRouter.post("/api/games", GameController.createGame);
GameRouter.get("/api/games/in-progress/:playerId", GameController.getGameInProgressByPlayer);