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
    <section class="controls">
      <section class="arrows">
        <div class="up">
          <Button class="resize" text="↑" @click="addKey('↑')"/>
        </div>
        <div class="middle">
          <Button class="resize" text="←" @click="addKey('←')" />
          <Button class="resize" text="↓" @click="addKey('↓')" />
          <Button class="resize" text="→" @click="addKey('→')" />
        </div>
      </section>

      <aside class="actions">
        <Button class="resize" text="A" @click="addKey('A')" />
        <Button class="resize" text="B" @click="addKey('B')"/>
      </aside>
    </section>
  </section>
</template>

<style scoped>
.terminal {
  background-color: var(--background);
  border-radius: 6px;
  border: 1px solid var(--text);
  padding: 1rem;
  margin: 2rem;
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

.input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  margin: 2rem;
}

.arrows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.up {
  display: flex;
  justify-content: center;
}

.middle {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
}

.controls {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.resize {
  width: 3rem;
  height: 3rem;
}

@media screen and (min-width: 768px) {
  .resize {
    width: 4rem;
    height: 4rem;
  }
}
</style>
