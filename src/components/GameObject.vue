<template>
    <div class="object" :class="object.img" :style="{
        width: object.size + 'px',
        height: object.size + 'px',
        left: object.cords.x + 'px',
        top: object.cords.y + 'px',
        transform: `rotate(${object.direction}deg)`,


    }"></div>
</template>
<script setup lang="ts">
import { GameObject } from '../types';

const props = withDefaults(
    defineProps<{
        object: GameObject
    }>(), {}
);


</script>
<style scoped>
.object {
    position: absolute;
    background-size: contain;
    background-repeat: no-repeat;
}

.player {
    background-image: url("/public/img/player/player.png");
}

.normal {
    background-image: url("/public/img/enemies/normal.png");
}

.slow {
    background-image: url("/public/img/items/slow.png");
}

.speed {
    background-image: url("/public/img/items/speed.png");
}

.stun {
    background-image: url("/public/img/items/stun.png");
}

.heal {
    background-image: url("/public/img/items/heal.png");
}</style>