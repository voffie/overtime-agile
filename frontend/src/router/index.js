import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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
      meta: { title: 'Executives Office', requiredAuth: true },
    },
    {
      path: '/room/server',
      name: 'server-room',
      component: () => import('@/views/ServerRoom.vue'),
      meta: { title: 'Server Room', requiredAuth: true },
    },
    {
      path: '/room/archive',
      name: 'archive',
      component: () => import('@/views/ArchiveRoom.vue'),
      meta: { title: 'Archive Room', requiredAuth: true },
    },
    {
      path: '/room/break',
      name: 'room-break',
      component: () => import('@/views/BreakRoomView.vue'),
      meta: { title: 'Break Room', requiredAuth: true },
    },
    {
      path: '/room/ending',
      name: 'room-ending',
      component: () => import('@/views/Ending.vue'),
      meta: { title: 'End-room', requiredAuth: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: ' ', requiredAuth: true }
    }
  ]
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

    const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (res.ok && data?.status) {
      const gameId = localStorage.getItem("currentGameId");

      if (!gameId && to.path.includes("/room")) {
        return next({ name: "home" });
      }

      if (gameId && to.path.includes("/room")) {
        const gameResponse = await fetch(`${API_BASE_URL}/api/games/${gameId}`);
        const game = await gameResponse.json();

        if (game.current_room === to.path) {
          return next();
        } else {
          return false; // sends user back to the url they navigated from
        }
      }

      return next();
    }
  } catch (err) {
    console.error('Token verification failed:', err)
    localStorage.removeItem('token')
    return next({ name: 'login' })
  }

})

export default router
