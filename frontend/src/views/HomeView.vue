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
          <Button text="Start Game" @click="goTo('/game-intro')" />
          <Button text="Profile" @click="goTo('/profile')" />
          <Button text="Leaderboard" @click="goTo('/leaderboard')" />
          <Button text="Logout" @click="goTo('/')" />
        </div>
      </div>
    </div>
    

    <div class="container-right">
      <div class="container-text">

      <img class="west-logo" src="@/assets/img/West_Logo.svg" alt="West logo" />

      <p>presents</p>
      
      <img class="overtime-logo" src="@/assets/img/home/overtime-logo-white.svg" alt="Overtime logo" />
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
  padding: 1rem;
}

.container-left {
  flex: 0.8;
}

.container-right {
  flex: 1.2;
}

.container-meny {
  width: 80%;
  background: var(--container-bg);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
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

.container-text {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.west-logo {
  width: 50%;
}

.overtime-logo {
  width: 100%;
}

@media screen and (max-width: 768px) {

  .container-main {
    flex-direction: column-reverse;
    overflow: scroll;
  }

  .container-text {
    gap: 0.5rem;
  }

  .container-left,
  .container-right {
    padding: 0.5rem;
  }

  .container-left {
    padding-bottom: 3rem;
  }

}

</style>