<script setup>
import { useRouter } from "vue-router"
import { ref, reactive } from "vue"
import FormField from "@/components/FormField.vue"
import FormButton from "@/components/FormButton.vue"
import usernameIcon from "@/assets/img/usernameIcon.svg"
import keyIcon from "@/assets/img/keyIcon.svg"
import keyIconRepeat from "@/assets/img/keyIconRepeat.svg"

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
    errorMessages.username = ">>> Username requires: 5+ characters. Allows:  A-Za-z, 0-9, space, and . <<<"
    validForm = false;
  }

  if (!passwordValidator) {
    errorMessages.password = ">>> Password requires: 8+ characters. Allows:  A-Za-z, 0-9, symbols: _  @ ! ? . and space. <<<"
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

const handlesSubmit = (isLogin) => {
  if (isLogin) {
    handlesLogin()

  } else {
    handlesRegistration()
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
    <section class="login-page">
      <section class="form-container">
        <form class="form-login" @submit.prevent="handlesSubmit(isLogin)">
          <fieldset class="form-fieldset">
            <legend class="form-legend">{{ isLogin ? "Welcome" : "New Account" }}</legend>
            <FormField v-model="formValues.username" label-for="username" :icon-src="usernameIcon"
              icon-alt="username icon" input-type="text" name="username" placeholder="Enter username" :required="true"
              :warning-message="errorMessages.username" />
            <FormField v-model="formValues.password" label-for="password" :icon-src="keyIcon" icon-alt="key icon"
              input-type="password" name="password" placeholder="Enter password" :required="true"
              :warning-message="errorMessages.password" />
            <FormField v-if="!isLogin" v-model="formValues.repeatPassword" label-for="repeatpassword"
              :icon-src="keyIconRepeat" icon-alt="arrows in a circular pattern" input-type="password"
              name="repeatpassword" placeholder="Enter password again" :required="true"
              :warning-message="errorMessages.repeatPassword" />
          </fieldset>
          <FormButton :primary-button-text="isLogin ? 'LOG IN' : 'CREATE ACCOUNT'" primary-button-type="submit"
            :secondary-button-text="isLogin ? 'CREATE ACCOUNT' : 'GO BACK TO LOG IN'"
            :secondary-button-click="changeForm" />
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

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  flex-direction: column;
  border-radius: 2rem;
  background: var(--container-bg);
  width: clamp(12.5rem, 90%, 28rem);

}

.login-page {
  width: 100%;
}

.form-login {
  width: 100%;
  margin: 1rem;
}

.form-legend {
  font-size: x-large;
  font-weight: 700;
  margin: 0.5rem auto;
  text-align: center;

}

@media screen and (min-width: 768px) {


  .form-container {
    width: clamp(20rem, 70%, 42rem);
    margin: 1rem auto;
  }

}
</style>
