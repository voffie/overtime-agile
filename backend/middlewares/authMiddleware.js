import { verifyToken } from "../services/authService.js";

export function requireAuth(req, res, next) {

  const reqHeader = req.headers.authorization;

  if (!reqHeader || !reqHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });

  }

  const token = reqHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    console.log(req.user);
    next();

  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });

  }

}
