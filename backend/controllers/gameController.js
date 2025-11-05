import * as GameService from "../services/gameService.js";

export async function getGameById(req, res) {

    try {
        const gameId = req.params.gameId;
        const game = await GameService.getGameById(gameId);

        if (!game) {
            return res.status(404).json({ error: `Game with id ${gameId} not found.` });
        }

        return res.status(200).json({ game: game });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getCurrentGameByPlayerId(req, res) {

    try {
        const playerId = req.params.playerId;
        const currentGame = await GameService.getCurrentGameByPlayerId(playerId); // game object or null.

        if (!currentGame) {
            return res.status(404).json({ error: `Current game with playerId ${playerId} not found.` });
        }

        return res.status(200).json({ game: currentGame });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function createGame(req, res) {

    try {
        const { playerId } = req.body;

        if (!playerId) {
            return res.status(400).json({ error: "Cannot create game without playerId." });
        }

        const result = await GameService.createGame(playerId); // returns the newly created game:s id.
        return res.status(201).json({ gameId: result.id });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function updateGame(req, res) {

    try {
        const gameId = req.params.gameId;
        const update = req.body;

        if (update.id || update.playerId) {
            return res.status(400).json({ error: `Invalid request format for updating game.` });
        }

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

export async function deleteGame(req, res) {
  try {
    const gameId = req.params.gameId;

    const existingGame = await GameService.getGameById(gameId);

    if (!existingGame) {
      return res
        .status(404)
        .json({ error: `Game with id ${gameId} not found.` });
    }

    await GameService.deleteGameById(gameId);

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

