<script setup>
import { onMounted, ref, onUnmounted } from "vue"
import WestLogo from "@/assets/img/West_Logo.svg"
const showCredits = ref(false);
const timeOutId = ref(null)

onMounted(() => {
  clearAllTimeOut();
  const delay = 200;
  timeOutId.value = setTimeout(() => {
    showCredits.value = true
  }, delay);
})

onUnmounted(() => {
  clearAllTimeOut();
  showCredits.value = false;
});

function clearAllTimeOut() {
  clearTimeout(timeOutId.value)

}

const creditsData = {
  "Esteban Fernandez Parada": {
    mockrole: "General Coffee",
    role: "Backend Login Flow & Design Room & Sound Engineer",
    coffeecups: 2500,
  },
  "Victoria Naenfeldt Eklund": {
    mockrole: "Aspect Assistant",
    role: "Break Room and Home Page Engineer",
    coffeecups: 1234
  },
  "Viktor Söderborg": {
    mockrole: "Typing Assistant",
    role: "Server Room creator & Secretary",
    coffeecups: 0
  },
  "Stelle Simonlatser": {
    mockrole: "Interpretent",
    role: "Archive Room services & Profile page controller",
    coffeecups: 1529
  },
  "Tova Bryngelsson": {
    mockrole: "Basic bitch",
    role: "Executives Office and Ending master",
    coffeecups: "I'm allergic to hot beverages",
  }

}


</script>

<template>
  <section class="credits-wrapper">
    <section class="credits-container" :style="{ backgroundImage: 'url(' + WestLogo + ')' }">
      <h1 class="credits-header">The End Credits</h1>
      <section v-show="showCredits" class="credits-data" :class="{ visible: showCredits }">
        <h2 class="credits-title">Overtime</h2>
        <div v-for="(person, name) in creditsData" :key="name" class="credits-person">
          <h3 class="credits-name">{{ name }}</h3>
          <p class="credits-role"><strong>Role:</strong> {{ person.role }}</p>
          <p class="credits-mockrole"><strong>Known as:</strong> {{ person.mockrole }}</p>
          <p class="credits-gag"><strong>Coffe Consumed:</strong> {{ person.coffeecups }}</p>
        </div>
      </section>
    </section>
  </section>
</template>

<style scoped>
.credits-wrapper {
  position: fixed;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  top: 4rem;
  right: 0;
  bottom: 0;
  left: 0;
}

.credits-container {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  width: auto;
  height: 100vh;
  flex-direction: column;
  align-items: center;
}


.credits-header {
  background-color: var(--orange);
  padding: 2rem;
  width: 80vw;
}

.credits-data {
  position: absolute;
  transition: opacity 1s ease;
  will-change: transform;
  bottom: -100%;
  opacity: 0;
}

.credits-data.visible {
  opacity: 1;
  animation: 8s scrollup linear 1s infinite;
}

.credits-title {
  padding: 2rem;
  background: rgba(0, 0, 0, 0.9);
  text-align: center;
  font-size: 4rem;
}

.credits-person {
  text-align: center;
  margin-bottom: 2rem;
  background: var(--background);
  text-wrap: balance;
}

.credits-name {
  font-size: 3rem;
  font-weight: bold;
  color: var(--text);
}

.credits-role {
  color: var(--text);
  font-size: 2.2rem;
}

.credits-mockrole {
  font-style: italic;
  font-size: 2rem;
  color: var(--warning);
}

.credits-gag {
  font-size: 1.7rem;
  color: var(--orange);
  font-family: "Syne Mono", monospace;
  font-weight: 400;

}

.credits-button {
  min-height: 4rem;
  min-width: 4rem;
  z-index: 10;

}

@keyframes scrollup {
  0% {
    transform: translateY(100vh);
  }

  100% {
    transform: translateY(-200vh);
  }
}
</style>
