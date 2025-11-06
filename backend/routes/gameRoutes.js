import { Router } from "express";
import * as GameController from "../controllers/gameController.js";

export const GameRouter = Router();

GameRouter.post("/api/games", GameController.createGame);
GameRouter.get(
  "/api/games/current/:playerId",
  GameController.getCurrentGameByPlayerId,
);
GameRouter.get("/api/games/:gameId", GameController.getGameById);
GameRouter.patch("/api/games/:gameId", GameController.updateGame);
GameRouter.delete("/api/games/:gameId", GameController.deleteGame);
GameRouter.get("/api/games/top5/:username", GameController.getTop5Games);