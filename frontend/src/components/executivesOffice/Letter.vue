<script setup>
import "@/assets/css/office-styles.css"
const props = defineProps({
  intro: Boolean
})

import Button from '@/components/Button.vue'
const emit = defineEmits(["back"])
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the letter</h1>
      <p>There's several interesting topics in this letter...</p>
      <button class="button" @click="emit('back')">
        Go back to the office
      </button>
    </template>
    <template v-else>
  <div class="letter-img-crop">
    <img class="letter-img img" src="@/assets/img/execOffice/letter.png" alt="letter" />
  </div>
    </template>
  </div>
</template>
