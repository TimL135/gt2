<template>
    <div class="object" :style="{
        width: object.size + 'px',
        height: object.size + 'px',
        left: object.cords.x + 'px',
        top: object.cords.y + 'px',
        transform: `rotate(${object.direction}deg)`,
        backgroundImage: `url(${object.img})`

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
</style>