import { getPlayerByUsername } from "../services/playerService.js";
import { comparePassword } from "../helpers/hash.js"
import { signToken } from "../services/authService.js";


export async function loginUser(req, res) {
  const { username, password } = req.body;

  const player = await getPlayerByUsername(username, null, "auth")
  if (!player) {
    return res.status(401).json({ error: "Invalid credentials" });

  }

  const hashedPassword = player.password_hash;

  const isMatch = await comparePassword(password, hashedPassword);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });

  }

  const token = signToken({ id: player.id, username: player.username }, "api");
  return res.status(200).json({ token });

}
