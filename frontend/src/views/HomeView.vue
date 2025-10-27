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
          <Button class="btn-meny btn-start" text="Start Game" @click="goTo('/game-intro')" />
          <Button class="btn-meny" text="Profile" @click="goTo('/profile')" />
          <Button class="btn-meny" text="Leaderboard" @click="goTo('/leaderboard')" />
          <Button class="btn-meny" text="Logout" @click="goTo('/')" />
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
  border: 2px solid #E69138;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.container-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.container-buttons :deep(button) {
  width: 100%;
  height: 3rem;
  font-size: 1.2rem;
  border-radius: 0.2rem;
}

.container-buttons .btn-meny {
  border: 2px solid #E69138;
  background-color: transparent;
  color: white;
}

.container-buttons .btn-meny:hover {
  transform: scale(1.1);
  border: 4px dashed white;
}

.container-buttons .btn-start {
  background: #E69138;
  color: white;
  height: 5rem;
  font-size: 2rem;
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
    padding-bottom: 3rem;
  }

  .container-text {
    gap: 1rem;
  }

  .overtime-slogan {
    font-size: 1rem;
  }

  .container-buttons .btn-start {
    height: 4rem;
    font-size: 1.6rem;
  }
}

</style>