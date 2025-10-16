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
    {
      path: "/room/template",
      name: "template-room",
      component: () => import("@/views/TemplateRoom.vue"),
      meta: {title: "Template Room"}
    },
    {
      path: '/room/office',
      name: 'office',
      component: () => import('@/views/ExecOffice.vue'),
      meta: { title: 'Executives Office' }
    },
    {
      path: "/room/server",
      name: "server-room",
      component: () => import("@/views/ServerRoom.vue"),
      meta: {title: "Server Room"}
    }
  ],
})

export default router
