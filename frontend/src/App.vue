<script setup>
import { RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
header {
  height: 80px;
}

main {
  /* Calculates remaining height based on Header (80px) for mobile */
  height: calc(100vh - 80px);
  overflow-y: scroll;
}

footer {
  display: none;
}

@media screen and (min-width: 768px) {
  footer {
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    border-top: 1px dotted var(--border);
  }

  main {
    /* Calculates remaining height based on Header (80px) and Footer (50px) for desktop */
    height: calc(100vh - 80px - 50px);
  }
}

</style>
