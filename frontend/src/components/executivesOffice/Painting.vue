<script setup>
import Button from "@/components/Button.vue"
import "@/assets/css/office-styles.css"

const props = defineProps({
  intro: Boolean,
  showBackside: Boolean
})

const emit = defineEmits(["back", "toggleBackside"])
</script>

<template>
  <div style="text-align:center;">
    <div v-if="!props.intro">
      <img
        v-if="!props.showBackside"
        class="painting-img img"
        src="@/assets/img/execOffice/painting.png"
        alt="Painting"
      />
      <img
        v-else
        class="paintingbackside-img img"
        src="@/assets/img/execOffice/painting-backside.png"
        alt="Painting backside"
      />
    </div>

    <div v-if="props.intro" style="margin-top: 20px;">
      <h1>You look closer to the painting</h1>
      <p>
        This must be the CEO's wife. She's so beautiful and elegant. Modest even.
        It looks like there's something sticking out from behind the frame...
      </p>

      <div v-if="props.showBackside">
        <p>
          <br></br>
          Who is this? Another woman with the CEO? What a jerk!
        </p>
      </div>

      <div>
        <Button
          :text="props.showBackside ? 'Show front' : 'Flip the painting'"
          @click="emit('toggleBackside')"
          style="margin: 50px;"/>
        <br></br>
        <Button class="go-back-button button" text="Go back to the office" @click="emit('back')" />
      </div>
    </div>
  </div>
</template>

