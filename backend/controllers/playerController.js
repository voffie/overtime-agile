import * as PlayerService from "../services/playerService.js";

export async function getAllPlayers(req, res) {
  try {
    const players = await PlayerService.getAllPlayers();
    res.json({ players });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
