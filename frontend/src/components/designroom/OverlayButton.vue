<script setup>
import { ref, onUnmounted, onMounted } from "vue"
import Button from "../Button.vue"

const showOverlay = ref(false)

const props = defineProps({
  img: { type: String, required: true },
  imgAltText: { type: String, required: true },
  title: { type: String, required: true },
  buttonTitle: { type: String, required: true },
  sound: { type: String, required: false }

})
const audio = ref(null)

function showContent() {
  if (props.sound) {

    if (!audio.value) {
      audio.value = new Audio(props.sound)

    }
    audio.value.loop = true
    audio.value.volume = 0
    audio.value.play()
    fadeIn(audio)

  }
  showOverlay.value = true
}

function closeContent() {
  audio.value.loop = false
  showOverlay.value = false
  fadeOut(audio)
}

function fadeOut(audio) {
  const steps = 50
  const decrement = audio.value.volume / steps
  const duration = 70

  const intervallID = setInterval(() => {
    if (audio.value.volume - decrement < 0) {
      audio.value.volume = 0
      audio.value.pause()
      clearInterval(intervallID)
    } else {
      audio.value.volume -= decrement

    }

  }, duration);


}

function handleKeydown(event) {
  // This checks the key pressed ANYWHERE on the page
  if (showOverlay.value && event.key === 'Escape') {
    closeContent()
  }
}

function fadeIn(audio) {
  const steps = 50
  const increment = 1 / steps
  const duration = 50


  const intervallID = setInterval(() => {
    if (audio.value.volume + increment > 1) {
      audio.value.volume = 1
      clearInterval(intervallID)
    } else {
      audio.value.volume += increment

    }

  }, duration);
}
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

</script>


<template>

  <Button v-if="!showOverlay" :text="props.buttonTitle" @click="showContent"
    :aria-label="`Button with call for action to: ` + props.buttonTitle" />


  <section v-if="showOverlay" class="overlay-backdrop">
    <section class="overlay-content">
      <h3 class="overlay-title"> {{ props.title }} </h3>
      <figure>
        <img class="overlay-img" :src="props.img" :alt="props.imgAltText" />
      </figure>

      <Button text="Close To Story" @click="closeContent" />
    </section>
  </section>

</template>

<style scoped>
.overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

}

.overlay-content {
  max-width: 90%;
  max-height: 90%;

}

.overlay-title {
  padding: 1rem auto;
  border-radius: 1.2rem;
  background: var(--container-bg);
  text-align: center;
  margin-bottom: 0.4rem;

}

.overlay-img {
  width: 100%;

}

@media screen and (min-width: 768px) {
  .overlay-backdrop {
    max-width: 67rem;
    max-height: 67rem;
    position: relative;
  }
}
</style>
