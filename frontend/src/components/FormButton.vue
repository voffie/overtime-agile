<script setup>
import Button from '@/components/Button.vue'

const props = defineProps({
  primaryButtonText: {
    type: String,
    default: '',
  },

  primaryButtonType: {
    type: String,
    default: 'submit',
  },

  secondaryButtonText: {
    type: String,
    default: '',
  },
  secondaryButtonClick: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="form-buttons">
    <Button class="form-button" :text="primaryButtonText" :type="primaryButtonType" />
    <div class="secondary-form-container">
      <Button
        type="button"
        class="form-button form-button-secondary"
        :text="secondaryButtonText"
        @click.prevent="secondaryButtonClick"
      />
    </div>
  </div>
</template>

<style scoped>
.form-buttons {
  padding: 0.5rem;
}

.form-button {
  background: #E69138;
  color: white;
  width: 100%;
  margin-bottom: 1rem;
  font-size: larger;
}

.form-button-secondary {
  border: 2px solid #E69138;
  background: transparent;
}

.form-button-secondary {
  font-size: small;
}
</style>
