<script setup>
import { ref } from "vue"
import Button from "@/components/Button.vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"
import TemplateChild from "@/components/template/TemplateChild.vue"

// Build the same grid
const drawers = ref([
  { id: 1,  kind: "close", active: false, shake: false },
  { id: 2,  kind: "close", active: false, shake: false },
  { id: 3,  kind: "close", active: false, shake: false },
  { id: 4,  kind: "open",  active: false, shake: false },
  { id: 5,  kind: "close", active: false, shake: false },
  { id: 6,  kind: "open",  active: false, shake: false },
  { id: 7,  kind: "open",  active: false, shake: false },
  { id: 8,  kind: "open",  active: false, shake: false },
  { id: 9,  kind: "close", active: false, shake: false },
  { id: 10, kind: "close", active: false, shake: false },
  { id: 11, kind: "open",  active: false, shake: false },
  { id: 12, kind: "open",  active: false, shake: false },
  { id: 13, kind: "close", active: false, shake: false },
  { id: 14, kind: "open",  active: false, shake: false },
  { id: 15, kind: "open",  active: false, shake: false },
  { id: 16, kind: "open",  active: false, shake: false },
  { id: 17, kind: "close", active: false, shake: false },
  { id: 18, kind: "open",  active: false, shake: false },
  { id: 19, kind: "open",  active: false, shake: false },
  { id: 20, kind: "open",  active: false, shake: false },
]);

const userCode = ref("");     //User input
const secretCode = "F";       // correct code
const message = ref("");      // message text
const messageType = ref("")   // "success" or "error"

function onDrawerClick(d) {
  if (d.kind === "open") {
    // ignore if already open
    if (d.active) return

    d.active = true
    d.text = "open"

    setTimeout(() => {
      d.active = false
      d.text = ""
    }, 3000)
  } else {
    // closed/locked drawer feedback: shake + "closed!"
    d.shake = false
   
    // re-trigger animation
    requestAnimationFrame(() => (d.shake = true,  d.text = "closed!"))
    setTimeout(() => (d.shake = false, d.text = "X"), 600)
  }
}

function tryUnlock() {
  if (userCode.value.toUpperCase() === secretCode) {
    // unlock one of the locked drawers, e.g. the first closed one
    const locked = drawers.value.find(d => d.kind === "close")
    if (locked) {
      locked.kind = "open"
      message.value = "✅ You unlocked a drawer!"
      messageType.value = "success"
    }
  } else {
    message.value = "⚠️ Wrong code! Try again."
    messageType.value = "error"
  }

  // clear message after a few seconds
  setTimeout(() => {
    message.value = ""
  }, 3000)
}

</script>

<template>
  <PuzzleContainer nextRoute="/room/design">
    <!-- Intro stays the same -->
    <template #puzzleIntro>
      <p>
        <!-- The Archive Room feels different from the rest of the office — quieter, tidier, almost too perfect.<br><br>  -->
        Rows of sleek metal cabinets line the wall, each labeled neatly with engraved metal tags:<br>
        GUINI INTERNAL / VERSIONS / ARCHIVE STORAGE<br><br>
        <!-- The air smells faintly of disinfectant and new plastic.<br> -->
        You can almost hear your own footsteps against the polished floor.<br>
        Heartcore always took pride in order. Every document, every wire, every byte — exactly where it should be.<br><br>
        You approach the main archive cabinet — the one used for physical backups before everything moved to the cloud.<br><br>
        You start to open the drawers. Some are unlocked, some refuse to budge… <strong>Does it mean something?</strong><br><br><br>
        Beside the cabinet, a small digital keypad blinks softly.<br>
        It seems you’ll need a code to access the rest.
      </p>
    </template>

    <template #puzzleImpl="{ completed }">
      <TemplateChild :solve="completed" />
      
      <!-- GAME  -->
    <div class="flexContainer">
      <div class="container">
        <div
          v-for="d in drawers"
          :key="d.id"
          :class="[
            d.kind === 'open' ? 'open' : 'close',
            d.active ? 'active' : '',
            d.shake ? 'shake' : ''
          ]"
          @click="onDrawerClick(d)"
        >
          {{ d.text }}
        </div>
      </div>

      <div class="board">
        <p>
          Some drawers seems to be unlocked, some refuse to open…<br>
          <strong>Does it mean something?</strong><br>
          Can you figure out the secret symbol? <br><br>
        </p>

        <input
          v-model="userCode"
          maxlength="1"
          type="text"
          class="code-input"
          placeholder="?"
        />
        <Button text="Submit" @click="tryUnlock" />
        <!-- Inline message -->
        <p v-if="message" :class="['message', messageType]">{{ message }}</p>
      </div>
    </div>

      <Button text="Parent Button" @click="completed()" />
    </template>

    <!-- Outro stays the same -->
    <template #puzzleOutro>
      <div class="flexContainer">
      <div>
      <p>
        You enter the code into the keypad.<br>
        The lock clicks.<br><br>
        A soft metallic sound echoes through the room as the remaining drawers slide open automatically.<br><br>

        Inside one of the newly opened drawers lies a small box labeled:<br>
        “Guini – Prototype Batch D / Integration Logs / Confidential.”<br><br>
        Beneath the box rests a thin, old-fashioned diapositive film slide, marked carefully in pen:<br>
        “F.M. — 04/09”<br><br>
        It seems to be someone’s initials… but you don’t know anyone by that name.<br><br>
        You hold the slide up toward the light — but it’s too faint to make out.<br><br>
        It looks like some kind of schematic or layout, but the details are impossible to see without the right equipment.<br>
        And if anyone in Heartcore would have the proper tools, it’s the Design team.<br><br>
        You place the slide carefully into your pocket and jot a quick note on your tablet.<br>
        As you leave, the cabinet automatically locks behind you — drawers sliding back into their perfectly aligned grid with a quiet hum.<br>
      </p>
      </div>
      <div>
        <img src="../assets/img/archiveRoom/Outro_archiveRoom.png" class="image_archiveRoom">
      </div>
    </div>
    </template>
  </PuzzleContainer>
