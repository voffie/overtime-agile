import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { title: 'Overtime', requiredAuth: false },
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/game-intro',
      name: 'game-intro',
      component: () => import('@/views/GameIntro.vue'),
      meta: { title: 'Game Intro', requiredAuth: true },
    },
    {
      path: '/room/template',
      name: 'template-room',
      component: () => import('@/views/TemplateRoom.vue'),
      meta: { title: 'Template Room', requiredAuth: false },
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

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiredAuth) {
    return next()
  }

  const token = localStorage.getItem('token')

  if (!token) {
    return next({ name: 'login' })
  }

  try {
    const decodedToken = jwtDecode(token)
    const now = Date.now() / 1000

    if (decodedToken.exp && decodedToken.exp < now) {
      localStorage.removeItem('token')
      return next({ name: 'login' })
    }
  } catch (error) {
    localStorage.removeItem('token')
    return next({ name: 'login' })
  }
  try {
    const res = await fetch('http://localhost:3000/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (data.status) return next()
  } catch (err) {
    console.error('Token verification failed:', err)
  }

  localStorage.removeItem('token')
  return next({ name: 'login' })
})

export default router
