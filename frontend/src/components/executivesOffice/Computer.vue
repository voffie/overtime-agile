<script setup>
import { ref } from "vue"
import Successful from "./Successful.vue"
import "@/assets/css/office-styles.css"
import ExecOffice from "@/views/ExecOffice.vue"

const props = defineProps({
  intro: Boolean
})

const password = ref("")
const isSuccess = ref(false)
const errorMessage = ref("")
const correctPassword = "0621"
const emit = defineEmits(["back", "solved"])

function checkPassword() {
  if (password.value === correctPassword) {
    isSuccess.value = true
    emit("solved")
  }
  else {
    isSuccess.value = false
    errorMessage.value = "Wrong password. Maybe the password is something meaningful to the CEO. Like a birthdate?"
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
      <button class="button" v-text="'Sign In'" @click="checkPassword"></button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

        <div class="mobile-picture">
      <img class="computer-img img" src="@/assets/img/execOffice/computer.png" alt="Computer" />
        </div>

      <button class="button" @click="emit('back')">
        Go back to the office
      </button>
      </div>

    </template>
    <template v-else>
      <img class="computer-img img" src="@/assets/img/execOffice/computer.png" alt="Computer" />
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
.error-message {
  margin-top: 30px;
  text-align: center;
}

.mobile-picture {
  display: none;
}

@media screen and (max-width: 767px) {
.mobile-picture {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
}

</style>