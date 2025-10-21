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

export async function getPlayerByUsername(req, res) {
  const username = req.params.username;

  try {
    const player = await PlayerService.getPlayerByUsername(username);
    if (!player) {
      return res.status(404).json({ errormessage: "Player not found", error: "404 Not Found!" });
    }
    return res.json({ player });
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })

  }

}
