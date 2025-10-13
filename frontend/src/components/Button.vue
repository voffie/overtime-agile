<script setup>
const props = defineProps(["text"])
</script>

<template>
  <button>{{ props.text }}</button>
</template>

<style scoped>
button {
  cursor: pointer;
  width: fit-content;
  padding: 10px;
  color: var(--button-text);
  background-color: var(--button-bg);
  border-radius: 10px;
  font-weight: bold;
}
</style>
