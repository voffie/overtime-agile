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
  let sql;
  let params = [username];

  if (context === "auth") {
    sql = `SELECT id, username, password_hash FROM player WHERE username = ? LIMIT 1`;
  } else {
    sql = `SELECT id, username FROM player WHERE username = ? LIMIT 1`;
  }

  try {
    const [results] = await db.query(sql, params);
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

export async function deletePlayer(username) {

  try {
    const [results] = await db.query(`DELETE FROM player WHERE username = ? LIMIT 1`, [username]);

    if (results.affectedRows === 0) {
      return {
        success: false,
        message: `No player found with username: ${username}`,
        affectedRows: 0

      };
    }

    return {
      success: true,
      message: `Deleted player with username: ${username}`,
      affectedRows: 1

    };

  } catch (err) {
    throw err;

  }
}

export async function updatePlayer(username, newHash) {
  const [results] = await db.query(`UPDATE player SET password_hash = ? WHERE username = ?`, [newHash, username])
  return {
    affectedRows: results.affectedRows,
    message: results.affectedRows > 0 ? "Password updated" : "No user found",
  };

}
