<script setup>
import "@/assets/css/office-styles.css"
const props = defineProps({
  intro: Boolean
})

const emit = defineEmits(["back"])

</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the trophy</h1>
      <p>It says he's the winner of some manager award. 
        The price tag is still there. 30$ at Wallmart. 
        Did he buy this trophy himself? Pathetic.</p>
              <br>

    <button class="button" @click="emit('back')">
        Go back to the office
    </button>
    </template>
    <template v-else>
      <div class="trophy-img-crop">
        <img class="trophy-img img" src="@/assets/img/execOffice/trophy.png" alt="trophy" />
      </div>
    </template>
  </div>
</template>
