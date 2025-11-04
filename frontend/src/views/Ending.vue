<script setup>
import { ref } from "vue"
import "@/assets/css/office-styles.css"
import Press from "@/components/ending/Press.vue"
import Quit from "@/components/ending/Quit.vue";
import Stay from "@/components/ending/Stay.vue";

const selected = ref(null)

function stay() {
  selected.value = "stay"
}
function quit() {
  selected.value = "quit"
}
function press() {
  selected.value = "press"
}

function showChoices() {
  selected.value = "choices"
}

function goBackToIntro() {
  selected.value = "intro"
}

</script>

<!-- Desktop -->
<template>
  <div v-if="!selected || selected === 'intro'" id="ending-text">
    <p>
      You've discovered that Guini wasn't just helping families “organize”. It has been harvesting data about families
      routines and schedules
      to be able to nudge families to behave in certain ways that's been profitable for certain brands and companies.
      This was tested secretly
      on families with children because they have predictable habit loops. But what if this wasn't fiction… What if
      Guini…
      Already exists? Not the Bunny. Not the cute voice. But the silent kind. Harvesting routines. Predicting behavior.
      Shaping choices you thought
      were yours. At work. At home. On your phone right now.
    </p>
    <button class="choices-and-back-button" @click="showChoices">Go to choices</button>
  </div>


<div v-else-if="selected === 'choices'">
   <div class="choices-intro">
  <h1>What do you do?</h1>
 <p>
    Would you pretend it isn't real? Ignorance is comfortable. Would you go to public? Alert
    the authorities right away tell someone. Maybe they'll believe you. Maybe they won't. Burn it all down. Destroy the system before it grows.
    Or would you join them. Power is profitable. Bending humanity is lucrative.
  </p>
  </div>

  <div class="choices">
    <div class="choice-item">
      <button id="stay-button" @click="stay">Stay working for the company</button>
      <img src="@/assets/img/ending/dalailama.png" alt="Person working at a computer" />
    </div>

    <div class="choice-item">
      <button id="quit-button" @click="quit">Quit the job</button>
      <img src="@/assets/img/ending/dalailama.png" alt="Person walking away from office building" />
    </div>

    <div class="choice-item">
      <button id="press-button" @click="press">Go to the press</button>
      <img src="@/assets/img/ending/dalailama.png" alt="Person taking photo of a building with a camera" />
    </div>
  </div>
</div>

    <button v-if="selected === 'choices'" class="choices-and-back-button" @click="goBackToIntro">Back to intro</button>


  <div v-if="selected === 'stay'">
    <Stay />
  </div>

  <div v-else-if="selected === 'quit'">
    <Quit />
  </div>

  <div v-else-if="selected === 'press'">
    <Press />
  </div>

</template>



<style scoped>
.choices-intro {
  font-size: 20px;
  text-align: center;
}

.choices{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 50px auto 0 auto; 
  justify-items: center; 
  gap: 0;
  }

  .choice-item {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 10px;             
}

.choices button {
  cursor: pointer;
  color: var(--button-text);
  background-color: var(--button-bg);
  border-radius: 10px;
  font-weight: bold;
  padding: 5px 15px;
  border: none;
  margin-bottom: 15px;
}

.choices-and-back-button {
  margin-top: 300px;
  cursor: pointer;
  color: var(--button-text);
  background-color: var(--button-bg);
  border-radius: 10px;
  font-weight: bold;
  padding: 5px 15px;
  border: none;
}

img {
  border-radius: 20px;
}

@media screen and (max-width: 767px) {
  .choices {
    grid-template-columns: 1fr;
    gap: 20px; 
    width: 100%;
  }

  .choices-and-back-button {
    margin-top: 20px;
  }

}

</style>
