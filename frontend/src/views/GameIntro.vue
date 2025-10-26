<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const router = useRouter()

function goToNextRoom() {
  router.push('/room/break')
}
</script>

<template>
  <div class="center">
    <div>
      <img class="logo-img" src="@/assets/img/HeartCoreLogoGray.png" alt="Heartcore logo gray" />
    </div>
    <div class="flexContainer">
      <div class="container">
        <h2>19:07 - Heartcore HQ, Floor 18</h2>
        <p>
          Another late night. The office is quiet—just the low hum of machines and the soft tick of
          a digital wall clock. Everyone else left hours ago. You're still here, catching up on
          backlog reports that should’ve been automated weeks ago. At Heartcore, they call it
          "building the future of connection." You call <strong>unpaid overtime.</strong>
          <br /><br />
          You're part of the Guini Division—Heartcore’s crown jewel. Guini is the smart planner for
          modern families: a friendly, voice-activated assistant that helps parents and kids
          coordinate their chores, homework, groceries, even downtime. Simple. Seamless. Safe.<br /><br />
          Your job? Product Integration Analyst. Which mostly means making sure Guini “feels human”
          enough in partner households without raising privacy flags. You lean back in your chair,
          stretching. The office lights above you dim slightly, like they’re encouraging you to
          leave. Your stomach growls in agreement. You decide to head to the breakroom to grab
          something to keep you going…
        </p>
      </div>
      <div>
        <img class="main-img" src="@/assets/img/overtimeprojectimage2.png" alt="picture of Guini" />
      </div>
    </div>

    <Button text="Go to a breakroom" @click="goToNextRoom" />
  </div>
</template>

<style scoped>
.center {
  padding: 30px;
  text-align: justify;
  padding-top: 0;
}

.logo-img {
  width: 300px;
  height: auto;
  align-self: center;
}

h2 {
  font-size: 20px;
  padding-bottom: 1.5rem;
}

.main-img {
  width: 315px;
  height: auto;
  align-self: center;
}

/* DESKTOP */

@media screen and (min-width: 1000px) {
  .center {
    padding: 100px;
    padding-top: 20px;
  }

  .logo-img {
    width: 400px;
    height: auto;
    align-self: center;
  }

  .flexContainer {
    display: flex;
    gap: 100px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 24px;
    padding-bottom: 1.5rem;
  }

  .container {
    max-width: 800px;
  }

  .main-img {
    width: 500px;
    height: auto;
    align-self: center;
  }
}
</style>
