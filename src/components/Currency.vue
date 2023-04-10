<template>
    <div class="mb-2">
        scrap: {{ savedPlayer.currency || 0 }}
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../ts/player';
</script>
<style scoped>
</style>