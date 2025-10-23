import * as PlayerService from "../services/playerService.js";
import * as passwordHash from "../helpers/hash.js";

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
      return res.status(404).json({ error: "Player not found", error: "404 Not Found!" });
    }
    return res.json({ player });
  } catch (error) {
    return res.status(500).json({
      error
    })

  }

}


export async function createPlayer(req, res) {
  const { username, password } = req.body;

  if (!username || typeof username !== "string" || username.trim() === "" || username.length <= 4) {
    return res.status(400).json({ error: "Invalid username. Username is a required" })
  }

  if (!password || typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({ error: "Invalid Password: Password is a required" })
  }

  if (!passwordHash.hashPasswordValidFormat(password)) {
    return res.status(400).json({ error: "Invalid Password Format: Password must be 8-64 characters and contain only letters, numbers, and @!?_.- " })
  }

  // Reason to have this: Trying to early exit before hash and attempt to insert player in DB. Aware that it cost an extra question to db. 
  const hasDBPlayer = await PlayerService.getPlayerByUsername(username);
  if (hasDBPlayer) {
    return res.status(409).json({ error: "Invalid username: Not Unique" });
  }


  try {

    const hashedPassword = await passwordHash.hashPassword(password);
    const result = await PlayerService.createPlayer(username, hashedPassword);
    return res.status(201).json({ player: result, success: "Player was added to database" });

  } catch (error) {

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "User already exists" });
    }

    return res.status(500).json({ error: "Server error" });

  }


}
