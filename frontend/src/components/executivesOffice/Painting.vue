<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the painting</h1>
      <p>It feels like the woman's eyes follow me. This must be his wife.</p>
    </template>
    <template v-else>
      <p>Painting picture</p>
    </template>
  </div>
</template>