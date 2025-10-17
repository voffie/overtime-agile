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
      <p>Trophy picture</p>
    </template>
  </div>
</template>