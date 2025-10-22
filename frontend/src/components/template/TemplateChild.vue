<script setup>
import Button from '@/components/Button.vue'
const props = defineProps(['solve'])

function custom() {
  props.solve()
}
</script>

<template>
  <Button text="Child Button" @click="props.solve()" />
  <!-- Can also run a separate function rather than directly on click
  <Button text="Child Button" @click="custom" /> -->
</template>
