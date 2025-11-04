<script setup>

const games = ["10.02", "11.02", "12.02", "13.02", "14.02"]
</script>

<template>
    <div class="container-profile">

        <div class="container-left">
            <div class="container-user">
                <h1 class="username">Username</h1>
                <div class="container-user-image">
                    <img class="user-image" src="@/assets/img/overtimeprojectimage2.png" alt="User profile picture">
                </div>
            </div>
        </div>
        
        <div class="container-right">
            <div class="container-games">
                <div class="games-background">
                    <h3 class="games-title"><u>Top 5 Games</u></h3>
                    <div class="container-games-list">
                        <ol>
                            <li v-for="(game, index) in games" :key="index">
                            {{ game }}
                            </li>
                        </ol>
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
    border: 4px solid #E69138;
    border-radius: 2rem;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.games-title {
    font-size: 2rem;
}

.container-games-list {
    font-size: 1.2rem;
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