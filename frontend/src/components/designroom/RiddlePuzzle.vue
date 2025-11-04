<script setup>

import { computed, ref } from "vue"
import Button from "@/components/Button.vue"

const guessInput = ref("")
const text = ref("")
const guessCounter = ref(0)

const answer = ref("black")
const index = ref(0)
const isImageLoaded = ref(false)

const isWrongColor = ref(false)
const pickedColor = ref("")

const props = defineProps({
  riddles: {
    type: Object,
    required: true,
  },
});

const allRiddlesKeys = computed(() => {
  return Object.keys(props.riddles)
})

const currentRiddleKey = computed(() => {
  return [allRiddlesKeys.value[index.value]]
});

const currentRiddle = computed(() => {
  return props.riddles[currentRiddleKey.value]

})

const emit = defineEmits(["riddle-solved"]);

function isValidCSSWordColor(color) {
  const style = new Option().style;
  style.color = color;
  return style.color !== "";

}


function isColorValid(color) {
  const regexPattern = /^[a-zA-Z]+$/
  return regexPattern.test(color) && isValidCSSWordColor(color)

}

function checkColorGuess() {
  if (guessInput.value.trim().length === 0 || !isColorValid(guessInput.value)) return false;

  const lowerCaseGuess = guessInput.value.toLowerCase();
  const lowerCaseAnswer = answer.value.toLocaleLowerCase();
  return lowerCaseAnswer === lowerCaseGuess;
}

function onImageLoaded() {
  isImageLoaded.value = true
}


function isGuessCorrect() {
  if (!checkColorGuess()) {
    text.value = "Incorrect guess"
    isWrongColor.value = !isWrongColor.value
    pickedColor.value = isValidCSSWordColor(guessInput.value) ? guessInput.value : "red";
    setTimeout(() => {
      isWrongColor.value = false;
    }, 2500)
  } else {
    text.value = "Correct guess"
    index.value += 1
  }
  guessInput.value = "";
  guessCounter.value += 1;



}

</script>


<template>
  <section class="riddle-container">
    <figure class="riddle-figure" :class="{ 'fade-in': isImageLoaded, 'blurry': isImageLoaded }">
      <img v-if="!isWrongColor" @load="onImageLoaded" class="riddle-img" :src="currentRiddle.imgPath"
        :alt="currentRiddle.imgAltText">
      <div class="riddle-wrong" v-else :style="{ backgroundColor: pickedColor }">
        <h2 class="wrong-header">The Add of the Future</h2>
      </div>
    </figure>
    <section class="riddle-container">
      <section class="riddle-text" :class="{ 'show': text }">
        <p class="riddle-information"> {{ text }} </p>
        <p class="riddle-hint"> {{ text }} </p>
      </section>
      <input @keyup.enter="isGuessCorrect()" v-model="guessInput" class="riddle-input" type="text"
        placeholder="Pick a Color Slide ... ">
      <Button @click="isGuessCorrect()" class="riddle-button" text="Insert colored slide" />
    </section>
  </section>
</template>

<style scoped>
.riddle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin: 0.5rem auto;
  gap: 1rem;
}

.riddle-figure {
  display: inline-block;
  background-color: rgba(255, 255, 255, 1);
  opacity: 0;
  transition: opacity 3.5s ease-in-out;

}

.riddle-figure.fade-in {
  opacity: 1;

}

.riddle-figure.blurry {
  animation: blurry 7.5s linear;
}

@keyframes blurry {
  0% {
    filter: blur(10px);
  }

  50% {
    filter: blur(5px);
  }

  100% {
    filter: blur(0px);
  }
}

.riddle-img {
  object-fit: cover;
  width: 100%;
  height: auto;
  display: block;
}

.riddle-wrong {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 2rem;
  width: 50vw;
  height: 50vh;
  justify-content: center;
  align-items: center;

}


wrong-header {
  text-align: center;
  text-wrap: balance;
  padding: 2rem;
  height: 100%;

}

.riddle-text {
  min-height: 8rem;
  min-width: 4rem;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  text-align: center;
  text-wrap: balance;
  opacity: 0;
  transition: opacity 3.5s ease-in-out;
}

.riddle-text.show {
  opacity: 1;
}

.riddle-information {
  border: 2px dashed var(--border);
  font-family: inherit;
}

.riddle-hint {
  border: 2px solid var(--border);
  font-family: "Syne Mono", monospace;

}

.riddle-input {
  appearance: none;
  /* for Safari/Chrome */
  border: none;
  outline: none;
  background: none;

  max-width: 100%;
  width: 100%;
  padding: 0.6rem 1rem;
  background-color: #f8f8f8;
  font-family: "Syne Mono", monospace;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: var(--background);
  transition: all 0.2s ease-in-out;
  font-size: 1rem;

}

.riddle-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8);
  background-color: var(--container-bg);
  color: var(--text);
}

.riddle-input::placeholder {
  color: #aaa;
  font-style: italic;
}
</style>
