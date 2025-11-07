import { createRouter, createWebHistory } from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { title: '', requiredAuth: false },
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
      meta: { title: '', requiredAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { title: 'Overtime', requiredAuth: true }
    },
    {
      path: '/room/design',
      name: 'room-design',
      component: () => import('@/views/DesignRoomView.vue'),
      meta: { title: 'Design Room', requiredAuth: true },
    },
    {
      path: '/credits',
      name: 'credits',
      component: () => import('@/views/CreditsView.vue'),
      meta: { title: 'Credits', requiredAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiredAuth) {
    return true;
  }

  const token = localStorage.getItem('token')

  if (!token) {
    return { name: "login" };
  }

  try {
    const decodedToken = jwtDecode(token)
    const now = Date.now() / 1000

    if (decodedToken.exp && decodedToken.exp < now) {
      localStorage.removeItem("token");
      return { name: "login" };
    }

    const res = await fetch(`${API_BASE_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (res.ok && data?.status) {
      const gameId = localStorage.getItem("currentGameId");

      if (!gameId && to.path.includes("/room")) {
        return { name: "home" };
      }

      if (gameId && to.path.includes("/room")) {
        try {
          const gameResponse = await fetch(
            `${API_BASE_URL}/api/games/${gameId}`,
          );

          if (!gameResponse.ok) {
            console.error("Failed to fetch game");
            return { name: "home" };
          }

          const game = await gameResponse.json();

          const targetRoom = to.path.split("/").pop();

          if (game.game.current_room === targetRoom) {
            return true;
          } else {
            console.warn(
              `Access denied: current room is ${game.game.current_room}, attempted ${targetRoom}`,
            );
            return { path: `/room/${game.game.current_room}` }; // sends user back to the url they navigated from
          }
        } catch (error) {
          console.error("Error checking room access:", error);
          return { name: "home" };
        }
      }

      return true;
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    localStorage.removeItem("token");
    return { name: "login" };
  }

})

export default router
