import { db } from "../db/index.js";

export async function getAllPlayers() {
  try {
    const [results] = await db.query("SELECT id, username FROM `player`");

    return results;
  } catch (err) {
    return err;
  }
}


export async function getPlayerByUsername(username, columns = null, context = "default") {

  const columnsMappedByContext = {
    default: ["id", "username"],
    auth: ["id", "username", "password_hash"],
  }

  const selectedColumns = columns || columnsMappedByContext[context] || columnsMappedByContext.default;
  const fields = selectedColumns.join(", ")

  try {
    const [results] = await db.query(`SELECT ${fields} FROM player WHERE username = ?`, [username]);
    return results[0] || null;
  } catch { err } {
    throw err;
  }

}

export async function createPlayer(username, password_hash) {
  try {
    const [results] = await db.query(`INSERT INTO player (username, password_hash) VALUES (?, ?)`, [username, password_hash]);
    return { id: results.insertId, username };

  } catch (err) {
    throw err;
  }

}
