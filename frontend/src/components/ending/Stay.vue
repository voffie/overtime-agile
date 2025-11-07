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
        ending_choice: 'stay'
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
    <h1>You stay at Heartcore</h1>
<p>
The next morning comes and you get ready for a new day at Heartcore. You arrive at the office 5 minutes and put your lunchbox in the break room fridge.
Same as always, a canned soup. You walk to your desk and start the computer. A new mail had arrived overnight, must be after you left. From an anonymous sender.</p>

<p>It's 5 files, 4 videos and a text file. You look through them, it's videos of you in every room you've entered yesterday. You open the text file. It's just one line: "We are watching you."</p>
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
