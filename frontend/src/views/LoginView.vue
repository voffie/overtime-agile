<script setup>
import { ref, reactive } from "vue"
import Button from "@/components/Button.vue"

const isLogin = ref(true)

const formValues = reactive({
  username: "",
  password: "",
  repeatPassword: ""
})

const test = () => {
  console.log("working")
  console.log(formValues.username)

}
const registrationForm = () => {
  console.log("working 2")
  isLogin.value = !isLogin.value

}
</script>

<template>
  <h1 class="login-header">{{ isLogin ? "Overtime" : "Credentials" }}</h1>
  <section v-if="isLogin" class="login-page">
    <section class="form-container">
      <form class="form-login" @submit.prevent="test">
        <fieldset class="form-fieldset">
          <legend class="form-legend">Welcome</legend>
          <div class="form-field">
            <label class="form-label" for="username"><img src="@/assets/img/usernameIcon.svg"
                alt="username icon"></label>
            <input v-model="formValues.username" class="form-input" type="text" id="username" name="username"
              placeholder="Enter username" required>
          </div>
          <div class="form-field">
            <label class="form-label" for="password"><img src="@/assets/img/keyIcon.svg" alt="key icon"></label>
            <input class="form-input" type="text" id="password" name="password" placeholder="Enter password" required>
          </div>
        </fieldset>
        <div class="form-buttons">
          <Button class="form-button" text="LOG IN" type="submit" />
          <Button class="form-button" text="CREATE ACCOUNT" @click.prevent="registrationForm" />
        </div>
      </form>
    </section>
  </section>

  <section v-else class="registration-page">
    <section class="registration-container">
      <form class="form-registration" @submit.prevent="test">
        <fieldset class="registration-fieldset">
          <legend class="form-legend">Enter Your Credentials</legend>
          <div class="form-field">
            <label class="form-label" for="username"><img src="@/assets/img/usernameIcon.svg"
                alt="username icon"></label>
            <input class="form-input" type="text" id="username" name="username" placeholder="Enter username" required>
          </div>
          <div class="form-field">
            <label class="form-label" for="password"><img src="@/assets/img/keyIcon.svg" alt="key icon"></label>
            <input class="form-input" type="text" id="password" name="password" placeholder="Enter password" required>
          </div>
          <div class="form-field">
            <label class="form-label" for="password"><img src="@/assets/img/keyIconRepeat.svg"
                alt="two arrows icon circular pattern"></label>
            <input class="form-input" type="text" id="password" name="password" placeholder="Repeat password" required>
          </div>
        </fieldset>

        <div class="form-buttons">
          <Button class="form-button" text="GO BACK TO LOG IN" @click.prevent="registrationForm" />
          <Button class="form-button" text="CREATE ACCOUNT" type="submit" />
        </div>
      </form>
    </section>

  </section>


</template>


<style scoped>
.login-header {
  text-align: center;
}

.login-page,
.registration-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  flex-direction: column;

}

.form-login,
.form-registration {
  border-radius: 2rem;
  background: var(--container-bg);
  margin: 1rem;
}

.form-legend {
  font-size: x-large;
  font-weight: 700;
  margin: 0.5rem auto;
  text-align: center;

}

.form-field {
  display: flex;
  background: #aba3ab;
  border-radius: 1rem;
  margin: 1rem;
  flex-direction: row;
}

.form-label {
  margin-left: 1rem;
  padding: 0.4rem;
}

.form-input {
  background: #aba3ab;
  border-radius: 1rem;
  width: 75%;
  border: none;
  outline: none;
  caret-color: #000000;
  font-weight: bolder;
}

.form-buttons {
  padding: 1rem;

}

.form-button {
  min-width: 200px;
  width: 100%;
  margin: 1rem auto;
  font-size: larger;

}
</style>
