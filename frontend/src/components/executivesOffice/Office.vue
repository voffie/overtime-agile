<template>
  <div class="office-img-crop">
    <img class="office-img" src="@/assets/img/execOffice/office.png" alt="Office" />
  </div>
</template>

<style scoped>
.office-img-crop {
  height: 700px;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.office-img {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  object-fit: cover;
  object-position: center;
}
</style>
