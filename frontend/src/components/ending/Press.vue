<script setup>
import "@/assets/css/office-styles.css"
import { useRouter } from 'vue-router'
const router = useRouter()

function quitGame() {
  router.push('/home')
}
</script>

<template>

<div id="ending-text">
    After Getting out of the building you immediately call your journalist friend who works for the big newspaper. You arrange an interview the morning after.
<p>
    After Getting out of the building you immediately call your journalist friend who works for the big newspaper. You arrange an interview the morning after.
</p>
<p>
    The next morning comes and you leave for the newspaper office. When you've entered the building two guards comes towards you. You get nervous.
    "You're comming with us" they both say in chorus.
</p>
<p>
    You are led into a meeting room where two people sit across the table from you. Your journalist friend and the CEO of Heartcore. Fuck...
</p>
<button @click="quitGame">Quit game</button>

</div>
</template>

<style scoped>
button {
  cursor: pointer;
  color: var(--button-text);
  background-color: var(--button-bg);
  border-radius: 10px;
  font-weight: bold;
  padding: 5px 15px;
  border: none;
  margin-bottom: 15px;
}
</style>