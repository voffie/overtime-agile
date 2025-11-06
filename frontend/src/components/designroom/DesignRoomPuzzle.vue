<script setup>
import { ref, reactive, computed } from "vue"
import Button from '@/components/Button.vue'
import Notes from "@/components/designroom/Notes.vue"
import RiddlePuzzle from "@/components/designroom/RiddlePuzzle.vue"
import notesIcon from "@/assets/img/design-room/img/notes-icon.svg"
import { noteData as importedNoteData } from "@/components/designroom/data/noteData"

const noteData = reactive(JSON.parse(JSON.stringify(importedNoteData)))
const answerToMetaPuzzle = ref("blackyellowblue")
const guessInput = ref("")

const riddleKeys = ["riddle1", "riddle2", "riddle3", "confession"]

const lockedRiddles = computed(() => {
  const riddles = {}

  for (const key of riddleKeys) {
    if (!noteData[key].available) riddles[key] = noteData[key]
  }
  return riddles
})



const props = defineProps({
  solve: {
    type: Function,
    required: true
  }
})
const puzzleCompleted = ref(false)
const metaPuzzleCompleted = ref(false)
const puzzleButtonVisible = ref(false)
const hidePuzzle = ref(false)

const showModal = ref(false)


function isSuccess() {
  props.solve()
}

function isPuzzleCompleted() {
  puzzleCompleted.value = true
  puzzleButtonVisible.value = false
  hidePuzzle.value = true
}

function isShowModal() {
  showModal.value = !showModal.value

}

function unlockRiddles(key) {
  noteData[key].available = true

  if (noteData[riddleKeys[0]].available && noteData[riddleKeys[1]].available && noteData[riddleKeys[2]].available) {
    puzzleButtonVisible.value = true
  }
}

const metaPuzzleText = ref(`The bunny head starts to vibrate and a burst of light flickers and then no more.\n You try to flick switch again but no response from the bunny.
        You look at the post-it note again and realize Frank's laptop is underneath it, you open the lid.

        The login screen appears with the question: what are my favorite colors?

        You pause and look at the Post-it note and remember the maddening journey of text.

        You think.. and enter the following:`
)

function isGuessCorrect() {
  if (guessInput.value.trim() === 0) {
    return false
  }
  if (guessInput.value.toLocaleLowerCase() === answerToMetaPuzzle.value.toLocaleLowerCase()) {
    metaPuzzleCompleted.value = true

  };

  guessInput.value = ""

}

</script>

<template>

  <header class="puzzle-header">
    <h2 class="notes-header">Notes</h2>
    <button class="notes-button" @click="isShowModal" aria-label="Open notes">
      <img class="button-img" :src="notesIcon" alt="notepad icon black" />
    </button>
  </header>
  <section class="puzzle-main">
    <Notes :show-modal="showModal" @close="isShowModal" :note-data="noteData" />
    <RiddlePuzzle v-if="!hidePuzzle" :riddles="lockedRiddles" @riddle-solved="unlockRiddles" />
    <section v-else>
      <h2>One to rule them all</h2>
      <p class="meta-text">{{ metaPuzzleText }}</p>
      <input @keyup.enter="isGuessCorrect()" v-model="guessInput" class="meta-input" type="text"
        placeholder="What are my favorite colors ... ">
      <Button @click="isGuessCorrect" class="meta-button" text="Enter Password" />
    </section>
  </section>
  <Button v-if="puzzleButtonVisible" text="Look at the Laptop" @click="isPuzzleCompleted" />
  <hr class="line-hz" v-if="puzzleCompleted && metaPuzzleCompleted">
  <Button v-if="puzzleCompleted && metaPuzzleCompleted" text="Puzzle Completed" @click="isSuccess" />
</template>

<style scoped>
.puzzle-header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
  padding: 0.5rem;

}

.puzzle-main {
  display: flex;

}

.notes-header {
  display: inline-flex;
  justify-content: flex-start;
  background-color: var(--container-bg);
  padding: 0.5rem;
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
  width: 100%;
  height: 100%;
  object-fit: cover;

}

.meta-text {
  white-space: pre-line;
  font-family: "Syne Mono", monospace;
  font-size: large;

}

.meta-input {
  appearance: none;
  /* for Safari/Chrome */
  border: none;
  outline: none;
  background: none;

  max-width: 100%;
  width: 100%;
  padding: 0.6rem 1rem;
  background-color: #f8f8f8;
  font-family: "Syne Mono", monospace;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: var(--background);
  transition: all 0.2s ease-in-out;
  font-size: 1rem;

}

.meta-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8);
  background-color: var(--container-bg);
  color: var(--text);
}

.meta-input::placeholder {
  color: #aaa;
  font-style: italic;
}

.meta-button {
  min-height: 4rem;
  min-width: 4rem;
  margin: 0.5rem auto;
  width: 100%;
  font-size: larger;
}

.line-hz {
  border: 4px double var(--container-bg);
  margin: 0.5rem;

}

@media screen and (min-width: 768px) {
  .notes-header {
    margin-right: 0.5rem;
    padding-right: 2rem;

    justify-content: flex-end;
  }
}
</style>
