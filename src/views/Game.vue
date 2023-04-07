<template>
    <div style="height: 5vh;" v-if="gameloopInterval" class="py-xl-2 ">
        <div class="row g-0 ">
            <div class="col-2"></div>
            <div class="progress col-8">
                <div class="progress-bar bg-success" :style="{ width: (player.hp / player.hpMax) * 100 + '%' }">
                </div>
            </div>
        </div>
        <div class="row g-0 mt-xl-2 mt-1">
            <div class="col-2"></div>
            <div class="progress col-8">
                <div class="progress-bar bg-info" :class="isCharging ? 'bg-danger' : 'bg-info'"
                    :style="{ width: (player.energy / player.energyMax) * 100 + '%' }"></div>
            </div>
        </div>
    </div>
    <div class="game row g-0">
        <div class="col" style="height: 90vh;">
        </div>
        <div class="col-8">
            <PlayingArea></PlayingArea>
        </div>
        <div class="col">
            <div class="mx-2">
                <div class="text-center">
                    shot cooldown
                </div>
                <div class="progress">
                    <div class="progress-bar " style="--bs-progress-bar-transition: width 0.0s ease;"
                        :class="(player.cooldowns['shot'] || 0) == 0 && !isCharging ? 'bg-success' : 'bg-danger'"
                        :style="{ width: ((player.cooldownsMax['shot'] - (player.cooldowns['shot'] || 0)) / player.cooldownsMax['shot']) * 100 + '%' }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PlayingArea from '../components/PlayingArea.vue';
import { player, isCharging } from "../ts/player"
import { gameloopInterval } from "../ts/game"
</script>
<style scoped>
.game {
    height: 100%;
    width: 100%;
}
</style>