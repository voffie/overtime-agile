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
      <h1>Letter picture</h1>
      <p>
                Hi James. 

                You missed our daughters 5th birthday. Gina waited for you to come see her yesterday, 
                or at least give her a call. I know you've had a lot at work lately, can you at least 
                tell me what it is you're working on that's more important than your family? 

                I could really use your support right now. I've been hearing voices lately, it sound like its 
                coming from the rabbit toy you gave us. It must be the lack of sleep. I was close to throwing 
                it away the other day, it feels like it's watching me. Why did you even give us this creepy thing?

                Please call Gina, she's really sad right now,
                Your wife
                Date: 06-22-2025
      </p>
    </template>
  </div>
</template>


<style scoped>
</style>