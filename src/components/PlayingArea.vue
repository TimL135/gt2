<template>
    <div class="playingArea" :class="gameloopInterval ? 'inGame' : ''">
        <GameObject v-for="enemie of enemies" :object="enemie"></GameObject>
        <GameObject v-for="plasma of plasmas" :object="plasma"></GameObject>
        <GameObject v-for="item of items" :object="item"></GameObject>
        <GameObject :object="player"></GameObject>
        <GameMenu v-if="!gameloopInterval"></GameMenu>
    </div>
</template>
<script setup lang="ts">
import GameObject from "./GameObject.vue";
import GameMenu from "./GameMenu.vue";
import { plasmas } from "../ts/plasma";
import { player } from "../ts/player";
import { enemies } from "../ts/enemies"
import { items } from "../ts/items";
import { gameloopInterval } from "../ts/game";
</script>
<style scoped>
.playingArea {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    background-image: url("/public/img/background/background.png");
    background-size: cover;
}

.inGame {
    cursor: none;
}
</style>