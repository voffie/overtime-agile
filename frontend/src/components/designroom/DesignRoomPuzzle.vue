<script setup>
import { ref } from "vue"
import Button from '@/components/Button.vue'
import Notes from "@/components/designroom/Notes.vue"

const props = defineProps(['solve'])
const puzzleCompleted = ref(false)
const metaPuzzleCompleted = ref(false)
const showModal = ref(false)


function isSuccess() {
  props.solve()
}

function isPuzzleCompleted() {
  puzzleCompleted.value = !puzzleCompleted.value
}

function isMetaPuzzleCompleted() {
  metaPuzzleCompleted.value = !metaPuzzleCompleted.value
}

function isShowModal() {
  showModal.value = !showModal.value

}

</script>

<template>

  <header class="puzzle-header">
    <h2>Hello</h2>
    <Button class="notes-button" text="Notes" @click="isShowModal"></Button>
  </header>


  <section class="puzzle-main">
    <Notes :show-modal="showModal" @close="isShowModal" />
  </section>


  <Button text="Main Puzzle" @click="isPuzzleCompleted" />
  <Button text="Meta Puzzle" @click="isMetaPuzzleCompleted" />
  <Button v-if="puzzleCompleted && metaPuzzleCompleted" text="Puzzle Completed" @click="isSuccess" />
</template>

<style scoped>
.puzzle-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0;
  padding: 0.5rem;

}

.puzzle-main {
  display: flex;

}


.notes-button {
  min-width: 3rem;
  min-height: 3rem;

}
</style>
