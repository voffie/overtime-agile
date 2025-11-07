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
        ending_choice: 'quit'
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
    <h1>You quit your job at HeartCore</h1>
    <p>
      That's it, this company is evil. You can't work here anymore. The next morning you send a text to your boss saying
      that you quit and wont come back.
      You don't even care about your personalised coffee mug with your name on it, they can have it.
    </p>
    <p>
      30 minutes later you get a text message back from the boss. "We are sorry you're not happy with the company and
      the way our product works. We expect
      discretion about the matter or there will be legal and personal consequences." What do they mean, do they know
      that you know about Guini? You remember there
      were a Guini in every room you entered yesterday. They've seen everything.
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
