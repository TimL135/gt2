<template>
    <Currency></Currency>
    <button v-for="building of Object.entries(detailsBuilding)" class="btn btn-primary me-1" @click="buy(+building[0])"
        :title="building[1].description">
        <p>{{ building[1].name }}</p>
        <p class="m-0">cost: {{ getCost(+building[0]) }}</p>
    </button>
</template>
<script setup lang='ts'>
import { details as detailsBuilding } from '../ts/building';
import { buildingCost } from '../ts/config';
import { savedPlayer } from '../ts/player';
import Currency from './Currency.vue';
function getCost(id: number) {
    return buildingCost * ((savedPlayer.value.buildings[id] || 0) + 1)
}
function buy(id: number) {
    const cost = getCost(id)
    if (savedPlayer.value.currency >= cost) {
        savedPlayer.value.currency -= cost
        savedPlayer.value.buildings[id] = (savedPlayer.value.buildings[id] || 0) + 1
    }
}
</script>
<style scoped></style>