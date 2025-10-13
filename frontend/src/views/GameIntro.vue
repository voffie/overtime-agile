<script setup>
import Button from "@/components/Button.vue"
</script>

<template>
  <div class="center">
    <div>
      <img class="main-img" src="@/assets/img/HeartcoreLogo-1.png" alt="Heartcore logo">
    </div>
    <div>
      <div>
        <h2>19:07 - Heartcore HQ, Floor 18</h2>
        <div>
            <p>Another late night.
                The office is quiet—just the low hum of machines and the soft tick of a digital wall clock. Everyone else left hours ago. You're still here, catching up on backlog reports that should’ve been automated weeks ago.
                At Heartcore, they call it "building the future of connection."
                You call <strong>unpaid overtime.</strong> <br><br>
                You're part of the Guini Division—Heartcore’s crown jewel.
                Guini is the smart planner for modern families:
                a friendly, voice-activated assistant that helps parents and kids coordinate their chores,
                homework, groceries, even downtime. Simple. Seamless. Safe.<br><br>
                Your job? Product Integration Analyst.
                Which mostly means making sure Guini “feels human” enough in partner households without raising privacy flags.
                You lean back in your chair, stretching. The office lights above you dim slightly,
                like they’re encouraging you to leave. Your stomach growls in agreement.
                You decide to head to the breakroom to grab something to keep you going…
            </p>
        </div>
        <div>
          <img class="main-img" src="@/assets/img/overtimeprojectimage2.png" alt="picture of Guini">
        </div>
      </div>
    </div>
    <Button text="Continue" />
  </div>
</template>

<style scoped>
.center {
  padding: 40px;
  text-align: justify;
}

.main-img {
  width: 200px;
  height: auto;
  align-self: center;
}

@media screen and (min-width: 768px) {
  .main-img {
    width: 400px;
  }
}
</style>
