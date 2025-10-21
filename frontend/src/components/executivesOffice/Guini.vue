<script setup>
const props = defineProps({
  intro: Boolean
})

import Button from '@/components/Button.vue'
const emit = defineEmits(["back"])
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to Guini</h1>
      <p>Hmm...</p>
      <Button text="Go back to the office" @click="emit('back')" style="margin-top: 20px;" />

    </template>
    <template v-else>
      <p>Guini picture</p>
    </template>
  </div>
</template>