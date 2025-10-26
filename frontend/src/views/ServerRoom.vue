<script setup>
import PuzzleContainer from '@/components/PuzzleContainer.vue'
import ServerPuzzle from '@/components/puzzle/Server.vue'
</script>

<template>
  <PuzzleContainer nextRoute="/room/office">
    <!-- Desktop -->
    <template #puzzleIntro>
      <section id="intro-wrapper">
        <p>
          As you enter the server room, you’re greeted by rows of humming server racks — the kind
          you’ve walked past a thousand times without a second thought. But ever since learning the
          dark truth behind the Bunny, you can’t help but wonder what these machines are really
          doing.
        </p>

        <p>
          At the far end of the room, the workstation terminal glows faintly. You sign in using your
          employee ID and start searching for the specific cable you came here for. When you connect
          the hard drive from the Bunny prototype, the system immediately detects it. You check the
          contents — and your stomach drops.
        </p>

        <p>
          <strong>Total size: 40GB.</strong> That can’t be right. The prototype has only been active
          for a few months. There’s no way it could have collected that much data in so little time.
        </p>

        <p>
          You open the main folder. Every file follows the same pattern:
          <strong>[name]-[date in the format year-month/day].txt</strong>, all text files. As you
          scroll through the long list, you recognize a few names — including your own.
        </p>

        <p>
          Your pulse quickens. You double-click one of the files, but instead of video, a prompt
          appears on-screen:
        </p>

        <div class="terminal">
          <pre>
            <code>
              <span class="information">> [INFO] Decryption sequence required.</span>
            </code>
          </pre>
        </div>

        <p>
          You start scanning the workstation for clues. Nothing obvious — until your eyes fall on
          the keyboard. It’s old and dusty, the kind that’s been used far too long. The arrow keys
          are shiny from wear — the Up and Down arrows especially. Left and Right are scuffed too,
          and the letters <kbd>B</kbd> and <kbd>A</kbd> are almost completely faded.
        </p>
      </section>
    </template>
    <template #puzzleImpl="{ completed }">
      <div class="fill">
        <ServerPuzzle :solve="completed" />
      </div>
    </template>
    <template #puzzleOutro>
      <section id="outro-wrapper">
        <div class="terminal">
          <pre>
            <code class="outro-output">
              <span class="success">> [SUCCESS] Sequence accepted.</span>
              <span class="information">> [INFO] Decryption in progress…</span>
              <div class="decrypt-wrapper">
                <span v-for="n in 10" :key="n">> Decrypting... ({{ n }}/10)</span>
              </div>
              <span class="success">> [SUCCESS] Decryption complete.</span>
            </code>
          </pre>
        </div>

        <p>
          The computer whirs to life, and lines of encrypted data begin to unravel before your eyes.
          You open one of the files — and freeze.
        </p>

        <p>
          You didn’t want to believe it when you first found the prototype in the break room, but
          now there’s no denying it. What you’re seeing confirms your worst fears.
        </p>

        <p>
          If you’re going to get any real answers, there’s only one place left to go — the executive
          office.
        </p>
      </section>
    </template>
  </PuzzleContainer>
</template>

<style scoped>
#intro-wrapper,
#outro-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.terminal {
  background-color: var(--background);
  border-radius: 6px;
  border: 1px solid var(--text);
}

kbd {
  background-color: var(--button-bg);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 2px 5px;
  font-size: 0.9em;
  color: var(--button-text);
}

.terminal pre {
  white-space: normal;
  text-indent: 1rem;
}

.success {
  color: #44ff37;
}

.information {
  color: #ffd037;
}

.outro-output {
  display: flex;
  flex-direction: column;
}

.decrypt-wrapper {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}

.fill {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border: 1px solid var(--border);
}

@media screen and (min-width: 768px) {
  .fill {
    height: 100%;
    gap: 0;
  }
}
</style>
