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

    async updateCurrentRoom(room) {

        try {

            const allowedRooms = ['break', 'archive', 'design', 'server', 'office', 'ending'];

            if (!allowedRooms.includes(room)) {
                throw new Error(`Invalid room: "${room}".`);
            }

            const gameId = ls.getGameId();

            const updateGameRequest = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ current_room: room })
            };

            const updateGameResponse = await fetch(
                `http://localhost:3000/api/games/${gameId}`,
                updateGameRequest
            );

            const data = await updateGameResponse.json();

            if (!updateGameResponse.ok) {
                throw new Error(data.error);
            }

        } catch (error) {
            throw new Error(`Failed to update current room: ${error.message}`);
        }
    },

    async updateTimeForCurrentRoom(time) {

        try {

            const maybeTime = Number(time);

            // Number(null or "") = 0
            // Number(undefined or not a number) = NaN
            if (isNaN(maybeTime) || maybeTime === 0) {
                throw new Error(`Invalid time: "${time}".`);
            }

            const gameId = ls.getGameId();
            const currentRoom = await this.getCurrentRoom();

            const updateGameRequest = {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [`time_room_${currentRoom}`]: time })
            };

            const updateGameResponse = await fetch(
                `http://localhost:3000/api/games/${gameId}`,
                updateGameRequest
            );

            const data = await updateGameResponse.json();

            if (!updateGameResponse.ok) {
                throw new Error(data.error);
            }

        } catch (error) {
            throw new Error(`Failed to update time for current room: ${error.message}`);
        }
    },

    async isActive() {
        const game = await this.getByPlayerId();
        return game ? true : false;
    }
};
