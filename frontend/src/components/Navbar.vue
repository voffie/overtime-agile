<script setup>
import { RouterLink, useRoute} from 'vue-router'
import { ref, watch} from "vue"
import Button from "@/components/Button.vue"

const route = useRoute();
const headerText = ref("Overtime")

watch(
  () => route.fullPath, (newPath) => {
    if (newPath === "/") {
      headerText.value = "Overtime"
    } else if (newPath === "/game-intro") {
      headerText.value = "Game Intro"
    }
  }, {immediate: true})
</script>

<template>
  <nav>
    <p>{{ headerText }}</p>
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
