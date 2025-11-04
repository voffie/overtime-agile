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
    That's it, this company is evil. You can't work here anymore. The next morning you send a text to your boss saying that you quit and wont come back.
    You don't even care about your personalised coffee mug with your name on it, they can have it. 
</p>
<p>
    30 minutes later you get a text message back from the boss. "We are sorry you're not happy with the company and the way our product works. We expect 
    discretion about the matter or there will be legal and personal consequences." What do they mean, do they know that you know about Guini? You remember there
    were a Guini in every room you entered yesterday. They've seen everything.
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