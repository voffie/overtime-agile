<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the letter</h1>
      <p>There's several interesting topics in this letter...</p>
    </template>
    <template v-else>
  <div class="letter-img-crop">
    <img class="letter-img" src="@/assets/img/execOffice/letter.png" alt="letter" />
  </div>
    </template>
  </div>
</template>


<style scoped>
.letter-img-crop {
  height: 700px;
  overflow: hidden;
  width: 83%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.letter-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: cover;
  object-position: center;
}

</style>