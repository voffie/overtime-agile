<template>
  <section class="room-wrapper">
    <section class="puzzle-text">
      <slot name="puzzleText"/>
    </section>
    <section class="puzzle-wrapper">
      <slot name="puzzleImpl"/>
    </section>
  </section>
</template>

<style scoped>
@media screen and (min-width: 768px) {
  .room-wrapper {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    height: 100%;
  }

  .puzzle-text {
    padding: 1.5rem;
    overflow-y: scroll;
    height: 100%;
    text-wrap: balance;
    border-right: 1px dotted var(--border);
  }

  .puzzle-wrapper {
    padding: 1rem;
  }
}
</style>
