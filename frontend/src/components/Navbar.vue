<script setup>
import { RouterLink, useRoute} from 'vue-router'
import { computed } from "vue"
import Button from "@/components/Button.vue"

const route = useRoute();
const title = computed(() => route.meta.title || "Overtime")
</script>

<template>
  <nav>
    <p>{{ title }}</p>
    <RouterLink to="/">
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
