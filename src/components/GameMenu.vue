<template>
    <div class="d-flex flex-column justify-content-center align-items-center  h-100 w-100" style="position: absolute;">
        <button class="btn btn-primary" @click="startGame">START</button>
        <div class="mt-2">
            <div class="text-white bg-secondary px-2">
                {{ currencyInfo }}
            </div>
            <div v-for="pointsInfo of newPointsInfo" class="text-white bg-secondary px-2">
                {{ pointsInfo }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { start as startGame, currencyInfo } from '../ts/game';
import { newPointsInfo } from '../ts/skills';
</script>
<style scoped></style>