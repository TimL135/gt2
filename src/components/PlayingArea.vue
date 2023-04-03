<template>
    <div class="playingArea">
        <GameObject v-for="enemie of enemies" :object="enemie"></GameObject>
        <GameObject v-for="plasma of plasmas" :object="plasma"></GameObject>
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
import { gameloopInterval } from "../ts/game";
</script>
<style scoped>
.playingArea {
    overflow: hidden;
    position: relative;
    background-color: blue;
    height: 100%;
    width: 100%;
    background-image: url("/public/img/background/background.png");
}
</style>