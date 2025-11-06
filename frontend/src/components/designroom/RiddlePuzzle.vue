<script setup>
import { riddleData as riddleTextImported } from "@/components/designroom/data/riddleData"
import { computed, ref } from "vue"
import Button from "@/components/Button.vue"

const guessInput = ref("")
const guessCounter = ref(0)
const text = ref("")
const riddleKeys = ["riddle1", "riddle2", "riddle3", "confession"]
const isTransitioning = ref(false)


const index = ref(0)
const isImageLoaded = ref(false)

const isWrongColor = ref(false)
const pickedColor = ref("")

const props = defineProps({
  riddles: {
    type: Object,
    required: true,
  },

  riddleText: {
    type: Object,
    required: false,
    default: () => riddleTextImported,
  }
});

const allRiddlesKeys = computed(() => {
  return riddleKeys.filter(key => props.riddles[key])
})

const currentRiddleKey = computed(() => {
  if (index.value >= allRiddlesKeys.value.length) {
    return allRiddlesKeys.value[allRiddlesKeys.value.length - 1]
  }
  return allRiddlesKeys.value[index.value]
});

const currentRiddle = computed(() => {
  return props.riddles[currentRiddleKey.value]

})

const currentRiddleText = computed(() => {
  return props.riddleText[currentRiddleKey.value]

})

const wrongHeaderText = computed(() => {
  if (text.value === "Incorrect guess") return "The Add of the Future";
  return `This "${pickedColor.value.toLowerCase()}" slide is different ...`

})

const riddleHint = computed(() => {

  if (guessCounter.value > 0 && guessCounter.value % 3 === 0 && currentRiddleText.value.hint) {
    const hints = currentRiddleText.value.hint;
    const idx = Math.floor(Math.random() * hints.length);
    return hints[idx];

  }

  return "Mhh might need to read this again..";

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
  const lowerCaseAnswer = currentRiddleText?.value?.answer.toLowerCase();
  return lowerCaseAnswer === lowerCaseGuess;
}

function onImageLoaded() {
  isImageLoaded.value = true
}

function handlesWrongGuess() {
  text.value = "Incorrect guess"
  isWrongColor.value = !isWrongColor.value
  pickedColor.value = isValidCSSWordColor(guessInput.value) ? guessInput.value : "red";
  setTimeout(() => {
    isWrongColor.value = false;
    text.value = ""
  }, 2500)
}

function handlesCorrectGuess() {
  let solvedRiddleKey = currentRiddleKey.value
  emit("riddle-solved", solvedRiddleKey)
  text.value = ""
  index.value += 1
  guessCounter.value = 0
  pickedColor.value = guessInput.value
  isWrongColor.value = true
  isTransitioning.value = true
  setTimeout(() => {
    isWrongColor.value = false;
    text.value = ""
    index.value = 0
    isTransitioning.value = false
    isImageLoaded.value = false
  }, 3500)

}


function isGuessCorrect() {
  if (!checkColorGuess()) {
    handlesWrongGuess()
  } else {
    handlesCorrectGuess()
  }
  guessInput.value = "";
  guessCounter.value += 1;
}

</script>


<template>
  <section class="riddle-container">
    <section class="riddle-text" :class="{ 'show': currentRiddleText?.riddleInfo }">
      <p v-if="!isTransitioning" class="riddle-information"> {{ currentRiddleText?.riddleInfo }} </p>
    </section>
    <figure v-show="isImageLoaded" class="riddle-figure" :class="{ 'fade-in': isImageLoaded, 'blurry': isImageLoaded }">
      <img v-if="!isWrongColor" @load="onImageLoaded" class="riddle-img" :src="currentRiddle.imgPath"
        :alt="currentRiddle.imgAltText">
      <div class="riddle-wrong" v-else :style="{ backgroundColor: pickedColor }">
        <h2 class="wrong-header">
          {{ wrongHeaderText }}
        </h2>
      </div>
    </figure>
    <section class="riddle-input-container">
      <section v-if="!isTransitioning" class="riddle-text" :class="{ 'show': currentRiddleText?.riddleInfo }">
        <p :style="{ fontFamily: 'Share Tech Mono, monospace' }">{{ text }}</p>
        <p v-show="guessCounter >= 3 && riddleHint" class="riddle-hint"> {{ riddleHint }} </p>
      </section>
      <section class="riddle-input-container" v-if="currentRiddleKey !== 'confession'">
        <input @keyup.enter="isGuessCorrect()" v-model="guessInput" class="riddle-input" type="text"
          placeholder="Pick a Color Slide ... ">
        <Button @click="isGuessCorrect" class="riddle-button" text="Insert colored slide" />
      </section>
    </section>
  </section>
</template>

<style scoped>
.riddle-container,
.riddle-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin: 0.5rem auto;
  row-gap: 0.5rem;
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
  height: 70vh;
  width: 70vw;
  justify-content: center;
  align-items: center;
  border: 4px dashed var(--border);

}


.wrong-header {
  text-align: center;
  text-wrap: balance;
  padding: 0.5rem;
  background: var(--background);
  border-radius: 1rem 0.5rem;
  margin: 0.5rem auto;

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
  white-space: pre-line;
}

.riddle-text.show {
  opacity: 1;
}

.riddle-information {
  border: 2px dashed var(--border);
  font-family: inherit;
  padding: 1rem;
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

.riddle-button {
  min-height: 4rem;
  min-width: 4rem;
  margin: 0.5rem auto;
  width: 100%;
  font-size: larger;
}
</style>
