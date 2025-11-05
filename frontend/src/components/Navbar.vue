<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import Button from '@/components/Button.vue'

const route = useRoute()
const title = computed(() => route.meta.title || '')
</script>

<template>
  <nav v-if="route.meta.title">
    <p>{{ title }}</p>
    <RouterLink to="/home">
      <Button text="Home" />
    </RouterLink>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px dotted var(--border);
}
</style>
