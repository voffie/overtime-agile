import * as GameService from "../services/gameService.js";

export async function createGame(req, res) {

    try {

        const { playerId } = req.body;

        // GameService.createGame(playerId) returns:
        // if successfull = a object containing the newly created game:s id = { id: results.insertId }
        // else = throws error
        const result = await GameService.createGame(playerId);

        return res.status(201).json({ gameId: result.id });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getGameInProgressByPlayer(req, res) {

    try {

        // gets the playerId from the request endpoint (URL) passed in the parameter.
        const playerId = req.params.playerId;

        // return the currentGame object or null if none "in-progress"
        const currentGame = await GameService.getGameInProgressByPlayer(playerId);
        return res.status(200).json({ game: currentGame });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
