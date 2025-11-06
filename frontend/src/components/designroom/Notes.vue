<script setup>
import { ref } from "vue"
import Button from "../Button.vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  noteData: {
    type: Object,
    required: true,

  }
})

const selectedNote = ref(null)

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close")
}

function isSelectedNote(key) {
  selectedNote.value = props.noteData[key]
}

function closeSelectedNote() {
  selectedNote.value = null

}

</script>

<template>

  <section v-if="showModal" class="puzzle-modal">
    <p v-if="!selectedNote">Click to get better view of note</p>
    <div class="modal-gallery" v-if="!selectedNote">
      <template v-for="(note, key) in props.noteData" :key="note.id">
        <figure @click="isSelectedNote(key)" class="modal-figure" v-if="note.available">
          <img class="modal-img" :src="note.imgPath" :alt="note.imgAltText">
          <figcaption class="modal-caption" v-if="note.available">{{ key }}</figcaption>
        </figure>
      </template>
    </div>
    <div v-else class="modal-card">
      <figure class="modal-figure">
        <img class="modal-img" :src="selectedNote.imgPath" :alt="selectedNote.imgAltText">
      </figure>
      <Button class="notes-button" text="Close to Gallery" @click="closeSelectedNote"></Button>
    </div>

    <Button class="notes-button" text="Close Notes" @click="closeModal"></Button>
  </section>



</template>

<style scoped>
.puzzle-modal {
  overflow: auto;
  position: absolute;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
  flex-direction: column;

}

.modal-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  justify-items: center;
  align-items: center;
  max-width: 80%;
  overflow: auto;
}

.modal-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  justify-items: center;
  align-items: center;
  max-width: 80%;
  overflow: auto;
  margin: 1rem;
}

.modal-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 6px 18px 28px -2px #f9f9f9;
  background: rgba(255, 255, 255, 0.8);
}

.modal-img {
  max-width: 100%;
  height: auto;
  object-fit: cover;

}

.modal-caption {
  text-align: center;
  font-size: medium;
  font-weight: bolder;
  background-color: var(--container-bg);
  padding: 0.3rem;
  align-self: center;
  margin: 0.5rem auto;
  display: inline-block;
  text-wrap: balance;
  width: 100%;
  font-family: "Syne Mono", monospace;
}
</style>
