import { Router } from "express";
import * as PlayerController from "../controllers/playerController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { verifySelf } from "../middlewares/authVerifySelf.js";

export const PlayerRouter = Router();

PlayerRouter.get("/api/players", PlayerController.getAllPlayers);
PlayerRouter.post("/api/players", PlayerController.createPlayer);
PlayerRouter.get("/api/players/:username", PlayerController.getPlayerByUsername);


PlayerRouter.delete("/api/players/:username", requireAuth, verifySelf, PlayerController.deletePlayer)
PlayerRouter.put("/api/players/:username", requireAuth, verifySelf, PlayerController.updatePlayer)


