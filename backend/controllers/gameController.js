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

export async function getGameById(req, res) {

    try {
        const gameId = req.params.gameId;
        const game = await GameService.getGameById(gameId);
        return res.status(200).json({ game: game });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateGame(req, res) {

    try {

        const gameId = req.params.gameId;
        const update = req.body;
        const existingGame = await GameService.getGameById(gameId);

        if (!existingGame) {
            return res.status(404).json({ error: `Game with id ${gameId} not found.` });
        }

        const updatedGame = { ...existingGame, ...update };

        const response = await GameService.updateGame(gameId, updatedGame);

        return res.status(200).json({ success: response });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getCurrentGameByPlayer(req, res) {

    try {

        // gets the playerId from the request endpoint (URL) passed in the parameter.
        const playerId = req.params.playerId;

        // return the currentGame object or null if none "in-progress"
        const currentGame = await GameService.getCurrentGameByPlayer(playerId);
        return res.status(200).json({ game: currentGame });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
