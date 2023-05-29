<template>
    <div class="object"
        :class="[typeof object.img == 'string' ? object.img : imgs[object.img], savedPlayer.settings.showHitBoxes ? 'showHitbox' : '']"
        :style="{
            width: object.size + 'px',
            height: object.size + 'px',
            left: object.cords.x + 'px',
            top: object.cords.y + 'px',
            borderColor: borderColor,
            transform: `rotate(${object.direction}deg)`,
        }"></div>
</template>
<script setup lang="ts">
import { savedPlayer } from '@/ts/player';
import { imgs } from '../ts/spaceShip';
import { GameObject } from '../types';

const props = withDefaults(
    defineProps<{
        object: GameObject
        borderColor: string
    }>(), {
}
);
</script>
<style scoped>
.object {
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
}

.showHitbox {
    border-radius: 50%;
    border: 1px solid;
}
</style>