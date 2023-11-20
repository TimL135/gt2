<template>
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
</template>
<script setup lang='ts'>
import { details as detailsAbilitys } from "@/ts/abilitys";
import { details as detailsWeapon } from "@/ts/weapon";
import { player, isCharging, savedPlayer } from "@/ts/player"
import { touchscreen } from '@/ts/game';
import { Key } from '@/types';
</script>
<style scoped>
</style>