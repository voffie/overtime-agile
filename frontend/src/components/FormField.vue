<script setup>
import { computed } from 'vue'

const props = defineProps({
  labelFor: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
  iconAlt: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
  warningMessage: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:model-value'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value),
})
</script>

<template>
  <div class="form-field">
    <label class="form-label" :for="labelFor"><img :src="iconSrc" :alt="iconAlt" /></label>
    <input
      v-model="model"
      class="form-input"
      :type="inputType"
      :id="labelFor"
      :name="name"
      :placeholder="placeholder"
      :required="required"
    />
  </div>
  <p class="warning-message" v-show="warningMessage">
    <code>{{ warningMessage }}</code>
  </p>
</template>

<style scoped>
.form-field {
  display: flex;
  background: #aba3ab;
  border-radius: 1rem;
  margin: 1rem;
  flex-direction: row;
}

.form-label {
  margin-left: 1rem;
  padding: 0.4rem;
}

.form-input {
  background: #aba3ab;
  border-radius: 1rem;
  width: 75%;
  border: none;
  outline: none;
  caret-color: #000000;
  font-weight: bolder;
}

.warning-message {
  text-align: center;
  font-size: large;
  text-wrap: balance;
  color: var(--warning);
  margin: 0.4rem auto;
  width: 80%;
}
</style>
