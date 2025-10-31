<script setup>
import { ref } from "vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"
import Guini from "@/components/executivesOffice/Guini.vue"
import Letter from "@/components/executivesOffice/Letter.vue"
import Office from "@/components/executivesOffice/Office.vue"
import Painting from "@/components/executivesOffice/Painting.vue"
import Plant from "@/components/executivesOffice/Plant.vue"
import Trophy from "@/components/executivesOffice/Trophy.vue"
import Computer from "@/components/executivesOffice/Computer.vue"

const selected = ref(null)
const showPaintingBackside = ref(false)

function trophy() {
  selected.value = "trophy"
}
function painting() {
  selected.value = "painting"
}
function letter() {
  selected.value = "letter"
}
function guini() {
  selected.value = "guini"
}
function plant() {
  selected.value = "plant"
}
function computer() {
  selected.value = "computer"
}
</script>

<template>
  <PuzzleContainer nextRoute="/room/ending">
    <template #puzzleIntro>
      <div v-if="selected === null">
        <h1>Executive's Office</h1>
        <p>
          Uhh, it stinks in here. You look to the right — there's a dead cat on the floor.
          That's disgusting, but there's no time to focus on that right now. You need more information.
          There's a laptop on the desk, something must be in there somewhere.
          Of course there's a password to the computer. A code with 4 digits.
          Maybe there's a clue in the room somewhere? Something personal?
        </p>

        <div class="mobile-picture">
        <Office />
        </div>

        <p>Look closer at these items:</p>

        <div class="choices">
          <button class="button" @click="trophy()">Trophy</button>
          <button class="button" @click="painting()">Painting</button>
          <button class="button" @click="letter()">Letter</button>
          <button class="button" @click="plant()">Plant</button>
          <button class="button" @click="guini()">Guini</button>
          <button class="button computer-btn" @click="computer()">Try to sign in to the computer</button>

        </div>
      </div>

      <div v-else-if="selected === 'trophy'">
        <Trophy intro @back="selected = null" />
      </div>

      <div v-else-if="selected === 'painting'">
        <Painting
          intro
          :show-backside="showPaintingBackside"
          @toggle-backside="showPaintingBackside = !showPaintingBackside"
          @back="selected = null"
        />
      </div>

      <div v-else-if="selected === 'letter'">
        <Letter intro @back="selected = null" />
      </div>

      <div v-else-if="selected === 'guini'">
        <Guini intro @back="selected = null" />
      </div>

      <div v-else-if="selected === 'plant'">
        <Plant intro @back="selected = null" />
      </div>

      <div v-else-if="selected === 'computer'">
        <Computer intro @back="selected = null" />
      </div>
    </template>

    <template #puzzleImpl="{ completed }">
      <div v-if="selected === null">
        <Office />
      </div>

      <div v-else-if="selected === 'trophy'">
        <Trophy />
      </div>

      <div v-else-if="selected === 'painting'">
        <Painting :show-backside="showPaintingBackside" />
      </div>

      <div v-else-if="selected === 'letter'">
        <Letter />
      </div>

      <div v-else-if="selected === 'guini'">
        <Guini />
      </div>

      <div v-else-if="selected === 'plant'">
        <Plant />
      </div>

      <div v-else-if="selected === 'computer'">
      <Computer @solved="markPuzzleSolved('executive-office')" />
      </div>
    </template>

  </PuzzleContainer>
</template>

<style scoped>
.choices {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
  justify-items: start;
}
.computer {
  margin-top: 40px;
}

.mobile-picture {
  display: none;
}

.button{
  width: 200px;
  padding: 10px;
  font-size: 16px;
  text-align: center;
}

.choices .computer-btn {
  background-color:#365134;
}

@media screen and (max-width: 767px) {
  .mobile-picture {
    display: block;
    margin: 0px auto;
  }

  .choices {
    display: grid;
    grid-template-columns: repeat(2, 1fr); 
    gap: 10px; 
    justify-items: center;
    margin-top: 10px;
  }

  .choices button {
    font-size: 14px;
    width: 90%;
    margin: 0;
    padding: 8px 0;
    text-align: center;
  }

  .choices .computer-btn {
    grid-column: span 2;  
  }
}
</style>

<style>
.to-puzzle-button-mobile {
  display: none !important;
}
</style>