import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {title: "Overtime"}
    },
    {
      path: "/game-intro",
      name: "game-intro",
      component: () => import("@/views/GameIntro.vue"),
      meta: {title: "Game Intro"}
    },
  ],
})

export default router
