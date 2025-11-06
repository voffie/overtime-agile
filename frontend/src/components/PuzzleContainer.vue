<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import { currentGame } from '@/utils/currentGame.js'
import { timer } from '@/utils/timer.js'

const props = defineProps(['nextRoute'])
const state = ref('intro')
const router = useRouter()
const elapsedTimeFormatted = ref('00:00:00')

async function updateState(newState) {

  if(newState === 'outro') {

    const dbUpdateSuccess = await persistTimeAndCurrentRoom()

    if(dbUpdateSuccess) {
      state.value = newState
    }
    
  } else {
    state.value = newState
  }
}

async function persistTimeAndCurrentRoom(){
  try {
    timer.stop()
    const elapsedTimeSeconds = timer.getElapsedTimeInSeconds()
    await currentGame.updateTimeForCurrentRoom(elapsedTimeSeconds)
    const parts = props.nextRoute.split("/")
    const nextRoom = parts.pop()
    await currentGame.updateCurrentRoom(nextRoom)
    return true;

  } catch (error) {
    console.error(`Error updating current room: ${error.message}`)
    return false;
  }
}

async function redirect() {
  router.push(props.nextRoute)
}

onMounted(() => {
  // When a player renders a PuzzleContainer, start the timer.
  timer.start((formattedTime) => {
    elapsedTimeFormatted.value = formattedTime
  })
})

onUnmounted(() => {
  timer.reset() // Stop and reset timer if leaving unexpectedly
})

</script>

<template>
  <!-- Turn this on if you want to see the timer. It is only here as a help, not final solution.
  <p>{{ elapsedTimeFormatted }}</p>
  -->
  <section class="room-wrapper" :class="{ 'outro-wrapper': state === 'outro' }">
    <!-- Desktop -->
    <section v-if="state !== 'solved' && state !== 'outro'" class="puzzle-text">
      <slot name="puzzleIntro" />
    </section>
    <section v-if="state !== 'solved' && state !== 'outro'" class="puzzle-wrapper">
      <slot name="puzzleImpl" :completed="() => updateState('outro')" />
    </section>
    <section v-if="state === 'outro'" class="outro">
      <slot name="puzzleOutro" />
      <Button text="Continue" @click="redirect" />
    </section>
  </section>

  <!-- Mobile -->
  <section class="mobile-view">
    <section v-if="state === 'intro'">
      <slot name="puzzleIntro" />
      <Button @click="updateState('puzzle')" text="To Puzzle" />
    </section>
    <section v-if="state === 'puzzle'" id="mobile-puzzle">
      <Button @click="updateState('intro')" text="To Story" />
      <slot name="puzzleImpl" :completed="() => updateState('outro')" />
    </section>
    <section v-if="state === 'outro'" class="outro">
      <slot name="puzzleOutro" />
      <Button text="Continue" @click="redirect" />
    </section>
  </section>
</template>

<style scoped>
.room-wrapper {
  display: none;
}

.mobile-view {
  padding: 1rem;
}

#mobile-puzzle,
.outro {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media screen and (min-width: 768px) {
  .mobile-view {
    display: none;
  }

  .room-wrapper,
  .outro-wrapper {
    height: 100%;
    display: block;
  }

  .room-wrapper:not(.outro-wrapper) {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
  }

  .puzzle-text,
  .outro {
    padding: 1.5rem;
    overflow-y: scroll;
    height: 100%;
  }

  .puzzle-text:not(.outro) {
    text-wrap: balance;
  }

  .puzzle-text {
    border-right: 1px dotted var(--border);
  }

  .puzzle-wrapper {
    padding: 1rem;
  }
}
</style>
