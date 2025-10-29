<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()

function goTo(route) {
  router.push(route)
}
</script>

<template>
  <div class="container-main">

    <div class="container-left">
      <div class="container-meny">
        <div class="container-buttons">
          <button class="btn-meny btn-start" @click="goTo('/game-intro')">Start Game</button>
          <button class="btn-meny" @click="goTo('/profile')">Profile</button>
          <button class="btn-meny" @click="goTo('/leaderboard')">Leaderboard</button>
          <button class="btn-meny" @click="goTo('/')">Logout</button>
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
  justify-content: center;
  align-items: center;
  padding: 2.5rem;
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

.btn-start {
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

  .btn-start {
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