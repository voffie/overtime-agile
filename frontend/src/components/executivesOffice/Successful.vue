<script setup>
import { useRouter } from 'vue-router'
import "@/assets/css/office-styles.css"

const router = useRouter()

function leaveOffice() {
  router.push('/room/ending')
}
</script>

<template>
  <div>
    <h1>Success!!</h1>
    <p>You successfully logged into the computer!</p>
    <br>
    <button class="button" @click="leaveOffice">Leave the office</button>
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