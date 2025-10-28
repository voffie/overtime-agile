<script setup>
import { ref } from "vue"
import Successful from "./Successful.vue"

const props = defineProps({
  intro: Boolean
})

const password = ref("")
const isSuccess = ref(false)
const errorMessage = ref("")
const correctPassword = "0621"
const emit = defineEmits(["back"])

function checkPassword() {
  if (password.value === correctPassword) {
    isSuccess.value = true
  }
  else {
    isSuccess.value = false
    errorMessage.value = "Wrong password. Look closer to the items in the room for clues!"
  }
}

</script>

<template>
  <div>
    <template v-if="props.intro">
      <div v-if="!isSuccess" class="sign-in-form">
      <h1>Try to sign in to the computer</h1>
      <input type="text" 
      placeholder="Password"
      v-model="password" />
      <br> </br>
      <button class="button" v-text="'Sign In'" @click="checkPassword"></button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button class="button" @click="emit('back')">
        Go back to the office
      </button>
      </div>
      <div v-else>
        <Successful @solved="emit('solved')" />
      </div>
    </template>
    <template v-else>
      <p>Computer picture and story</p>
    </template>
  </div>
</template>

<style scoped>

.sign-in-form {
  display: grid;
  place-items: center;
  margin-top: 70px;
}

input[type="text"] {
  padding: 5px;
  font-size: 16px;
  width: 200px;
  margin-top: 30px;
  border-radius: 10px;
}

Button {
  margin-top: 10px;
  padding: 0px 30px;
  font-size: 16px;
}

.error-message {
  margin-top: 30px;
  text-align: center;
}

</style>