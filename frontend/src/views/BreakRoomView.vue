<script setup>
import { ref, watch } from "vue";
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"

// Only use ref() when you want something to be reactive, aka. when the value can change and you want Vue to react to 
const colors = ["red", "green", "pink", "purple", "grey", "orange", "blue", "yellow", "brown"]
const sequence = ref([])
const playerSequence = ref([])

const currentSequenceColor = ref(null)

const countdownText = ref("")
const puzzleStatus = ref("")

let activePuzzle = ref(false)
let activeCountdown = ref(false)
let activeSequence = ref(false)
let activePlayerTurn = ref(false)
let gameOver = ref(false)

// Start Game
async function startPuzzle(event) {

  // Reset sequences
  sequence.value = []
  playerSequence.value = []

  // Set puzzle to active
  activePuzzle.value = true

  // Play 3 rounds
  for(let round = 0; round < 3; round++){

    // Setup the sequence area (countdown, sequence, status-text)
    await setupSequence()
    console.log("Correct sequence:")
    console.log(sequence.value)

    // Watch player sequence and evaluate if correct
    await watchPlayerSequence()
    console.log("Player sequence:")
    console.log(playerSequence.value)

    // Reset playerSequence for next round
      playerSequence.value = []

    if(gameOver.value) {
      console.log("Game over! Wrong input!")
      break
    } else if(round < 2) {
      console.log("Correct! Next round...") 
    }
  }

  activePuzzle.value = false

  if(!gameOver.value) {
    // Continue to next room
    console.log("Puzzle complete! You won 3 rounds!")
  } else {
    // Restart game
    console.log("Restart game")
  }
}

async function setupSequence() {
  // Add random color to sequence
  addRandomColorsToSequence(2);

  // Play countdown 3, 2, 1..
  await playCountdown(3);

  // Play the correct color sequence
  await playSequence();

  puzzleStatus.value = "GO!";
}

/* 
  Player needs to click the same number of squares as the sequence
  Each click is processed by the @click event through function squareClicked(color), 
  where the squares color is added to the playerSequence array.
  
  watch() lets you observe changes to reactive values and run logic when those values change.
  Syntax: watch(source, callback, options?)
  source = What you want to watch
  callback = What to do when it changes
  options = Optional controls to add (like immediate or deep)
  always returns a stop function that lets you stop watching by calling it.
  */
function watchPlayerSequence() {

  return new Promise( resolve => {
    activePlayerTurn.value = true

    const stop = watch(
      // source = watch playerSequence length
      () => playerSequence.value.length,
      // callback = every time playerSequence length change (every time player clicks a square when activePlayerTurn)
      (newLength) => { 

        // the watcher checks if the color of the square the player clicked 
        // matches the sequence color at the same index
        // if not, stop watching and game over.
        const currentIndex = newLength-1
        const expectedColor = sequence.value[currentIndex]
        const actualColor = playerSequence.value[currentIndex]

        if(actualColor !== expectedColor) {
          stop()
          gameOver.value = true
          activePlayerTurn.value = false
          sequence.value = []
          resolve()
          return
        }

        // If the actualColor is equal to the expectedColor then continue until 
        // the length of the playerSequence is the same as the correct sequence,
        // stop watching and resolve the promise (letting the await continue).
        if (newLength === sequence.value.length) {
          stop()
          activePlayerTurn.value = false
          resolve()
        }
      }
    )
  })
}

function squareClicked(color) {
  // Check if it is the players turn to click the sequence, if not return
  if(!activePlayerTurn.value) return

  // Adds the color of the square that the player clicks if it is a activePlayerTurn
  playerSequence.value.push(color)
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function addRandomColorsToSequence(amount){

  for(let i = 0; i < amount; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    sequence.value.push(randomColor)
  }
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
          <div v-for="color in colors" :key="color" class="square" :class="color" @click="squareClicked(color)"></div>
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
