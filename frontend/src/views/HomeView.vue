<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { ls } from '@/utils/ls.js';
import { currentGame } from '@/utils/currentGame.js';

const router = useRouter();
const errorMessage = ref("");
const hasCurrentGame = ref(false);
const btnTopText = ref("");

function handleGame() {

  if(hasCurrentGame.value === null) {
    return // do nothing
  } else if (hasCurrentGame.value) {
    continueGame();
  } else {
    startNewGame();
  }
}

async function startNewGame() {

  try {
    const newGameId = await createNewGame();
    ls.setGameId(newGameId);
    routeTo("/game-intro");

  } catch (error) {
    errorMessage.value = "Failed to start game.";
    throw new Error(`Failed to start game: ${error.message}`);
  }
}

async function continueGame() {

  try {

    const currentRoom = await currentGame.getCurrentRoom();
    routeTo(`/room/${currentRoom}`);
    
  } catch (error) {
    errorMessage.value = "Failed to continue game.";
    console.error(`Failed to continue game: ${error.message}`);
  }
  
  
}

async function createNewGame() {

  try {

    const playerId = ls.getPlayerId();

    const newGameRequest = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId })
    };
  
    const newGameResponse = await fetch(
      "http://localhost:3000/api/games", 
      newGameRequest
    );
    
    const data = await newGameResponse.json();

    if(!newGameResponse.ok) {
      throw new Error(data.error);
    }

    return data.gameId;

  } catch (error) {
    throw new Error(`Failed to create game: ${error.message}`);
  }
}

function routeTo(route) {
  router.push(route)
}

function handleLogout() {
  ls.removeAll();
  routeTo('/');
}

onMounted( async() => {
  
  try {

    const maybeCurrentGame = await currentGame.getByPlayerId();

    if(maybeCurrentGame) {
      ls.setGameId(maybeCurrentGame.id);
      hasCurrentGame.value = true;
      btnTopText.value = "Continue Game";
    } else {
      hasCurrentGame.value = false;
      btnTopText.value = "Start Game";
    }

  } catch (error) {
    errorMessage.value = "Failed to check current game";
    console.error(`Failed to check current game: ${error.message}`);
    hasCurrentGame.value = null;
    btnTopText.value = "ERROR"
  }
  
});

</script>

<template>
  <div class="container-main">

    <div class="container-left">
      <div class="container-meny">
        <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="container-buttons">
          <button class="btn-meny btn-top" @click="handleGame">{{ btnTopText }}</button>
          <button class="btn-meny" @click="routeTo('/profile')">Profile</button>
          <button class="btn-meny" @click="routeTo('/leaderboard')">Leaderboard</button>
          <button class="btn-meny" @click="handleLogout">Logout</button>
        </div>
      </div>
    </div>
    

    <div class="container-right">
      <div class="container-text">
        <img class="overtime-logo" src="@/assets/img/home/overtime-logo-v1-orange.svg" alt="Overtime logo" />
        <p class="overtime-slogan">a mystery puzzle game</p>
    </div>

    </div>
  </div>
  
</template>

<style scoped>

.container-main {
  display: flex;
  height: 100%;
}

.container-left,
.container-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-left {
  flex: 0.8;
}

.container-right {
  flex: 1.2;
}

.container-meny {
  width: 80%;
  background: transparent;
  border: 4px solid #E69138;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
  gap: 1rem;
}

.container-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.btn-meny {
  border: 2px solid #E69138;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.btn-meny:hover {
  transform: scale(1.1);
  border: 2px dashed white;
}

.btn-top {
  background: #E69138;
  color: white;
  height: 5rem;
  font-size: 1.8rem;
}

.container-text {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.overtime-logo {
  width: 100%;
}

.overtime-slogan {
  font-size: 1.5rem;
  color: #E69138;
}

.error {
  color: red;
}

@media screen and (max-width: 768px) {

  .container-main {
    flex-direction: column-reverse;
  }

  .container-left {
    flex: 1.4;
  }

  .container-right {
    flex: 0.6;
  }
  
  .container-meny {
    border: 3px solid #E69138;
    padding: 2rem;
    align-self: first baseline;
    margin-top: 1rem;
  }

  .container-buttons {
    gap: 1.2rem;
  }

  .btn-meny {
    border: 1.5px solid #E69138;
    font-size: 1rem;
  }

  .btn-meny:hover {
    transform: scale(1.05);
    border: 1.5px dashed white;
  }

  .btn-top {
    height: 3rem;
    font-size: 1.5rem;
  }

  .container-text {
    gap: 1rem;
  }

  .overtime-slogan {
    font-size: 1.2rem;
  }
}

</style>