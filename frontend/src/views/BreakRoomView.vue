<script setup>
import { ref, onMounted } from "vue";
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"

// Only use ref() when you want something to be reactive, aka. when the value can change and you want Vue to react to 
const colors = ["red", "green", "pink", "purple", "grey", "orange", "blue", "yellow", "brown"]
const sequence = ref([])
const userSequence = ref([])
const currentSequenceColor = ref(null)
let puzzleActive = ref(false)
let currentSquare = ref("")

// Start Game
function startPuzzle(event) {

  // Set puzzle to active and reset all values
  puzzleActive.value = true;
  resetPuzzle()
  
  // Add random color to sequence
  addRandomColorToSequence()
  console.log(sequence.value)

  // Play sequence
  playSequence()
}

function addRandomColorToSequence(){
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  sequence.value.push(randomColor)
  sequence.value.push("red")
  sequence.value.push("green")
}

async function playSequence(){
  for(const color of sequence.value) {
    console.log(color)

    // set the sequence-square to this color
    currentSequenceColor.value = color 

    // wait for 2 sec
    await wait(2000)

    // clear the sequence-square
    currentSequenceColor.value = "sequence-square"
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/* async function wait(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
} */

function resetPuzzle(){
  sequence.value = []
  userSequence.value = []
}

function squareClicked(event) {
  const square = event.currentTarget
  const index = square.dataset.index
  currentSquare.value = index
  console.log(index)
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

          <button @click="startPuzzle" v-if="!puzzleActive">START</button>

          <div class="sequence-active" v-if="puzzleActive">
            <div class="square sequence-square" :class="currentSequenceColor"></div>
          </div> 
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
  border: 1px solid red;
  display: flex;
  flex-direction: column;
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

.square {
  width: 6rem;
  height: 6rem;
  border-radius: 8px;
  cursor: pointer;
}

/* Color classes */
.sequence-square { border: 2px solid white;}
.red { background-color: #FF0000; }
.grey { background-color: #5f5f5f; }
.green { background-color: #0faf35; }
.pink { background-color: #ff0095; }
.purple { background-color: #58359b; }
.orange { background-color: #fd5e14; }
.blue { background-color: #007bff; }
.yellow { background-color: #fff200; }
.brown { background-color: #4e342c; }

</style>
