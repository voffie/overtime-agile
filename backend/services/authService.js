import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined as environment variable");
}

const mapTokenDuration = {
  api: "15m",
  client: "24h",
};


export function signToken(payload, context = "api") {
  const expiresIn = mapTokenDuration[context] || "15m";

  return jwt.sign(payload, JWT_SECRET, { expiresIn, issuer: "overtime-app" });
}

export function verifyToken(token) {

  try {
    const tokenVerified = jwt.verify(token, JWT_SECRET);
    return tokenVerified;

  } catch (error) {
    throw error

  }

}
