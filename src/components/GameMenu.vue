<template>
    <div class="d-flex flex-column justify-content-center align-items-center  h-100 w-100" style="position: absolute;">
        <button class="btn btn-primary" @click="startGame">START</button>
        <div class="mt-2">
            <div class="text-white bg-secondary px-2" v-for="e of Object.values(info)">
                {{ e }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { start as startGame } from '../ts/game';
import { info } from '../ts/info'
</script>
<style scoped></style>