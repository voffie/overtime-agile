<script setup>
import axios from "@/axios"
import { ref, onMounted } from "vue";
import { computed } from "vue";

const username = ref("Loading...");
const games = ref([]);
const formatRoom = (room) => room.charAt(0).toUpperCase() + room.slice(1);

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}min ${s}s`;
}

function formatRoomFont(room) {
  if (!room) return "";
  return room.toUpperCase();
}

const filteredGames = computed(() => {
  return games.value.map(game => {
    const rooms = [
      { name: "Break Room", time: game.time_room_break },
      { name: "Archive Room", time: game.time_room_archive },
      { name: "Design Room", time: game.time_room_design },
      { name: "Server Room", time: game.time_room_server },
      { name: "Office Room", time: game.time_room_office },
    ].filter(r => r.time > 0);

    return {
      id: game.id,
      current_room: game.current_room,
      rooms
    }
  });
});

onMounted(async () => {
  const storedUsername = localStorage.getItem("username");

  if (!storedUsername) {
    username.value = "Unknown user";
    return;
  }

  try {
    // fetch username
    const res = await axios.get(`/api/players/${storedUsername}`);
    username.value = res.data.player.username;

    // fetch top 5 completed games
    const gamesRes = await axios.get(`/api/games/top5/${storedUsername}`);
    games.value = gamesRes.data.games;
  } catch (err) {
    username.value = "Error loading user";
  }
});
</script>

<template>
    <div class="container-profile">

        <div class="container-left">
            <div class="container-user">
                <h1 class="username">{{ username }}</h1>
                <div class="container-user-image">
                    <img class="user-image" src="@/assets/img/overtimeprojectimage2.png" alt="User profile picture">
                </div>
            </div>
        </div>
        
        <div class="container-right">
            <div class="container-games">
                <div class="games-title">You are currently in the <br><strong>{{ formatRoomFont(games[0]?.current_room) }}</strong> room! </div>
                
                <hr class="divider" />

                <div class="games-background">
                    <h2>Solved rooms and times:</h2>
                    <div class="container-games-list">
                        <ul>
                            <template v-for="game in filteredGames" :key="game.id">
                                <li v-for="room in game.rooms" :key="room.name">
                                    {{ room.name }}: {{ formatTime(room.time) }}
                                </li>                                
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-profile {
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    color: #E69138;
}

.container-left,
.container-right {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-user,
.container-games {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
}

.username {
    font-size: 3rem;
}

.container-user-image {
    border: 2px dashed #E69138;
    border-radius: 50%;
    height: 16rem;
    width: 16rem;
    display: flex;
    justify-content: right;
    align-items: first baseline;
    overflow: hidden;
    object-fit: contain;
}

.user-image {
    width: 150%;
}

.games-background {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.games-title {
    font-size: 1.5rem;
}

.container-games-list {
    font-size: 1.2rem;
}

.divider {
  width: 90%;
  margin: 1rem auto;
  border: 0;
  border-top: 2px solid #E69138;
  opacity: 0.7;
}

@media screen and (max-width: 768px) {

    .container-profile {
        flex-direction: column;
    }

    .container-games {
        height: 80%;
        width: 80%;
    }

    .container-user-image {
        height: 8rem;
        width: 8rem;
    }

    .games-background {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0;
        height: 100%;
        width: 100%;
    }

    .games-title {
        font-size: 1.2rem;
        text-align: center;
    }

    .container-games-list {
        font-size: 1rem;
    }
}
</style>