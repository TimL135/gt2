<template>
    <Touchscreen v-if="touchscreen"></Touchscreen>
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
    <div class="row g-0">
        <div class="col" style="height: 90vh; overflow: hidden;">
            <Cooldowns v-if="touchscreen"/>
            <template v-if="savedPlayer.settings.showMultipliers">
                <div v-for="[key, value] of Object.entries(multiplierValues)">
                {{ key }}: {{ value.toFixed(2) }}
            </div>
            </template>
        </div>
        <div class="col-8">
            <PlayingArea></PlayingArea>
        </div>
        <div class="col" style="height: 90vh;">
            <Cooldowns v-if="!touchscreen"/>
            <Effects />
        </div>
    </div>
    <div style="height: 5vh;" class="pt-2" v-if="gameloopInterval">
        <div class="row g-0 ">
            <div class="col-2"></div>
            <div class="col-1">{{ savedPlayer.world.lvl+1 }}</div>
            <div class="progress col-6">
                <div class="progress-bar bg-info"
                    :style="{ width: (worldPoints / worldPointsNeed) * 100 + '%' }"></div>
            </div>
            <div class="col-1 text-end">{{ savedPlayer.world.lvl+2 }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PlayingArea from '../components/game/PlayingArea.vue';
import { player, isCharging, savedPlayer } from "../ts/player"
import { gameloopInterval } from "../ts/game"
import { buildingMultiplier } from "../ts/building";
import Touchscreen from '../components/game/Touchscreen.vue';
import { touchscreen } from '../ts/game';
import { resetInfo } from '../ts/info';
import { multiplierValues } from '@/ts/multiplier';
import { worldPointsNeed,worldPoints } from '@/ts/worldLvl';
import Effects from '@/components/game/Effects.vue';
import Cooldowns from '@/components/game/Cooldowns.vue';
resetInfo()

buildingMultiplier()
</script>
<style scoped lang="scss">

.progress {
    @media screen and (max-width: 1000px) {
        height: 8px;
    }

}
</style>