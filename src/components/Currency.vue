<template>
    <div class="mb-2" :title="getCurrencyInfo">
        scrap: {{ savedPlayer.currency || 0 }}
    </div>
</template>
<script setup lang='ts'>
import { getCurrencyInfo } from '../ts/generel/config';
import { savedPlayer } from '../ts/player';
</script>
<style scoped></style>