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
      <h1>You look closer to Guini</h1>
      <p>This must be an older version of the guini doll. It looks like it's been through a lot.</p>
        <br></br> 
      <p>Wait a minute... there is a lamp blinking in the eye! Is it recording? How long have I been watched? 
        I must get out of here before someone catches me sneaking around!</p>
      
      <button class="button" @click="emit('back')">
        Go back to the office
      </button>

    </template>
    <template v-else>
      <img class="guini-img img" src="@/assets/img/execOffice/guini_office_animation.gif" alt="Guini-GIF" />
    </template>
  </div>
</template>