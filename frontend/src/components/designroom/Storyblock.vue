<script setup>

import Button from '@/components/Button.vue'


const props = defineProps({
  title: { type: String, required: true },
  startStory: { type: String, required: true },
  showButton: { type: Boolean, required: true },
  storyIsRead: { type: Boolean, required: true },
  endStory: { type: String, required: true },
  connectsTo: { type: String, required: true },
  ctaButtonText: { type: String, required: true },

})
const emit = defineEmits(['update:title', 'update:showButton'])

function ctaButtonClick() {
  emit("update:title", props.connectsTo)
}

function showButtonClick() {
  emit("update:showButton", !props.showButton)

}



</script>

<template>
  <h2 class="story-title"> {{ props.title }} </h2>

  <p class="story-section"> {{ props.startStory }} </p>

  <slot name="overlay">
    <hr class="story-divider" />
  </slot>



  <p class="story-section"> {{ props.endStory }} </p>

  <Button text="test" @click="showButtonClick" v-if="props.storyIsRead === true" />
  <Button :text="props.ctaButtonText" @click="ctaButtonClick" />


</template>


<style scoped>
.story-title {

  background-color: var(--border);
  text-align: center;
  border-radius: 2rem;
  padding: 0.5rem, auto;
  line-height: 1.4;

}

.story-section {
  font-family: "Syne Mono", monospace;
  font-weight: 400;
  font-style: normal;
  padding: 0.5rem auto;
  margin: 0.75rem auto;


}

.story-divider {
  width: 70%;
  margin: 0 auto;
  border: 0.25rem dashed var(--border);
  line-height: 1.6;
  opacity: 0.5;
}
</style>
