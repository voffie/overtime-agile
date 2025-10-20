<script setup>
import { ref } from "vue"
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"
import TemplateChild from "@/components/template/TemplateChild.vue"
import Guini from "@/components/executivesOffice/Guini.vue"
import Letter from "@/components/executivesOffice/Letter.vue"
import Office from "@/components/executivesOffice/Office.vue"
import Painting from "@/components/executivesOffice/Painting.vue"
import Plant from "@/components/executivesOffice/Plant.vue"
import Trophy from "@/components/executivesOffice/Trophy.vue"
import Computer from "@/components/executivesOffice/Computer.vue"

const selected = ref(null)

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
  <PuzzleContainer nextRoute="/room/office">
    <!-- Desktop -->
    <template #puzzleIntro>
      <div v-if="selected === null">
      <h1>Executive's Office</h1>
      <p>Uhh, it stinks in here. You look to the right - there's a dead cat on the floor. 
        That's disgusting, but there's no time to focus on that right now. You have to find the code to get into the hard drive. 
        There's a laptop on the desk, the code must be in there somewhere. 
        Of course there's a password to the computer. Maybe there's a clue in the room somewhere? Something personal?
      </p>
      <br>
      <p>Look closer at these items:</p>

      <div class="choices">
        <Button text="Trophy in the bookshelf" @click="trophy()" />
        <Button text="Painting of a woman" @click="painting()" />
        <Button text="Letter on the table" @click="letter()" />
        <Button text="Guini in the bookshelf" @click="guini()" />
        <Button text="Plant on the floor" @click="plant()" />      
      </div> 

      <div class ="computer">
        <Button text="Try logging into the computer" @click="computer()" />
      </div>

      </div>
      <div v-else-if="selected === 'trophy'">
        <Trophy intro />
      </div>
      <div v-else-if="selected === 'painting'">
        <Painting intro />
      </div>
      <div v-else-if="selected === 'letter'">
        <Letter intro />
      </div>
      <div v-else-if="selected === 'guini'">
        <Guini intro />
      </div>
      <div v-else-if="selected === 'plant'">
        <Plant intro />
      </div>
      <div v-if="selected === 'computer'">
        <Computer intro />
      </div>

  
      </template>

    <template #puzzleImpl="{completed}">
      <div v-if="selected === null">
        <Office/>
      </div>
      <div v-else-if="selected === 'letter'">
        <Letter/>
      </div>
      <div v-else-if="selected === 'trophy'">
        <Trophy/>
      </div>
      <div v-else-if="selected === 'painting'">
        <Painting/>
      </div>
      <div v-else-if="selected === 'guini'">
        <Guini/>
      </div>
      <div v-else-if="selected === 'plant'">
        <Plant/>
      </div>
      <div v-if="selected === 'computer'">
        <Computer/>
      </div>

      <TemplateChild :solve="completed" />
      <Button text="Parent Button" @click="completed()" />
    </template>
    
    <template #puzzleOutro>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat mollis erat. Nullam
        fringilla nisl ac sapien tempor, nec interdum nunc blandit. Fusce sodales sagittis dolor,
        pharetra elementum orci vehicula vitae. Sed enim odio, viverra sit amet risus in, semper
        suscipit erat. Integer vulputate ultricies urna, ac molestie augue convallis ac. Sed
        porttitor magna in orci tempus faucibus a vitae turpis. Etiam tincidunt dolor commodo,
        volutpat purus vitae, gravida justo. Integer at ex lorem. Proin diam lacus, ultrices vitae
        pellentesque et, tincidunt ac sem. Proin.</p>
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
</style>