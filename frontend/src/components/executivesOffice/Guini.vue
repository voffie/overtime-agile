<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to Guini</h1>
      <p>Hmm...</p>
    </template>
    <template v-else>
      <p>Guini picture</p>
    </template>
  </div>
</template>