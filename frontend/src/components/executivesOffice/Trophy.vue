<script setup>
const props = defineProps({
  intro: Boolean
})
</script>

<template>
  <div>
    <template v-if="props.intro">
      <h1>You look closer to the trophy</h1>
      <p>It says he's the winner of some manager award. 
        The price tag is still there. 30$ at Wallmart. 
        Did he buy this trophy himself? Pathetic.</p>
    </template>
    <template v-else>
      <div class="trophy-img-crop">
        <img class="trophy-img" src="@/assets/img/execOffice/trophy.png" alt="trophy" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.trophy-img-crop {
  height: 700px;
  overflow: hidden;
  width: 83%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.trophy-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: cover;
  object-position: center;
}

</style>