import { Router } from "express";
import * as PlayerController from "../controllers/playerController.js";

export const PlayerRouter = Router();

PlayerRouter.get("/api/players", PlayerController.getAllPlayers);

PlayerRouter.get("/api/players/:username", PlayerController.getPlayerByUsername);
