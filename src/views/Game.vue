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
    <div class="game row g-0">
        <div class="col" style="height: 90vh; overflow: hidden;">
            <div v-if="savedPlayer.settings.showMultipliers"
                v-for="[key, value] of Object.entries(multiplierValues) as [string, number][]">
                {{ key }}: {{ value.toFixed(2) }}
            </div>
        </div>
        <div class="col-8">
            <PlayingArea></PlayingArea>
        </div>
        <div class="col">
            <div class="text-center">
                cooldowns
            </div>
            <div class="mx-2">
                <div class="text-center">
                    shot
                </div>
                <div class="progress">
                    <div class="progress-bar " style="--bs-progress-bar-transition: width 0.0s ease;"
                        :class="(player.cooldowns['shot'] || 0) == 0 && !isCharging ? 'bg-success' : 'bg-danger'"
                        :style="{ width: ((detailsWeapon[savedPlayer.weapons.selected].cooldown - (player.cooldowns['shot'] || 0)) / detailsWeapon[savedPlayer.weapons.selected].cooldown) * 100 + '%' }">
                    </div>
                </div>
            </div>

            <div v-for="index in savedPlayer.abilitys.selected.length" class="mx-2">
                <div v-if="savedPlayer.abilitys.selected[index - 1] != -1">
                    <div class="text-center" :class="touchscreen ? `ability${index - 1}` : ''">
                        {{ detailsAbilitys[savedPlayer.abilitys.selected[index - 1]].name }}{{
                            !touchscreen ? `(${savedPlayer.settings.keys[`ability${index - 1}` as Key]})` : '' }}
                    </div>
                    <div class="progress">
                        <div class="progress-bar " style="--bs-progress-bar-transition: width 0.0s ease;"
                            :class="(player.cooldowns[index - 1] || 0) == 0 && !isCharging ? 'bg-success' : 'bg-danger'"
                            :style="{ width: ((detailsAbilitys[savedPlayer.abilitys.selected[index - 1]].cooldown - (player.cooldowns[index - 1] || 0)) / detailsAbilitys[savedPlayer.abilitys.selected[index - 1]].cooldown) * 100 + '%' }">
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center mt-2">
                effects
            </div>
            <div v-for="index in Object.values(detailsItem).filter(e => e.name != 'heal').length" class="mx-2">
                <div class="text-center">
                    {{ detailsItem[index - 1].name }}
                </div>
                <div class="progress">
                    <div class="progress-bar bg-success" style="--bs-progress-bar-transition: width 0.0s ease;"
                        :style="{ width: (((player.effects[index - 1] || 0)) / secondsToTicks(2)) * 100 + '%' }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PlayingArea from '../components/PlayingArea.vue';
import { player, isCharging, savedPlayer } from "../ts/player"
import { gameloopInterval } from "../ts/game"
import { details as detailsItem } from "../ts/items";
import { buildingMultiplier } from "../ts/building";
import { secondsToTicks } from '../ts/generel/helpers';
import { details as detailsWeapon } from "../ts/weapon";
import { details as detailsAbilitys } from "../ts/abilitys";
import Touchscreen from '../components/Touchscreen.vue';
import { touchscreen } from '../ts/game';
import { resetInfo } from '../ts/info';
import { multiplierValues } from '@/ts/multiplier';
import { Key, SavedPlayer } from '@/types';
resetInfo()

buildingMultiplier()
</script>
<style scoped lang="scss">
.game {
    height: 100%;
    width: 100%;
}

.progress {
    @media screen and (max-width: 1000px) {
        height: 8px;
    }

}
</style>