<script setup>
import "@/assets/css/office-styles.css"
const props = defineProps({
  intro: Boolean
})

import Button from '@/components/Button.vue'
const emit = defineEmits(["back"])
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the letter</h1>
      <p>There's several interesting topics in this letter...</p>
      <br>

      <div class="mobile-picture">
    <img class="letter-img img" src="@/assets/img/execOffice/letter.png" alt="letter" />
      </div>

      <button class="button" @click="emit('back')">
        Go back to the office
      </button>
    </template>
    <template v-else>
  <div class="letter-img-crop">
    <img class="letter-img img" src="@/assets/img/execOffice/letter.png" alt="letter" />
  </div>
    </template>
  </div>
</template>

<style scoped>
.mobile-picture {
  display: none;
}

@media screen and (max-width: 767px) {
.mobile-picture {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
}
</style>
