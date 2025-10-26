<script setup>
const props = defineProps({
  intro: Boolean,
})

import Button from '@/components/Button.vue'
const emit = defineEmits(['back'])
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the plant</h1>
      <p>This plant got pests</p>
      <Button text="Go back to the office" @click="emit('back')" style="margin-top: 20px" />
    </template>
    <template v-else>
      <div class="plant-img-crop">
        <img class="plant-img" src="@/assets/img/execOffice/plantinvestation.gif" alt="plant" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.plant-img-crop {
  height: 700px;
  overflow: hidden;
  width: 83%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plant-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: cover;
  object-position: center;
}
</style>
