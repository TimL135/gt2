<template>
    <label for="customRange1" class="form-label ">music volume</label>
    <input type="range" class="form-range" id="customRange1" v-model="savedPlayer.settings.musicVolume">
    <div v-for=" e of Object.entries(savedPlayer.settings.keys)" class="grid mb-1">
        <p>{{ e[0] }}:</p>
        <button class="btn btn-primary" @click="updateKey(e[0])"
            title="press a key on your keyboard and click this button to change">
            {{ e[1] == ' ' ? 'space' : e[1] }}</button>
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../ts/player';
import { pressedKeys } from '../ts/game';
function updateKey(key: string) {
    if (!Object.entries(pressedKeys).find(e => e[1])) return
    savedPlayer.value.settings.keys[key] = Object.entries(pressedKeys).find(e => e[1])?.[0]
}
</script>
<style scoped lang="scss">
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>