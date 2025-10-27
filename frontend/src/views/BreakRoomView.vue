<script setup>
import { ref, watch } from "vue";
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
const colors = ["red", "green", "pink", "purple", "brown", "orange", "blue", "yellow", "white"]
const sequence = ref([])
const playerSequence = ref([])

const currentSequenceColor = ref(null)
const clickedSquareColor = ref(null)

const screenText = ref("LOCKED!")

let activePuzzle = ref(false)
let activeSequence = ref(false)
let activePlayerTurn = ref(false)
let gameOver = ref(false)
let puzzleFinished = ref(false)

async function startPuzzle() {

  resetGameValues() // Reset sequence, playerSequence and gameOver values.
  activePuzzle.value = true
  await playPuzzle(3) // Play 3 rounds

  if(gameOver.value) {
    screenText.value = "LOCKED!"
    activePuzzle.value = false
  } else {
    screenText.value = "UNLOCKED!"
    await wait(2000)
    activePuzzle.value = false
    if (completedFunction.value) {
      completedFunction.value()
    }
  }
}

async function playPuzzle(rounds){

  for(let round = 1; round <= rounds; round++){

    if(round === 1) {
      screenText.value = "Remember the sequence..."
      await wait(1500)
    }

    screenText.value = ""

    addRandomColorsToSequence(2) // Add random color to sequence
    await showSequence() // Play the correct color sequence

    activePlayerTurn.value = true // Turn on player ability to click squares
    screenText.value = "Enter sequence..." // Inform the player of its turn
    await watchPlayerSequence() // Watch player sequence and evaluate if correct
    activePlayerTurn.value = false // Turn off player ability to click squares
    playerSequence.value = [] // Reset playerSequence for next round
    
    if(gameOver.value) {
      screenText.value = "Error!"
      await wait(1500)
      break
    } else if(round < rounds) {
      screenText.value = "Correct!"
      await wait(1000)
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
  screenText.value = "Press START..."
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

    currentSequenceColor.value = color // set the sequence-square to this color
    await wait(800) // hold and show color
    currentSequenceColor.value = null;
    await wait(250) // hold between colors
  }

  currentSequenceColor.value = null;
  activeSequence.value = false
}
</script>

<template>
  <PuzzleContainer nextRoute="/room/archive">

    <!--INTRO-->
    <template #puzzleIntro>
      <p>The new Guini prototype is standing on the corner table in the break room.</p>
      <br>
      <p>As you reach for your frozen dinner,</p>
      <p>the prototype starts making a strange static noise.</p>
      <p>You walk over to turn it off,</p>
      <p>but you can’t seem to find the off button.</p>
      <br>
      <p>*sigh*</p>
      <br>
      <p>Annoyed, and still hungry,</p>
      <p>you head over to the archive room to get the new Guini schematics.</p>
      <br>
      <p>But when you get there, the archive room is locked...</p>
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
        <div class="container-keypad">
          <div class="container-keypad-inside">

            <div class="container-keypad-top">
              <div class="container-screen">

                <div class="screen-left">
                  <p class="screen-text">{{ screenText }}</p>
                </div>
                
                <div class="screen-right">
                  <div class="container-sequence">
                    <div class="sequence" :class="currentSequenceColor"></div>
                    <button v-if="!activePuzzle" class="btn-start" @click="startPuzzle">START</button>
                  </div>
                </div>

              </div>
            </div>

            <div class="container-keypad-bottom">
              <div class="keypad-bottom-grid">
                  <button 
                  v-for="color in colors" 
                  :key="color"
                  :class="['keypad-grid-btn', `${color}-gradient`, {hoverEffect: activePlayerTurn, pressedEffect: activePlayerTurn}]"
                  @click="squareClicked(color)"
                  ></button>
              </div>
            </div>

          </div>  
        </div>
      </div>
    </template>

    <!--OUTRO-->
    <template #puzzleOutro>

      <div class="outro-container">
        <div class="outro-container-text">
          <p>
            The lock buzzes and you push the door open. 
            <br> Since when does the archive need a lock? 
            <br> You try to shake it off, but a feeling of unease lingers.
          </p>
          <br>
          <p>
            Once inside,
            <br> the archive room feels different from the rest of the office,
            <br> quieter, tidier, almost too perfect...
          </p>
        </div>
      </div>
      
    </template>

  </PuzzleContainer>
</template>

<style scoped>

.container-puzzle {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #333 0%, #111111 100%);
}

.container-keypad {
  background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
  box-shadow:
    inset 2px 2px 4px rgba(255,255,255,0.05),
    inset -3px -3px 6px rgba(0,0,0,0.8),
    0 8px 16px rgba(0,0,0,0.6);
  border-radius: 16px;
  width: 15rem;
  height: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.container-keypad-inside {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.container-keypad-top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
}

.container-screen {
  height: 5rem;
  width: 100%;
  background: linear-gradient(to bottom, #333, #111);
  border: 2px solid #555;

  box-shadow:
    inset 3px 3px 6px rgba(0, 0, 0, 0.8),
    inset -3px -3px 6px rgba(255, 255, 255, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: space-between;
}

.screen-left {
  width: 65%;
  padding: 0.8rem;
}

.screen-text {
  height: 100%;
  color: #0f0;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
  font-size: 0.8rem;
}

.screen-right {
  width: 40%;
  display: flex;
  justify-content: left;
  align-items: center;
}

.container-sequence {
  position: relative;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 0.2rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-start {
  position: absolute;
  width: 100%;
  height: 100%;

  background: transparent;
  border: 1px solid #0f0;
  border-radius: 8px;

  font-size: 0.7rem;
  letter-spacing: 0.05rem;
  color: #0f0;
  text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;

  cursor: pointer;
}

.sequence {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: background 0.5s ease;
}

.container-keypad-bottom {
  box-shadow:
    inset 2px 2px 2px rgba(255,255,255,0.05),
    inset -3px -3px 3px rgba(0,0,0,0.8),
    0 8px 8px rgba(0,0,0,0.6);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.keypad-bottom-grid {
  display: grid;
  grid: repeat(3, 1fr) / repeat(3, 1fr);
  gap: 0.8rem;
}

.keypad-grid-btn {
  border: 0.5px solid black;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 0.2rem;
  box-shadow:
    0 2px 8px rgba(0,0,0,0.25),
    0 4px 12px rgba(0,0,0,0.2);
  transition: all 0.1s ease;
}

.hoverEffect:hover {
  filter: brightness(1.2);
  cursor: pointer;
}

.pressedEffect:active {
  transform: translateY(2px); /* moves the button down visually */
  box-shadow:
    inset 2px 2px 4px rgba(0,0,0,0.8),   /* inner shadow (dark) */
    inset -2px -2px 4px rgba(255,255,255,0.1); /* inner highlight */
  filter: brightness(0.85); /* slightly darker to reinforce pressed look */
}

/* Color classes */
.red { background: #FF0000; }
.red-gradient { background: linear-gradient(to right bottom, #FF0000, #FF0000, #1a1a1a);}
.green { background: #0faf35;}
.green-gradient { background: linear-gradient(to right bottom, #0faf35, #0faf35, #1a1a1a);}
.pink { background: #ff0095;}
.pink-gradient { background: linear-gradient(to right bottom, #ff0095, #ff0095, #1a1a1a);}
.purple { background: #58359b;}
.purple-gradient { background: linear-gradient(to right bottom, #58359b, #58359b, #1a1a1a);}
.brown { background: #5C4033;}
.brown-gradient { background: linear-gradient(to right bottom, #5C4033, #5C4033, #1a1a1a);}
.orange { background: #fd5e14;}
.orange-gradient { background: linear-gradient(to right bottom, #fd5e14, #fd5e14, #1a1a1a);}
.blue { background: #007bff;}
.blue-gradient { background: linear-gradient(to right bottom, #007bff, #007bff, #1a1a1a);}
.yellow { background: #fff200;}
.yellow-gradient { background: linear-gradient(to right bottom, #fff200, #fff200, #1a1a1a);}
.white { background: white;}
.white-gradient { background: linear-gradient(to right bottom, white, white, #1a1a1a);}

/* OUTRO STYLE */
.outro-container {
  height: 100%;
  display: flex;
}

.outro-container-text {
  flex: 1;
}

</style>
