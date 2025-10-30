<script setup>
import PuzzleContainer from "@/components/PuzzleContainer.vue"
import ServerPuzzle from "@/components/puzzle/Server.vue"
</script>

<template>
  <PuzzleContainer nextRoute="/room/office">
    <!-- Desktop -->
    <template #puzzleIntro>
      <section id="intro-wrapper">
        <p> You enter the server room and are greeted by rows of humming server racks. You walk to
          the far end of the room and find a workstation that has the cable you were looking for</p>

        <p>You log in, connect the prototype's drive. <strong>Total size: 40 GB</strong> Inside:
          hundreds of text files, each named <strong>[name]-[date]</strong></p>

        <p> You open it.</p>

        <div class="terminal">
          <section class="terminal-text">
            <code class="information">> [INFO] Sequence required.</code>
            <code class="information">> [INFO] Length: 10</code>
          </section>
        </div>

        <p>Then you notice the keyboard - old, scarred. The arrow keys gleam from use; <kbd>B</kbd>
          and <kbd>A</kbd> are almost erased. A small sticker on the side reads Konami Systems, 2003.</p>
      </section>
    </template>
    <template #puzzleImpl="{completed}">
      <div class="fill">
        <ServerPuzzle :solve="completed" />
      </div>
    </template>
    <template #puzzleOutro>
      <section id="outro-wrapper">
        <div class="terminal">
          <section class="terminal-text">
            <code class="success">> [SUCCESS] Sequence accepted.</code>
            <code class="information">> [INFO] Decryption in progress…</code>
            <code class="decrypt">> [INFO] Decrypting...</code>
            <code class="success">> [SUCCESS] Decryption complete.</code>
          </section>
        </div>


        <p>The computer whirs to life, and lines of encrypted data begin to unravel before your eyes.
          You open one of the files — and freeze.
        </p>


        <p>You didn’t want to believe it when you first found the prototype in the break room, but now there’s no denying it.
          What you’re seeing confirms your worst fears.
        </p>


        <p>If you’re going to get any real answers, there’s only one place left to go — the executive
          office.
        </p>
      </section>
    </template>
  </PuzzleContainer>
</template>

<style scoped>
#intro-wrapper, #outro-wrapper{
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

.success {
  color: #44FF37;
}

.information {
  color: #FFD037;
}

.terminal-text {
  display: flex;
  flex-direction: column;
  margin: .5rem;
}

.decrypt {
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
