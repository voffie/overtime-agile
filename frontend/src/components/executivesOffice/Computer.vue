<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>Try to sign in</h1>
      <input type="text" placeholder="Password" />
    </template>
    <template v-else>
      <p>Computer picture</p>
    </template>
  </div>
</template>