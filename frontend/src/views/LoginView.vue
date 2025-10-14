<script setup>
import Button from "@/components/Button.vue"

const test = () => {
  console.log("working")

}
const test2 = () => {
  console.log("working 2")

}
</script>

<template>
  <h1 class="login-header">Overtime</h1>
  <section class="login-page">
    <section class="form-container">
      <form class="form-login">
        <fieldset class="form-fieldset">
          <legend class="form-legend">Welcome</legend>
          <div class="form-field">
            <label class="form-label" for="username"><img src="@/assets/img/usernameIcon.svg"
                alt="username icon"></label>
            <input class="form-input" type="text" id="username" name="username" placeholder="Enter username">
          </div>
          <div class="form-field">
            <label class="form-label" for="password"><img src="@/assets/img/keyIcon.svg" alt="key icon"></label>
            <input class="form-input" type="text" id="password" name="password" placeholder="Enter password">
          </div>
        </fieldset>
        <div class="form-buttons">
          <Button class="form-button" text="LOG IN" @click.prevent="test" />
          <Button class="form-button" text="CREATE ACCOUNT" @click.prevent="test2" />
        </div>
      </form>
    </section>
  </section>
</template>


<style scoped>
.login-header {
  text-align: center;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  flex-direction: column;

}

.form-login {
  border-radius: 2rem;
  background: var(--container-bg);
  margin: 1rem;
}

.form-legend {
  font-size: x-large;
  font-weight: 700;
  margin: 0.5rem auto;

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
