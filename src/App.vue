<template>
    <div style="height: 5vh;" id="navbar ">
        <span @click="view = 'game'">game</span>
    </div>
    <div style="height: 95vh; width: 100vw;">
        <Game v-if="view == 'game'"></Game>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Game from './views/Game.vue';
const view = ref("game")
</script>
<style scoped></style>
