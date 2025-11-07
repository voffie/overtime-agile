<script setup>
import "@/assets/css/office-styles.css"
import { useRouter } from 'vue-router'

const router = useRouter()

async function endGame() {
  const gameId = localStorage.getItem("currentGameId")

  try {
    const response = await fetch(`http://localhost:3000/api/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        is_completed: true,
        ending_choice: 'press'
      })
    })

    if (!response.ok) {
      throw new Error("Failed to update game status")
    }
  } catch (error) {
    console.error("Error updating game status:", error)
    return
  }

  router.push('/credits')
}

</script>

<template>
  <div class="ending-text">
    <h1>You go to the press</h1>
    <p>
      After getting out of the building, you immediately call your journalist friend who works for the big newspaper.
      You arrange an interview the morning after.
    </p>
    <p>
      The next morning comes and you leave for the newspaper office. When you've entered the building, two guards come
      toward you. You get nervous. "You're coming with us," they both say in chorus.
    </p>
    <p>
      You are led into a meeting room where two people sit across the table from you — your journalist friend and the CEO
      of Heartcore. Fuck...
    </p>
    <button id="end-button" @click="endGame">End game</button>
  </div>
</template>

<style scoped>
.ending-text {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  font-size: 20px;
  line-height: 1.6;
  text-align: center;
}

.ending-text h1 {
  margin-bottom: 20px;
  font-size: 38px;
}

.ending-text p {
  margin-bottom: 16px;
}

#end-button {
  margin-top: 10px;
  cursor: pointer;
  color: var(--button-text);
  background-color: #e69138;
  border-radius: 10px;
  font-weight: bold;
  padding: 15px 30px;
  border: none;
  font-size: 20px;
}
</style>
