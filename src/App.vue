<template>
    <div @click="musicStart">
        <div style="height: 5vh;" id="navbar" v-if="!gameloopInterval" class="d-flex justify-content-center">
            <span class="link " :class="view == 'game' ? 'active' : 'notActive'" @click="view = 'game'">game</span>
            <span class="mx-1">|</span>
            <span class="link " :class="view == 'skillTrees' ? 'active' : 'notActive'" @click="view = 'skillTrees'">skill
                trees</span>
            <span class="mx-1">|</span>
            <span class="link " :class="view == 'spacePort' ? 'active' : 'notActive'" @click="view = 'spacePort'">space
                Port</span>
        </div>
        <div style="height: 95vh; width: 100vw;">
            <Game v-if="view == 'game'"></Game>
            <SkillTrees v-if="view == 'skillTrees'"></SkillTrees>
            <SpacePort v-if="view == 'spacePort'"></SpacePort>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Game from './views/Game.vue';
import SkillTrees from './views/SkillTrees.vue';
import SpacePort from './views/SpacePort.vue';
import { gameloopInterval } from './ts/game';
import * as music from '../src/ts/generel/music';

const view = ref("game")

function musicStart() {
    music.start()
}
</script>
<style scoped>
.link {
    cursor: pointer;
    height: min-content;
}

.active {
    color: var(--bs-success);
    text-decoration: underline;
}

.notActive {
    color: var(--bs-primary)
}
</style>
