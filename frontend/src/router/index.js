import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Overtime' },
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/game-intro',
      name: 'game-intro',
      component: () => import('@/views/GameIntro.vue'),
      meta: { title: 'Game Intro' },
    },
    {
      path: '/room/template',
      name: 'template-room',
      component: () => import('@/views/TemplateRoom.vue'),
      meta: { title: 'Template Room' },
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
      meta: { title: "Server Room" }
    },
    {
      path: '/room/archive',
      name: 'archive',
      component: () => import('@/views/ArchiveRoom.vue'),
      meta: { title: 'Archive Room' }
    },
    {
      path: "/room/break",
      name: "room-break",
      component: () => import("@/views/BreakRoomView.vue"),
      meta: { title: "Room 1 - Break Room" }
    }
  ],
})

export default router