</template>

<style scoped>

.flexContainer {
  display: block;
  margin: 0;
  padding: 0;
}

.container {
  background-image: url("../assets/img/archiveRoom/cabinet_drawer_alt2_520.png");
  display: grid;
  grid-template-columns: repeat(4, 71px);
  grid-template-rows: repeat(5, 60px);
  gap: 6px;
  padding: 7px;
  padding-left: 16px;
  background-size: cover;
  background-position: center;
}

/* OPENABLE drawers */
.open {
  background-color: rgb(82, 82, 189);
  opacity: 0.5;
  color: white;
  transition: all 0.5s ease;
}

/* NON-OPENABLE drawers */
.close {
  background-color: rgb(82, 82, 189);
  opacity: 0.5;
  color: white;
  position: relative;
  mask-image: url("../assets/img/lock_black.png");
}

/* When an openable drawer is active/open */
.open.active {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-image: url("../assets/img/archiveRoom/cabinet_illustration_drawer_cutout_120.png");
  color: #111;
  background-size: cover; /* or cover */
  background-position: center;
}


/* Shake animation for closed drawers */
.shake { animation: shake 0.25s linear 1; }
@keyframes shake {
  0%{ transform: translateX(0); }
  25%{ transform: translateX(-4px); }
  50%{ transform: translateX(4px); }
  75%{ transform: translateX(-3px); }
  100%{ transform: translateX(0); }
}

.board {
  display: block;
  align-items: center;
  margin-top: 1rem;
  width: 300px;
  height: 350px;
  padding: 10px;
  border: 2px solid #444;
  border-radius: 8px;
  background-color: #5b5c75;
  font-size: 14px ;  
}

.code-input {
  width: 100px;
  height: 150px;
  text-align: center;
  font-size: 68px;
  margin-right: 10px;
  border: 10px solid #4a4e52;
  border-radius: 4px;
  background-image: url("../assets/img/archiveRoom/digiBoard.png");
}

.image_archiveRoom {
  width: 350px;
}


/* DESKTOP */
@media screen and (min-width: 768px) { 

.flexContainer {
  display:flex;
}

.image_archiveRoom {
  width: 800px;
  padding: 5rem;
}

.container {
  background-image: url("../assets/img/archiveRoom/cabinet_drawer_alt2_520.png");
  width: 580px;
  display: grid;
  grid-template-columns: repeat(4, 120px);
  grid-template-rows: repeat(5, 102px);
  gap: 10px;
  padding: 30px;
  padding-top: 40px;
  margin-top: 2rem;
  margin-left: 10rem;
}

.board {
  display: block;
  margin-top: 5rem;
  width: 350px;
  height: 450px;
  padding: 20px;
  border: 2px solid #444;
  border-radius: 8px;
  background-color: #5b5c75;
}

/* When an openable drawer is active/open */
.open.active {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  background-image: url("../assets/img/archiveRoom/cabinet_illustration_drawer_cutout_120.png");
  color: #111;
}

.code-input {
  width: 100px;
  height: 150px;
  text-align: center;
  font-size: 68px;
  margin-right: 10px;
  border: 10px solid #4a4e52;
  border-radius: 4px;
  background-image: url("../assets/img/archiveRoom/digiBoard.png");
}
}
</style>