import { ls } from './ls.js';

export const currentGame = {

    async get() {

        try {
            const gameId = ls.getGameId();

            const currentGameResponse = await fetch(
                `http://localhost:3000/api/games/${gameId}`
            );

            if (!currentGameResponse.ok) {
                return null;
            }

            const data = await currentGameResponse.json();
            return data.game;

        } catch (error) {
            throw new Error(`Failed to get current game: ${error.message}`);
        }
    },

    async getCurrentRoom() {

        try {

            const game = await this.get();

            if (!game) {
                throw new Error(`Current game is null.`);
            }

            return game.current_room;

        } catch (error) {
            throw new Error(`Failed to get current room: ${error.message}`);
        }
    },

    async getByPlayerId() {

        try {
            const playerId = ls.getPlayerId();

            const currentGameResponse = await fetch(
                `http://localhost:3000/api/games/current/${playerId}`
            );

            if (!currentGameResponse.ok) {
                return null;
            }

            const data = await currentGameResponse.json();
            return data.game;

        } catch (error) {
            throw new Error(`Failed to get current game: ${error.message}`);
        }
    },

    async setCurrentRoom(nextRoom) {

        try {

            const gameId = ls.getGameId();

            const updateGameRequest = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ current_room: nextRoom })
            };

            const updateGameResponse = await fetch(
                `http://localhost:3000/api/games/${gameId}`,
                updateGameRequest
            );

            if (!updateGameResponse.ok) {
                throw new Error("Failed to update room")
            }

        } catch (error) {
            throw new Error(`Failed to get update room: ${error.message}`);
        }
    },

    async isActive() {
        const game = await this.getByPlayerId();
        return game ? true : false;
    }
};
