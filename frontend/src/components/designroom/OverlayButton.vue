<script setup>
import { ref, onUnmounted, onMounted } from "vue"
import Button from "../Button.vue"

const showOverlay = ref(false)
let fadeIntervall = null

const props = defineProps({
  img: { type: String, required: true },
  imgAltText: { type: String, required: true },
  title: { type: String, required: true },
  buttonTitle: { type: String, required: true },
  sound: { type: String, required: false }

})
const audio = ref(null)

const emit = defineEmits(["entered"])

function showContent() {
  if (props.sound) {

    if (!audio.value) {
      audio.value = new Audio(props.sound)

    }
    audio.value.loop = true
    audio.value.volume = 0
    audio.value.play()
    fadeIn()

  }
  showOverlay.value = true
}

function clearFadeIntervall() {
  if (fadeIntervall) {
    clearInterval(fadeIntervall)
    fadeIntervall = null
  }

}

function closeContent() {
  clearFadeIntervall()

  if (props.sound) {
    if (audio.value) {
      audio.value.loop = false
      fadeOut()
    }

  }
  showOverlay.value = false
  emit("entered")
}

function fadeOut() {
  clearFadeIntervall()

  if (!audio.value) { return }

  const steps = 30
  const decrement = 1 / steps
  const duration = 70

  fadeIntervall = setInterval(() => {
    if (audio.value.volume - decrement < 0) {
      audio.value.volume = 0
      audio.value.pause()
      clearInterval(fadeIntervall)
      fadeIntervall = null
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

function fadeIn() {
  const steps = 50
  const increment = 1 / steps
  const duration = 50

  clearFadeIntervall()


  if (!audio.value) { return }

  fadeIntervall = setInterval(() => {
    if (audio.value.volume + increment > 1) {
      audio.value.volume = 1
      clearInterval(fadeIntervall)
      fadeIntervall = null
    } else {
      audio.value.volume += increment

    }

  }, duration);
}

function stopAudioImmediately() {
  clearFadeIntervall()
  if (audio.value) {
    audio.value.pause()
    audio.value.currentTime = 0
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  stopAudioImmediately()
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
  pointer-events: all;

}

.overlay-content {
  max-width: 90%;
  max-height: 90%;

}

.overlay-title {
  padding: 1rem;
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
    overflow: auto;
  }
}
</style>
