<script setup>


const props = defineProps({
  answer: {
    type: String,
    required: true,
  },
  riddle: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(["riddle-solved"]);
</script>
