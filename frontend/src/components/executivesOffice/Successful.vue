<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>Success!!</h1>
    </template>
    <template v-else>
<h1>Success!!</h1>
<p>You successfully logged into the computer!</p>
    </template>
  </div>
</template>

<style scoped>


</style>