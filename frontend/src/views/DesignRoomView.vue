<script setup>
import { ref, computed } from "vue"

import Button from '@/components/Button.vue'
import PuzzleContainer from '@/components/PuzzleContainer.vue'
import Storyblock from '@/components/designroom/Storyblock.vue'
import OverlayButton from "@/components/designroom/OverlayButton.vue"
import DesignRoomPuzzle from "@/components/designroom/DesignRoomPuzzle.vue"
import { storyMap } from "@/components/designroom/data/designroomData"

const showButton = ref(false);
const title = ref("Follow the Rabbit Down the Hole");

const isStoryCompleted = (title) => {
  return title === "Start Puzzle"

}
const previousStory = ref(storyMap[title.value])
const currentStory = computed(() => {
  const story = storyMap[title.value]
  if (story) {
    previousStory.value = story
    return story
  }
  return previousStory.value

})

const overlayData = computed(() => currentStory.value?.overlay || null)
const allStories = computed(() => {
  const stories = []
  Object.keys(storyMap).forEach(key => {
    stories.push(key)
  })
  return stories
});

function nextPage() {
  const index = allStories.value.indexOf(title.value)
  const indexNew = (index + 1) % allStories.value.length
  title.value = allStories.value[indexNew]



}

function previousPage() {
  const index = allStories.value.indexOf(title.value)
  const indexNew = Math.abs((index - 1 + allStories.value.length)) % allStories.value.length
  title.value = allStories.value[indexNew]
}

</script>

<template>

  <section :class="{ 'show-to-puzzle': showButton, 'hide-to-puzzle': !showButton }">
    <PuzzleContainer nextRoute="/room/server">
      <!-- Desktop -->
      <template #puzzleIntro>

        <Storyblock v-if="currentStory" v-model:show-button="showButton" v-model:title="title"
          :start-story="currentStory.startStory" :end-story="currentStory.endStory"
          :story-is-read="isStoryCompleted(title)" :connects-to="currentStory.connectsTo"
          :cta-button-text="currentStory.ctaButtonText" :has-overlay-slot="currentStory.hasOverlaySlot">

          <template v-if="overlayData" #overlay="{ onEntered }">
            <OverlayButton :img="overlayData.imgPath" :img-alt-text="overlayData.imgAlt" :title="overlayData.title"
              :button-title="overlayData.buttonTitle" :sound="overlayData.soundPath" @entered="onEntered" />
          </template>
        </Storyblock>

        <section class="navigation-container" v-if="showButton">
          <Button class="navigation-button" text="Previous" @click="previousPage" />
          <Button class="navigation-button" text="Next" @click="nextPage" />
        </section>


      </template>


      <template #puzzleImpl="{ completed }" v-if="showButton">
        <DesignRoomPuzzle :solve="completed" />
        <!-- <Button text="Parent Button" @click="completed()" /> -->
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

.navigation-container {
  display: flex;
  justify-content: space-between;

}


.navigation-button {
  min-width: 2rem;
  min-height: 2rem;
  padding: 0.75 auto;
  font-weight: bold;
  margin: 0.5rem 0;

}
</style>
