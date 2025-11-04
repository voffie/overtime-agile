<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'

const props = defineProps(['nextRoute'])
const state = ref('intro')
const router = useRouter()

function updateState(newState) {
  state.value = newState
}

async function redirect() {
  const parts = props.nextRoute.split("/")
  const nextRoom = parts.pop()
  const gameId = localStorage.getItem("currentGameId")

  if (!gameId) {
    console.error("No gameId found in localStorage")
    return
  }

  try {
  const response = await fetch(`http://localhost:3000/api/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
    body: JSON.stringify({ current_room: nextRoom })
    })

    if (!response.ok) {
      throw new Error("Failed to update room")
    }
  } catch (error) {
    console.error("Error updating room:", error)
    return
  }

  router.push(props.nextRoute)
}
</script>

<template>
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
