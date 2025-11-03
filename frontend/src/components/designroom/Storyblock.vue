<script setup>

import { watch, ref, computed } from "vue"
import Button from '@/components/Button.vue'


const overlayEntered = ref(false)


const props = defineProps({
  title: { type: String, required: true },
  startStory: { type: String, required: true },
  showButton: { type: Boolean, required: true },
  storyIsRead: { type: Boolean, required: true },
  endStory: { type: String, required: true },
  connectsTo: { type: String, required: true },
  ctaButtonText: { type: String, required: true },
  hasOverlaySlot: { type: Boolean, default: false },

})




const emit = defineEmits(['update:title', 'update:showButton'])


function ctaButtonClick() {
  if (props.ctaButtonText !== "Intro Completed") {
    emit("update:title", props.connectsTo)
  } else {
    showButtonClick()

  }
}

function showButtonClick() {
  emit("update:showButton", !props.showButton)

}

function isOverlayVisted() {
  overlayEntered.value = true
}



watch(() => props.title, () => {
  overlayEntered.value = false
})




</script>

<template>
  <h2 class="story-title"> {{ props.title }} </h2>

  <p class="story-section"> {{ props.startStory }} </p>

  <slot name="overlay" :onEntered="isOverlayVisted">
    <hr class="story-divider" />
  </slot>



  <p class="story-section"> {{ props.endStory }} </p>

  <Button class="ctaButton" :text="props.ctaButtonText" @click="ctaButtonClick"
    v-if="!props.hasOverlaySlot || overlayEntered" />


</template>


<style scoped>
.story-title {
  background-color: var(--border);
  text-align: center;
  border-radius: 2rem;
  padding: 0.5rem auto;
  line-height: 1.4;
  text-wrap: balance;
}

.story-section {
  font-family: "Syne Mono", monospace;
  font-weight: 400;
  font-style: normal;
  padding: 0.5rem auto;
  margin: 0.75rem auto;
  white-space: pre-line;


}

.story-divider {
  width: 70%;
  margin: 0 auto;
  border: 0.25rem dashed var(--border);
  line-height: 1.6;
  opacity: 0.5;
}

.ctaButton {
  display: flex;
  margin: 0.5rem auto;
  min-width: 3rem;
  min-height: 3rem;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  background: var(--container-bg);
  color: var(--text);
  text-wrap: balance;
  font-size: large;

}
</style>
