<script setup>
import { ref } from "vue"

import Button from '@/components/Button.vue'
import PuzzleContainer from '@/components/PuzzleContainer.vue'
import TemplateChild from '@/components/template/TemplateChild.vue'
import Storyblock from '@/components/designroom/Storyblock.vue'
import OverlayButton from "@/components/designroom/OverlayButton.vue"
import corridorImg from '@/assets/img/design-room/img/corridor2.png'
import corridorSound from "@/assets/sound/Walking.m4a"


const showButton = ref(false);
const title = ref("Design Room Intro");

const isStoryCompleted = (title) => {
  return title === "Start Puzzle"

}


</script>

<template>

  <section :class="{ 'show-to-puzzle': showButton, 'hide-to-puzzle': !showButton }">
    <PuzzleContainer nextRoute="/room/server">
      <!-- Desktop -->
      <template #puzzleIntro>
        <Storyblock v-if="title === 'Design Room Intro'" v-model:show-button="showButton" v-model:title="title"
          start-story="You pick up the slide, it looks old, worn-out by time given a
        yellowish-white taint. Only one department would have something that would unveil the content of the slide..
        " end-story="The design department, you march on towards it." :story-is-read="isStoryCompleted(title)"
          connects-to="Moving Towards the Dungeon" cta-button-text="Continue towards the Design Room" />

        <Storyblock v-else v-model:show-button="showButton" v-model:title="title" start-story="As you move down the corridor, the office has a sudden change.
The air is thicker, and the lack of natural light is evident.
You have entered the so-called “office-dungeon,” where the design and server rooms live.
        " end-story="Frankly, you never liked this part of the office.
It always gave you the heebie-jeebies, and on top of that, the department managers gave an eerie discomfort ...especially Frank Miller."
          :story-is-read="isStoryCompleted(title)" connects-to="Entering the Dragon’s Nest"
          cta-button-text="Continue down stairs">

          <template #overlay>
            <OverlayButton :img="corridorImg" img-alt-text="A dark corridor that leads to stairs" title="The corridor"
              button-title="See corridor" :sound="corridorSound" />
          </template>
        </Storyblock>


      </template>


      <template #puzzleImpl="{ completed }">
        <TemplateChild :solve="completed" />
        <Button text="Parent Button" @click="completed()" />
      </template>
      <template #puzzleOutro>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla feugiat mollis erat. Nullam
          pellentesque et, tincidunt ac sem. Proin.
        </p>
      </template>
    </PuzzleContainer>

  </section>
</template>


<style scoped>
/* Only affect PuzzleContainer's mobile "To Puzzle" button */
.hide-to-puzzle :deep(.to-puzzle-button-mobile) {
  display: none !important;
}

.show-to-puzzle :deep(.to-puzzle-button-mobile) {
  display: flex !important;
}
</style>
