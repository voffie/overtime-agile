<script setup>
const props = defineProps(['text'])
</script>

<template>
  <button>{{ props.text }}</button>
</template>

<style scoped>
button {
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding-inline: 10px;
  padding-block: 0;
  color: var(--button-text);
  background-color: var(--button-bg);
  border-radius: 10px;
  font-weight: bold;
}
</style>
