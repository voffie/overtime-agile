<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the plant</h1>
      <p>This plant got pests</p>
    </template>
    <template v-else>
      <p>Plant picture</p>
    </template>
  </div>
</template>