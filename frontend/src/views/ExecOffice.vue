<script setup>
import { ref } from "vue"
import PuzzleContainer from "@/components/PuzzleContainer.vue"
import Guini from "@/components/executivesOffice/Guini.vue"
import Letter from "@/components/executivesOffice/Letter.vue"
import Office from "@/components/executivesOffice/Office.vue"
import Painting from "@/components/executivesOffice/Painting.vue"
import Plant from "@/components/executivesOffice/Plant.vue"
import Trophy from "@/components/executivesOffice/Trophy.vue"

const selected = ref(null)
const showPaintingBackside = ref(false)

const password = ref("")
const isSuccess = ref(false)
const errorMessage = ref("")
const correctPassword = "0621"

function trophy() { selected.value = "trophy" }
function painting() { selected.value = "painting" }
function letter() { selected.value = "letter" }
function guini() { selected.value = "guini" }
function plant() { selected.value = "plant" }

function checkPassword(completed) {
  if (password.value === correctPassword) {
    isSuccess.value = true
    if (completed) completed() 
  } else {
    isSuccess.value = false
    errorMessage.value = "Wrong password. Maybe the password is something meaningful to the CEO. Like a birthdate?"
  }
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

     <div v-if="selected === null">
     <div class="sign-in-form">
     <h2>Try to sign in to the computer</h2>
     <input type="text" placeholder="Enter 4-digit password" v-model="password" />
     <button class="button" @click="() => checkPassword(completed)">Sign In</button>
     <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
     </div>
     </div>

    </template>

    

    <template #puzzleOutro>
      <div class="success">
        <h1>Success!!</h1>
        <p>You successfully logged into the computer!</p>
       <img class="computer-img" src="@/assets/img/execOffice/computer.png" alt="Computer" />
      </div>
    </template>
  </PuzzleContainer>
</template>

<style scoped>
.office-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.sign-in-form {
  position: absolute;
  top: 500px;          /* distance from top of the picture */
  left: 65%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: rgba(235, 166, 88, 0.95);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
  width: 90%;
  max-width: 300px;
}

.sign-in-form input[type="text"] {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.sign-in-form .button {
  width: 100%;
  padding: 10px 0;
  border-radius: 8px;
  background-color: #365134;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sign-in-form .button:hover {
  background-color: #2b4229;
}

.sign-in-form .error-message {
  margin-top: 10px;
  color: #000000;
  font-size: 14px;
}


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

  .computer-img {
    width: 60%;
  }

    .success {
    display: grid;
    justify-items: center;
  }

@media screen and (max-width: 767px) {

.sign-in-form {
  position: absolute;
  top: 300px;      
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background-color: rgba(235, 166, 88, 0.95);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  text-align: center;
  width: 90%;
  max-width: 300px;
}

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
