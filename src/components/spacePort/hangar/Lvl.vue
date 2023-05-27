<template>
    <div class="text-center">
        {{ savedPlayer.lvl.lvl + 1 }}
    </div>
    <div class="d-flex justify-content-center mb-2">
        <div class="progress w-100">
            <div class="progress-bar bg-info" style="--bs-progress-bar-transition: width 0.0s ease;"
                :style="{ width: (savedPlayer.lvl.xp / ((savedPlayer.lvl.lvl + 1) * xpNeed)) * 100 + '%' }">
            </div>
        </div>
    </div>
    <div v-for="info of lvlInfo">
        {{ info }}
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '@/ts/player';
import { xpNeed, lvlInfo } from '@/ts/generel/config';

</script>
<style scoped></style>