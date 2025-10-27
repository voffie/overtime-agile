<script setup>
import Button from '@/components/Button.vue'
import "@/assets/css/office-styles.css"

const props = defineProps({
  intro: Boolean
})
const emit = defineEmits(["back"])
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the plant</h1>
      <p>This plant got pests</p>
      <button class="button" @click="emit('back')">
        Go back to the office
      </button>
    </template>
    <template v-else>
  <div class="plant-img-crop">
    <img class="plant-img img" src="@/assets/img/execOffice/plantinvestation.gif" alt="plant" />
  </div>
    </template>
  </div>
</template>
