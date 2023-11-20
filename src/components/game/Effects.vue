<template>
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
</template>
<script setup lang='ts'>
import { secondsToTicks } from '@/ts/generel/helpers';
import { details as detailsItem } from "@/ts/items";
import { player} from "@/ts/player"
</script>
<style scoped>
</style>