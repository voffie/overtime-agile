<script setup>
import { ref } from "vue"
import Button from "@/components/Button.vue"

const props = defineProps(["solve"])

const konamiCode = ["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"]
const currentSequence = ref([])
const errorMessage = ref("")

function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, i) => val === b[i])
}

function addKey(key) {
  errorMessage.value = ""
  currentSequence.value.push(key)

  if (currentSequence.value.length !== konamiCode.length) return;

  if (arraysEqual(currentSequence.value, konamiCode)) {
    props.solve()
  } else {
    errorMessage.value = "> Incorrect sequence"
    currentSequence.value = []
  }
}
</script>

<template>
  <section class="terminal cursor">
    <pre><code><strong>Enter Sequence:</strong> {{ currentSequence.join(", ") }}</code></pre>
    <p v-if="errorMessage" class="message"><strong>{{ errorMessage }}</strong></p>
  </section>
  <section class="input-wrapper">
    <Button text="←" @click="addKey('←')" />
    <Button text="↑" @click="addKey('↑')"/>
    <Button text="→" @click="addKey('→')" />
    <Button text="↓" @click="addKey('↓')" />
    <Button text="A" @click="addKey('A')" />
    <Button text="B" @click="addKey('B')"/>
  </section>
</template>

<style scoped>
.terminal {
  background-color: var(--background);
  border-radius: 6px;
  border: 1px solid var(--text);
  padding: 1rem;
}

.message {
  margin-top: 0.5rem;
  color: #ff3333;
}

@keyframes blink {
  50% { opacity: 0; }
}

.cursor code::after {
  content: '█';
  animation: blink 1s steps(1) infinite;
}
</style>
