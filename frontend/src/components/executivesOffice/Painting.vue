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
      <h1>You look closer to the painting</h1>
      <p>It feels like the woman's eyes follow me. This must be his wife.</p>
      <Button text="Go back to the office" @click="emit('back')" style="margin-top: 20px" />
    </template>
    <template v-else>
      <p>Painting picture</p>
    </template>
  </div>
</template>
