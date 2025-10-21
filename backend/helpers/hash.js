import bcrypt from "bcrypt"

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 5;

export async function testEnv() {

  console.log(SALT_ROUNDS);
  const hashed = await bcrypt.hash("Hello", SALT_ROUNDS);

  console.log(`${hashed} Hello encrypted`);

}


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
