<template>
    <label for="music" class="form-label ">music volume</label>
    <input type="range" class="form-range" id="music" v-model="savedPlayer.settings.musicVolume">

    <label for="sounds" class="form-label ">sounds volume</label>
    <input type="range" class="form-range" id="sounds" v-model="savedPlayer.settings.soundsVolume">
    <div v-if="!touchscreen" v-for=" e of  Object.entries(savedPlayer.settings.keys) as [Type.Key, string][]"
        class="grid mb-1">
        <p>{{ e[0] }}:</p>
        <button class="btn btn-primary" @click="updateKey(e[0])"
            title="press a key on your keyboard and click this button to change">
            {{ e[1] == ' ' ? 'space' : e[1] }}</button>
    </div>
    <div>
        <input class="form-check-input shadow-none" type="checkbox" v-model="savedPlayer.settings.showHitBoxes"
            id="showHitBoxes">
        <label class="form-check-label ms-2" for="showHitBoxes">
            show hitboxes
        </label>
    </div>
    <div class="mb-1 mt-2">recommended for developers only</div>
    <div>
        <input class="form-check-input shadow-none" type="checkbox" v-model="savedPlayer.settings.showMultipliers"
            id="showMultipliers">
        <label class="form-check-label ms-2" for="showMultipliers">
            show multipliers
        </label>
    </div>
</template>
<script setup lang='ts'>
import * as Type from '../types';
import { savedPlayer } from '../ts/player';
import { pressedKeys, touchscreen } from '../ts/game';

function updateKey(key: Type.Key) {
    if (!Object.entries(pressedKeys).find(e => e[1])) return
    savedPlayer.value.settings.keys[key] = Object.entries(pressedKeys).find(e => e[1])?.[0] ?? savedPlayer.value.settings.keys[key]
}
</script>
<style scoped lang="scss">
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>