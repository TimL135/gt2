<template>
    <div>
        {{ scoreLvl }}
        <div class="d-flex align-items-center mb-2 flex-column">
            <div class="progress w-50 mb-1">
                <div class="progress-bar bg-info" style="--bs-progress-bar-transition: width 0.0s ease;"
                    :style="{ width: (savedPlayer.score.highScore / ((scoreLvl + 1) * honorNeed)) * 100 + '%' }">
                </div>
            </div>
            <div class="w-50">
                the honor level increases the maximum level of your buildings and reduces the prices in the shop
            </div>
        </div>

    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../../ts/player';
import { scoreLvl } from '../../ts/score';
import { honorNeed } from '../../ts/generel/config';
</script>
<style scoped></style>