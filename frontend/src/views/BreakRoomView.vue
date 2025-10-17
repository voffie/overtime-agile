<script setup>
import { ref, onMounted } from "vue";
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"

// Only use ref() when you want something to be reactive, aka. when the value can change and you want Vue to react to 
const colors = ["red", "green", "pink", "purple", "grey", "orange", "blue", "yellow", "brown"]
const sequence = ref([])
const userSequence = ref([])

const currentSequenceColor = ref(null)

const countdownText = ref("")
const puzzleStatus = ref("")

let activePuzzle = ref(false)
let activeCountdown = ref(false)
let activeSequence = ref(false)
let activePlayerTurn = ref(false)

let currentSquare = ref("")

// Start Game
async function startPuzzle(event) {

  // Reset all values
  resetPuzzle()
  
  // Add random color to sequence
  addRandomColorToSequence()
  console.log(sequence.value)

  // Set puzzle to active
  activePuzzle.value = true

  // Play countdown 3, 2, 1..
  await playCountdown(3)

  // Play the correct color sequence
  await playSequence()

  puzzleStatus.value = "GO!"

  // Get player answer
  getPlayerSequence()
}

function getPlayerSequence() {
  activePlayerTurn.value = true
}

async function playSequence(){
  activeSequence.value = true
  for(const color of sequence.value) {
    console.log(color)

    // wait for 0.5 sec
    // (the await pauses the execution of its surrounding async function until the promise is settled)
    await wait(500)

    // set the sequence-square to this color
    currentSequenceColor.value = color 

    // wait for 1 sec
    await wait(1000)

    // clear the sequence-square
    currentSequenceColor.value = null
  }
  await wait(500)
  activeSequence.value = false
}

async function playCountdown(from){
  activeCountdown.value = true
  for(let i = from; i > 0; i--){
    countdownText.value = i
    await wait(800)
  }
  countdownText.value = null
  activeCountdown.value = false
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function addRandomColorToSequence(){
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  sequence.value.push(randomColor)
  sequence.value.push("red")
  sequence.value.push("green")
}

function resetPuzzle(){
  sequence.value = []
  userSequence.value = []
}

function squareClicked(event) {
  const square = event.currentTarget
  const squareColor = square.dataset.color
  console.log(squareColor)
}
</script>

<template>
  <PuzzleContainer nextRoute="/room/archive">

    <!--INTRO-->
    <template #puzzleIntro>
      <p>Intro Text</p>
    </template>

    <!--PUZZLE-->
    <template #puzzleImpl="{completed}">

      <div class="container-puzzle">

        <div class="container-sequence">

          <button @click="startPuzzle" v-if="!activePuzzle">START</button>

          <!--
          Vue only applies transitions when an element enters or leaves the DOM.
          :key="countdownText" tells Vue to treat each new number as a different element (removes old and add new).
          :key is how you force Vue to treat each change as a new element

          <Transition> wraps this replacement and adds CSS classes
          (e.g. fade-enter-active, fade-leave-active) to animate the fade effect.
          Without :key, you're just changing text — no fade
          -->
          <Transition name="fade">
            <div class="square countdown-text" :key="countdownText" v-if="activeCountdown">
              {{ countdownText }}
            </div>
          </Transition>

          <Transition name="fade">
            <div class="square sequence" :class="currentSequenceColor" :key="currentSequenceColor" v-if="activeSequence"></div>
          </Transition>
          
          <Transition name="fade">
            <div class="square status-text" :key="puzzleStatus" v-if="activePlayerTurn">
                {{ puzzleStatus }}
            </div>
          </Transition>
        </div>

        <div class="container-keypad">
            <div class="square red" data-color="red" @click="squareClicked"></div>
            <div class="square green" data-color="green" @click="squareClicked"></div>
            <div class="square pink" data-color="pink" @click="squareClicked"></div>
            <div class="square purple" data-color="purple" @click="squareClicked"></div>
            <div class="square grey" data-color="grey" @click="squareClicked"></div>
            <div class="square orange" data-color="orange" @click="squareClicked"></div>
            <div class="square blue" data-color="blue" @click="squareClicked"></div>
            <div class="square yellow" data-color="yellow" @click="squareClicked"></div>
            <div class="square brown" data-color="brown" @click="squareClicked"></div>
        </div>

        <!-- <Button text="Puzzle Complete" @click="completed()"/> -->

      </div>
    
    </template>

    <!--OUTRO-->
    <template #puzzleOutro>
      <p>Outro Text</p>
    </template>

  </PuzzleContainer>
</template>

<style scoped>

.container-puzzle {
  border: 1px solid yellow;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.container-sequence {
  position: relative;
  width: 6rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container-keypad {
  background: rgb(38, 45, 45);
  border: 4px solid black;
  padding: 1rem;
  display: grid;
  grid: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 1rem;
}

.countdown-text, 
.status-text,
.sequence  {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightgrey;
  font-size: 3rem;
}

.square {
  border: 2px solid lightgrey;
  width: 6rem;
  height: 6rem;
  border-radius: 8px;
  cursor: pointer;
}

/* Color classes */
.red { background-color: #FF0000; }
.grey { background-color: #5f5f5f; }
.green { background-color: #0faf35; }
.pink { background-color: #ff0095; }
.purple { background-color: #58359b; }
.orange { background-color: #fd5e14; }
.blue { background-color: #007bff; }
.yellow { background-color: #fff200; }
.brown { background-color: #4e342c; }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
