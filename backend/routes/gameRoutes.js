import { Router } from "express";
import * as GameController from "../controllers/gameController.js";

export const GameRouter = Router();

GameRouter.post("/api/games", GameController.createGame);
GameRouter.get("/api/games/:playerId/current", GameController.getCurrentGameByPlayer);
GameRouter.get("/api/games/:gameId", GameController.getGameById);
GameRouter.patch("/api/games/:gameId", GameController.updateGame);