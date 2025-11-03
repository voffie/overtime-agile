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
    <h2 class="notes-header">Notes</h2>
    <button class="notes-button" @click="isShowModal">
      <img class="button-img" src="/src/assets/img/design-room/img/notes-icon.svg" alt="notepad icon black" />
    </button>
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
  justify-content: space-between;
  gap: 0.2;
  padding: 0.5rem;

}

.puzzle-main {
  display: flex;

}

.notes-header {
  display: inline-flex;
  justify-content: start;
  background-color: var(--container-bg);
  padding: 0.5rem auto;
  text-align: center;
  border-radius: 0.3rem 1rem;
  margin-right: 0.5rem;
  padding-left: 2rem;

}

.notes-button {
  min-width: 3rem;
  min-height: 3rem;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding-inline: 10px;
  padding-block: 0;
  color: var(--button-text);
  background-color: var(--button-bg);
  border-radius: 10px;
  font-weight: bold;
}

.button-img {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  object-fit: cover;

}

@media screen and (min-width: 768px) {
  .notes-header {
    margin-right: 0.5rem;
    padding-right: 2rem;

    justify-content: end;
  }
}
</style>
