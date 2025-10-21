import bcrypt from "bcrypt"

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 5;

export async function hashPassword(plainString) {
  if (typeof plainString !== "string" || plainString.trim() === "") {
    throw new Error("Invalid Password");
  }

  const hashedPassword = await bcrypt.hash(plainString, SALT_ROUNDS)
  return hashedPassword;

}

export async function comparePassword(plainString, hashedPassword) {
  const result = await bcrypt.compare(plainString, hashedPassword);
  return result;
}


export function hashPasswordValidFormat(plainString) {
  const patternRegex = /^[A-Za-z0-9@!?_.\- ]{8,64}$/;
  return typeof plainString === "string" && patternRegex.test(plainString);
}
