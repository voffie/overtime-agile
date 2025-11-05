import { db } from "../db/index.js";

/* 
    mysql2:s db.query() and db.excecute() always returns a 2-element array:

        [results, fields]
    
    the results are:

    Array      for SELECT. Containing the matching rows like this:

        [ {id: 1, name: "A"}, {id: 2, name: "A"} ]

    Object     for INSERT, UPDATE, DELETE. Containing a summary of the operation like this:

        {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 42,        // ID of the new row (if table has AUTO_INCREMENT)
            info: '',
            etc..
        }
*/

export async function createGame(playerId) {

    try {

        const inProgressGame = await getCurrentGameByPlayerId(playerId);

        if (inProgressGame) {
            throw new Error("There is already a game in-progress for this player.");
        }

        const [results] = await db.query(`
        INSERT INTO game (playerid) 
        VALUES (?)`, [playerId]);

        return { id: results.insertId }; // returns the newly created game:s id.

    } catch (error) {
        throw new Error(`Failed to INSERT new game to database with playerId: ${playerId}. ${error.message}`);
    }
}

export async function getGameById(id) {

    try {

        const [results] = await db.query(`
        SELECT * FROM game 
        WHERE id = ?
        `, [id]);

        return results[0] || null;

    } catch (error) {
        throw new Error(`Failed to SELECT game from database with id: ${id}. ${error.message}`);
    }
}

export async function getCurrentGameByPlayerId(playerId) {

    try {

        const [results] = await db.query(`
        SELECT * FROM game 
        WHERE playerid = ? 
        AND is_completed = FALSE
        `, [playerId]);

        return results[0] || null;

    } catch (error) {
        throw new Error(`Failed to SELECT game from database with playerId: ${playerId}. ${error.message}`);
    }
}

export async function updateGame(id, updatedGame) {

    try {

        const [results] = await db.query(`
        UPDATE game
        SET ?
        WHERE id = ?
        `, [updatedGame, id]);

        if (results.affectedRows === 0) {
            throw new Error(`No rows affected by update.`);
        }

        return true;

    } catch (error) {
        throw new Error(`Failed to UPDATE game in database with id: ${id}. ${error.message}`);
    }
}

export async function deleteGameById(id) {
  try {
    const [results] = await db.query("DELETE FROM game WHERE id = ?", [id])

    if (results.affectedRows === 0) {
      throw new Error(`No rows affected by delete.`)
    }
  } catch (error) {
    throw new Error(`Failed to DELETE game in database with id: ${id}. ${error.message}`)
  }
}
