import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

const mapTokenDuration = {
  api: "15m",
  client: "24h",
};


export function signToken(payload, context = "api") {
  const expiresIn = mapTokenDuration[context] || "15min";

  return jwt.sign(payload, JWT_SECRET, { expiresIn, issuer: "overtime-app" });
}
