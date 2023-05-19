<template>
    <div v-for="point of points" style="position: absolute;" :style="{
        left: point.cords.x + 'px',
        top: point.cords.y + 'px',
        fontSize: (point.lifeDuration * 3 * generalSize) / secondsToTicks(1) + 'rem',
    }" :class="point.type">
        {{ point.amount }}
    </div>
</template>
<script setup lang='ts'>
import { Point } from '../types';
import { secondsToTicks } from '../ts/generel/helpers';
import { generalSize } from '../ts/generel/config';

const props = withDefaults(
    defineProps<{
        points: Point[]
    }>(), {}
);
</script>
<style scoped>
.damagePlayer {
    color: red;
}

.healPlayer {
    color: green;
}

.damageEnemie {
    color: orange;
}
</style>