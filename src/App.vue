<template>
    <div style="height: 5vh;" id="navbar " v-if="!gameloopInterval">
        <span @click="view = 'game'">game</span>
    </div>
    <div style="height: 95vh; width: 100vw;">
        <Game v-if="view == 'game'"></Game>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Game from './views/Game.vue';
import { gameloopInterval } from './ts/game';
const view = ref("game")
</script>
<style scoped></style>
