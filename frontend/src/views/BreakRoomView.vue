<script setup>
import { ref, watch } from "vue";
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"

/*
1. Click button to start game
2. Begin round by randomly seleqting new colors to add to the sequence
2. Start countdown
3. Show whole sequence
4. Collect player sequence
  4.1 Check every player choice to see if right or wrong - if wrong then game over
  4.2 If player sequence is as long as correct sequence - end collect player sequence
5. Check outcome
  5.1 If game over, reset and start over
  5.2 If last round = win, display outro and continue to next room
*/

// Variable and function to get access to the completed function, call when puzzle is completed:
// completedFunction.value()
let completedFunction = ref(null)

function setCompleted(passedCompletedFunction) {
  completedFunction.value = passedCompletedFunction
}

// Only use ref() when you want something to be reactive (when the value can change and you want Vue to react to it) 
const colors = ["red", "green", "pink", "purple", "grey", "orange", "blue", "yellow", "brown"]
const sequence = ref([])
const playerSequence = ref([])

const currentSequenceColor = ref(null)
const clickedSquareColor = ref(null)

const countdownText = ref("")
const puzzleStatus = ref("")

let activePuzzle = ref(false)
let activeCountdown = ref(false)
let activeSequence = ref(false)
let activePlayerTurn = ref(false)
let gameOver = ref(false)
let gameSolved = ref(false)

async function startPuzzle(event) {

  resetGameValues() // Reset sequence, playerSequence and gameOver values.
  activePuzzle.value = true
  await playPuzzle(3) // Play 3 rounds
  activePuzzle.value = false

  if(gameOver.value) {
    // Restart game
    console.log("Game over! Wrong input!")
    console.log("Restart game")
  } else {
    // Continue to next room
    console.log("Puzzle complete! You won 3 rounds!")
    gameSolved.value = true
    
    if (completedFunction.value) {
      completedFunction.value()
    }
  }
}

async function playPuzzle(rounds){

  for(let round = 1; round <= rounds; round++){

    addRandomColorsToSequence(2) // Add random color to sequence
    await showCountdown(3) // Play countdown 3, 2, 1..
    await showSequence() // Play the correct color sequence
    puzzleStatus.value = "GO!" // Inform the player of its turn

    activePlayerTurn.value = true // Turn on player ability to click squares
    await watchPlayerSequence() // Watch player sequence and evaluate if correct
    activePlayerTurn.value = false // Turn off player ability to click squares
    playerSequence.value = [] // Reset playerSequence for next round
    
    if(gameOver.value) {
      break
    } else if(round < rounds) {
      console.log("Correct! Next round...")
    }
  }
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
    const stop = watch(
      () => playerSequence.value.length, // source = watch playerSequence length
      (playerSequenceLength) => { // callback = check that player clicked the right square

        const currentIndex = playerSequenceLength-1
        const expectedColor = sequence.value[currentIndex]
        const actualColor = playerSequence.value[currentIndex]

        // If player clicks wrong color, then game over
        if(actualColor !== expectedColor) {
          stop()
          gameOver.value = true
          return resolve()
        }

        // If correct sequence is done, return
        if(playerSequenceLength === sequence.value.length) {
          stop()
          return resolve()
        }
      }
    )
  })
}

async function squareClicked(color) {
  // Check if it is the players turn to click the sequence, if not return
  if(!activePlayerTurn.value) return

  // Adds the color of the square that the player clicks if it is a activePlayerTurn
  playerSequence.value.push(color)
  // Flash the clicked square to indicate action to player
  clickedSquareColor.value = color
  await wait(300)
  clickedSquareColor.value = null
}

function resetGameValues() {
  gameOver.value = false
  sequence.value = []
  playerSequence.value = []
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

async function showSequence(){

  activeSequence.value = true

  for(const color of sequence.value) {
    console.log(color)

    // wait for ? sec
    // (the await pauses the execution of its surrounding async function until the promise is settled)
    await wait(400)

    // set the sequence-square to this color
    currentSequenceColor.value = color 

    // wait for ? sec
    await wait(800)

    // clear the sequence-square
    currentSequenceColor.value = null
  }

  await wait(400)
  activeSequence.value = false
}

async function showCountdown(from){
  activeCountdown.value = true

  for(let i = from; i > 0; i--){
    countdownText.value = i
    await wait(600)
  }

  countdownText.value = null
  activeCountdown.value = false
}
</script>

<template>
  <PuzzleContainer nextRoute="/room/archive">

    <!--INTRO-->
    <template #puzzleIntro>
      <h2>Break Room</h2>
      <br>
      <p>As you walk into the breakroom, you see the new Guini prototype standing on the corner table.</p>
      <p>It must have been left there by somebody from the New Development Division.</p>
      <br>
      <p>As you reach for your frozen dinner from the freezer, the prototype starts to make a strange static noise.</p>
      <p>Annoyed and still hungry, you walk over to the table and pick it up to turn it off, but you can’t seem to find the off button.</p>
      <p>*sigh* they always move the off button on every new release…</p>
      <br>
      <p>You head to the archive room to find the schematics for the new prototype.</p>
      <p>Beside the locked archive door there is a keypad,</p> 
      <p>it seems like you have to repeat the color sequence to unlock the door..</p>
    </template>

    <!--PUZZLE-->
    <template #puzzleImpl="{completed}">
      <!--
      Below template tag is to capture the "completed" function from the above template,
      passed from PuzzleContainer.vue. We can now set the function completed to a variable in our script
      and use that variable to trigger the completed function.
      -->
      <template v-once>{{ (setCompleted(completed), '') }}</template>
      <!-- <TemplateChild :solve="completed" />
      <Button text="Parent Button" @click="completed()" /> -->

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
          <div 
          v-for="color in colors" 
          :key="color" 
          class="square" 
          :class="['square', color, {hoverEffect: activePlayerTurn, flashEffect: clickedSquareColor === color}]"
          @click="squareClicked(color)"
          ></div>
        </div>
      </div>
    
    </template>

    <!--OUTRO-->
    <template #puzzleOutro>
      <p>Outro Text - YOU DID IT! Go to archive room.</p>
    </template>

  </PuzzleContainer>
</template>

<style scoped>

.container-puzzle {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}

.container-sequence {
  position: relative;
  width: 4rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container-keypad {
  background: rgb(38, 45, 45);
  border: 0.5rem solid black;
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
  font-size: 1.5rem;
}

.square {
  border: 2px solid lightgrey;
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}

.hoverEffect:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.flashEffect {
  opacity: 0.5; 
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
