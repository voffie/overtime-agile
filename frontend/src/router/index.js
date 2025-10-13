import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: "/game-intro",
      name: "game-intro",
      component: () => import("@/views/GameIntro.vue")
    },
  ],
})

export default router
