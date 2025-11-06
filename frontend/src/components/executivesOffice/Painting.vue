<script setup>
import "@/assets/css/office-styles.css"

const props = defineProps({
  intro: Boolean,
  showBackside: Boolean
})

const emit = defineEmits(["back", "toggle-backside"])
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
          <br>
          Who is this? Another woman with the CEO? What a jerk!
        </p>
      </div>
      <br>

      <div class="mobile-picture">
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

      <div>
        <button
          class="button"
          @click="emit('toggle-backside')">
          {{ props.showBackside ? 'Show front' : 'Flip the painting' }}
        </button>
      <button class="button" @click="emit('back')">
        Go back to the office
      </button>      
    </div>
    </div>
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