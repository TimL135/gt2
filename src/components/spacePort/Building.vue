<template>
    <Currency></Currency>
    <button v-for="building of Object.entries(detailsBuilding) as [Id, typeof detailsBuilding[0]][]"
        class="btn btn-primary mb-1 me-1" @click="buy(building[0])" :title="building[1].description">
        <p>{{ building[1].name }}</p>
        <p> {{ savedPlayer.buildings[+building[0]] || 0 }}/{{ getMaxLvl(building[0]) }}</p>
        <p class="m-0">cost: {{ getCost(building[0]) }}</p>
    </button>
</template>
<script setup lang='ts'>
import { details as detailsBuilding } from '../../ts/building';
import { cost } from '../../ts/generel/config';
import { savedPlayer } from '../../ts/player';
import Currency from '../Currency.vue';
import { getMultiplier } from '../../ts/multiplier';
import { scoreLvl } from '../../ts/score';
type Id = `${keyof typeof detailsBuilding.value}`
function getCost(id: Id) {
    return Math.round(cost.buildings * ((savedPlayer.value.buildings[id] || 0) + 1) * getMultiplier("discount"))
}
function getMaxLvl(id: Id) {
    let increase = scoreLvl.value
    if (increase > 15) increase = 15
    return detailsBuilding.value[id].maxLvl + increase
}
function buy(id: Id) {
    const cost = getCost(id)
    if (savedPlayer.value.currency >= cost && (savedPlayer.value.buildings[id] || 0) < getMaxLvl(id)) {
        savedPlayer.value.currency -= cost
        savedPlayer.value.buildings[id] = (savedPlayer.value.buildings[id] || 0) + 1
    }
}
</script>
<style scoped></style>