import { db } from "../db/index.js";

export async function getAllPlayers() {
  try {
    const [results] = await db.query("SELECT id, username FROM `player`");

    return results;
  } catch (err) {
    return err;
  }
}
