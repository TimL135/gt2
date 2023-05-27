<template>
    <Currency></Currency>
    <div class="d-flex align-items-center mb-2 flex-column">
        <div class="w-50">
            <input class="form-check-input shadow-none" type="checkbox" v-model="savedPlayer.settings.showBuildingsDeatils"
                id="showDetails">
            <label class="form-check-label ms-2" for="showDetails">
                show details
            </label>
        </div>
    </div>
    <button v-for="building of Object.entries(detailsBuilding) as [Id, typeof detailsBuilding[0]][]"
        class="btn btn-primary mb-1 me-1" @click="buy(building[0])" :title="getTitle(building[0])">
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
import { percent } from '@/ts/generel/helpers';
percent

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
function getTitle(buildindId: Id) {
    let text = ""
    const building = detailsBuilding.value[buildindId]
    text += building.description
    if (savedPlayer.value.settings.showBuildingsDeatils) {
        const s = building.multiplier.toString().split("computed")[1]
        text += `\ndetails \nmultiplies the effects of the skills in the skilltree by`
        text += `\ncurrent lvl: ${(eval(s.trim().slice(0, -1))()).toFixed(2)}`
        if ((savedPlayer.value.buildings[buildindId] || 0) < getMaxLvl(buildindId))
            text += `\nnext lvl: ${(eval(s.trim().slice(0, -1).replace("0)", "0)+1"))()).toFixed(2)}`
    }
    return text
}
</script>
<style scoped></style>