<template>
    <div style="position: absolute;">
        <button @click="startGame">start</button>
    </div>
</template>
<script setup lang="ts">
import { start as startGame } from '../ts/game';
</script>
<style scoped></style>