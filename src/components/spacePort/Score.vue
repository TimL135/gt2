<template>
    <div>
        highscore: {{ savedPlayer.score.highScore }}
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../../ts/player';
import { scoreLvl } from '../../ts/score';
</script>
<style scoped></style>