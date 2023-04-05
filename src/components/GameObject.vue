<template>
    <img class="object" :src="`../../${object.img}`" :style="{
        width: object.size + 'px',
        height: object.size + 'px',
        left: object.cords.x + 'px',
        top: object.cords.y + 'px',
        transform: `rotate(${object.direction}deg)`,
    }" />
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

}
</style>