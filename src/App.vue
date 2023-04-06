<template>
    <div style="height: 5vh;" id="navbar" v-if="!gameloopInterval" class="d-flex justify-content-center">
        <span class="link " :class="view == 'game' ? 'text-primary text-decoration-underline' : 'text-info'"
            @click="view = 'game'">game</span>
        <span class="mx-1">|</span>
        <span class="link " :class="view == 'skillTrees' ? 'text-primary text-decoration-underline' : 'text-info'"
            @click="view = 'skillTrees'">skill trees</span>
    </div>
    <div style="height: 95vh; width: 100vw;">
        <Game v-if="view == 'game'"></Game>
        <SkillTrees v-if="view == 'skillTrees'"></SkillTrees>

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Game from './views/Game.vue';
import SkillTrees from './views/SkillTrees.vue';
import { gameloopInterval } from './ts/game';
const view = ref("game")
</script>
<style scoped>
.link {
    cursor: pointer;
    text-transform: uppercase;
    height: min-content;
}
</style>
