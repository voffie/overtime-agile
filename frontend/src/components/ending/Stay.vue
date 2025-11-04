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
<p>
The next morning comes and you get ready for a new day at Heartcore. You arrive at the office 5 minutes and put your lunchbox in the break room fridge. 
Same as always, a canned soup. You walk to your desk and start the computer. A new mail had arrived overnight, must be after you left. From an anonymous sender.</p>

<p>It's 5 files, 4 videos and a text file. You look through them, it's videos of you in every room you've entered yesterday. You open the text file. It's just one line: "We are watching you."</p>

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