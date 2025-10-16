<script setup>
import { useRouter } from 'vue-router'
import { ref, reactive } from "vue"
import Button from "@/components/Button.vue"

const isLogin = ref(true)
const routeToNextPage = useRouter();

const formValues = reactive({
  username: "",
  password: "",
  repeatPassword: "",
})

const errorMessages = reactive({
  username: "",
  password: "",
  repeatPassword: ""
})

const formValidator = (mode = "login") => {
  const usernameValidator = isValidUsername(formValues.username)
  const passwordValidator = isValidPasswordFormat(formValues.password)
  const passwordsValueValidator = isTheSamePassword(formValues.password, formValues.repeatPassword)
  let validForm = true;
  errorMessages.username = "";
  errorMessages.password = "";
  errorMessages.repeatPassword = "";

  if (!usernameValidator) {
    errorMessages.username = ">>> Username requires: 5+ characters. Allowed:  A-Za-z, 0-9, space, and . <<<"
    validForm = false;
  }

  if (!passwordValidator) {
    errorMessages.password = ">>> Password requires: 8+ characters. Allowed:  A-Za-z, 0-9, symbols:  @ ! ? . and space. <<<"
    validForm = false;
  }

  if (mode === "register") {

    if (!passwordsValueValidator) {
      errorMessages.repeatPassword = ">>> Password entered are not matching <<<"
      validForm = false;
    }

  }

  return validForm;


}

const handlesLogin = () => {
  if (formValidator("login")) {
    routeToNextPage.push({ name: "game-intro" })

  }

}

const handlesRegistration = () => {
  if (formValidator("register")) {
    console.log("new register player")

  }

}

const changeForm = () => {
  console.log("Loads page")
  isLogin.value = !isLogin.value

}

const isValidUsername = (userNameEntered) => {
  if (!userNameEntered) {
    return false;
  }

  // Accepts letters, digits, nordic åäö
  const patternRegex = /^[A-Za-zÅÄÖåäö0-9. ]+$/;
  const miniLength = 5;
  return patternRegex.test(userNameEntered) && userNameEntered.length >= miniLength;

}

const isValidPasswordFormat = (userPasswordEntered) => {

  if (!userPasswordEntered) {
    return false;
  }

  // Accepts letters, digits symbols: @?-._<space>
  const patternRegex = /^[A-Za-z0-9@!?_.\- ]{8,64}$/;
  const miniLength = 8;
  return patternRegex.test(userPasswordEntered) && userPasswordEntered.length >= miniLength;
}

const isTheSamePassword = (userPasswordEntered, repeatedEnteredPassword) => {
  if (!userPasswordEntered || !repeatedEnteredPassword) {
    return false;
  }
  return userPasswordEntered === repeatedEnteredPassword;

}


</script>

<template>
  <section class="home-page">
    <h1 class="login-header">{{ isLogin ? "Overtime" : "Credentials" }}</h1>
    <section v-if="isLogin" class="login-page">
      <section class="form-container">
        <form class="form-login" @submit.prevent="handlesLogin">
          <fieldset class="form-fieldset">
            <legend class="form-legend">Welcome</legend>
            <div class="form-field">
              <label class="form-label" for="username"><img src="@/assets/img/usernameIcon.svg"
                  alt="username icon"></label>
              <input v-model="formValues.username" class="form-input" type="text" id="username" name="username"
                placeholder="Enter username" required>
            </div>
            <p class="warning-message" v-if="errorMessages.username"> <code>{{ errorMessages.username }}</code></p>
            <div class="form-field">
              <label class="form-label" for="password"><img src="@/assets/img/keyIcon.svg" alt="key icon"></label>
              <input v-model="formValues.password" class="form-input" type="password" id="text" name="password"
                placeholder="Enter password" required>
            </div>
            <p class="warning-message" v-if="errorMessages.password"> <code> {{ errorMessages.password }} </code></p>
          </fieldset>
          <div class="form-buttons">
            <Button class="form-button" text="LOG IN" type="submit" />
            <div class="secondary-form-container">
              <Button class=" form-button form-button-secondary" text="CREATE ACCOUNT" @click.prevent="changeForm" />
            </div>
          </div>
        </form>
      </section>
    </section>

    <section v-else class="registration-page">
      <section class="registration-container">
        <form class="form-registration" @submit.prevent="handlesRegistration">
          <fieldset class="registration-fieldset">
            <legend class="form-legend">Enter Your Credentials</legend>
            <div class="form-field">
              <label class="form-label" for="username"><img src="@/assets/img/usernameIcon.svg"
                  alt="username icon"></label>
              <input v-model="formValues.username" class="form-input" type="text" id="username" name="username"
                placeholder="Enter username" required>
            </div>
            <p class="warning-message" v-if="errorMessages.username"> <code>{{ errorMessages.username }}</code></p>
            <div class="form-field">
              <label class="form-label" for="password"><img src="@/assets/img/keyIcon.svg" alt="key icon"></label>
              <input v-model="formValues.password" class="form-input" type="text" id="password" name="password"
                placeholder="Enter password" required>
            </div>
            <p class="warning-message" v-if="errorMessages.password"> <code> {{ errorMessages.password }} </code></p>
            <div class="form-field">
              <label class="form-label" for="password"><img src="@/assets/img/keyIconRepeat.svg"
                  alt="two arrows icon circular pattern"></label>
              <input v-model="formValues.repeatPassword" class="form-input" type="text" id="password" name="password"
                placeholder="Repeat password" required>
            </div>
            <p class="warning-message" v-if="errorMessages.repeatPassword"> <code> {{
              errorMessages.repeatPassword }} </code></p>
          </fieldset>
          <div class="form-buttons">
            <Button class="form-button" text="CREATE ACCOUNT" type="submit" />
            <div class="secondary-form-container">
              <Button class="form-button form-button-secondary" text="GO BACK TO LOG IN" @click.prevent="changeForm" />
            </div>
          </div>
        </form>
      </section>
    </section>
  </section>
</template>


<style scoped>
.home-page {
  height: 100%;
  padding: 1rem;
  overflow-y: scroll;

}

.login-header {
  text-align: center;
}

.form-container,
.registration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  flex-direction: column;
  border-radius: 2rem;
  background: var(--container-bg);
  width: clamp(12.5rem, 100%, 28rem);

}

.login-page,
.registration-page {
  width: 100%;

}

.form-login,
.form-registration {
  width: 100%;
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

.warning-message {
  text-align: center;
  font-size: large;
  text-wrap: balance;
  color: var(--warning);
  margin: 0.4rem auto;
  width: 80%;
}

.form-buttons {
  padding: 1rem;

}

.form-button {
  width: 100%;
  margin: 1rem auto;
  font-size: larger;

}

.secondary-form-container {
  border-top: 0.2rem double var(--border);
}

.form-button-secondary {
  font-size: small;

}

@media screen and (min-width: 768px) {


  .form-container,
  .registration-container {
    width: clamp(20rem, 70%, 42rem);
    margin: 1rem auto;
    border-radius: 2rem;
  }

}
</style>
