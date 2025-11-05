import { getPlayerByUsername } from "../services/playerService.js";
import { comparePassword } from "../helpers/hash.js"
import { signToken, verifyToken } from "../services/authService.js";


export async function loginUser(req, res) {
  const { username, password, token_context } = req.body ?? {};
  const context = token_context === "client" ? "client" : "api";

  if (!username || !password) {
    return res.status(400).json({ error: "Credentials are missing for required fields username and password." })
  }


  try {
    const player = await getPlayerByUsername(username, "auth")
    if (!player) {
      return res.status(401).json({ error: "Invalid credentials" });

    }

    const hashedPassword = player.password_hash;
    const isMatch = await comparePassword(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });

    }

    const token = signToken({ id: player.id, username: player.username }, context);
    return res.status(200).json({ 
      token, 
      username: player.username });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })

  }

}

export function verifyMyToken(req, res) {
  const token = req.headers.authorization;

  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header", status: false });

  }


  try {
    const myToken = token.split(" ")[1];

    const myVerifiedToken = verifyToken(myToken);
    return res.status(200).json({ myVerifiedToken, status: true });

  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token refresh", status: false });

  }


}
