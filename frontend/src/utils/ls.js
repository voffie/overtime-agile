export const ls = {

    getPlayerId() {

        const playerId = localStorage.getItem('currentPlayerId');

        if (!playerId) {
            throw new Error("No currentPlayerId found in localStorage.");
        }

        return playerId;
    },

    getGameId() {

        const gameId = localStorage.getItem('currentGameId');

        if (!gameId) {
            throw new Error("No currentGameId found in localStorage.");
        }

        return gameId;
    },

    setPlayerId(playerId) {

        const maybePlayerId = Number(playerId);

        // Number(null or "") = 0
        // Number(undefined or not a number) = NaN
        if (isNaN(maybePlayerId) || maybePlayerId === 0) {
            throw new Error("Invalid playerId. Cannot set in localstorage.");
        }

        localStorage.setItem('currentPlayerId', playerId);
    },

    setGameId(gameId) {

        const maybeGameId = Number(gameId);

        // Number(null or "") = 0
        // Number(undefined or not a number) = NaN
        if (isNaN(maybeGameId) || maybeGameId === 0) {
            throw new Error("Invalid gameId. Cannot set in localstorage.");
        }

        localStorage.setItem('currentGameId', gameId);
    },

    removeGameId() {
        localStorage.removeItem('currentGameId');
    },

    removePlayerId() {
        localStorage.removeItem('currentPlayerId');
    },

    removeToken() {
        localStorage.removeItem('token');
    },

    removeAll() {
        this.removeGameId();
        this.removePlayerId();
        this.removeToken();
    }
}

