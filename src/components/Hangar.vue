<template>
    <div class="d-flex justify-content-center px-2">
        <div v-for="spaceShip of Object.entries(savedPlayer.spaceShip.owned)" class="border p-1 me-1"
            :class="+spaceShip[0] == savedPlayer.spaceShip.selected ? 'border-dark' : ''" @click="selected(+spaceShip[0])">
            <div :class="spaceShip[1].img" class="img"></div>
            <div v-for="stat of Object.entries(detailsSpaceShip[spaceShip[1].stats]) ">
                {{ stat[0] }}: {{ stat[1] }}
            </div>
            <button class="btn btn-danger" @click="sell(+spaceShip[0])">sell</button>
        </div>
    </div>
    <div class="text-center mt-2">
        abilitys
    </div>
    <div v-for="ability of [0, 1, 2, 3]" class="px-2 d-flex justify-content-center">
        <select class="form-select mb-1 w-50" v-model="savedPlayer.abilitys.selected[ability]">
            <option :value="savedPlayer.abilitys.selected[ability]">{{
                detailsAbilitys[savedPlayer.abilitys.selected[ability]].name }}</option>
            <option v-for="availableAbility of availableAbilitys" :value="availableAbility">{{
                detailsAbilitys[savedPlayer.abilitys.selected[availableAbility]].name }}</option>
            <option :value="-1">none</option>
        </select>
    </div>
    <div class="text-center mt-2">
        Weapons
    </div>
    <button v-for="weapon of savedPlayer.weapons.owned" class="btn  me-1"
        :class="savedPlayer.weapons.selected == weapon ? 'btn-success' : 'btn-primary'"
        :title="detailsWeapons[weapon].description" @click="savedPlayer.weapons.selected = weapon">
        {{ detailsWeapons[weapon].name }}
    </button>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../ts/player';
import { details as detailsSpaceShip } from '../ts/spaceShip';
import { details as detailsAbilitys } from '../ts/abilitys';
import { details as detailsWeapons } from '../ts/weapon';
import { computed } from 'vue';

const availableAbilitys = computed(() => {
    return savedPlayer.value.abilitys.owned.filter(e => savedPlayer.value.abilitys.selected.includes(e))
})
function selected(id: number) {
    savedPlayer.value.spaceShip.selected = id
}
function sell(id: number) {
    if (id == savedPlayer.value.spaceShip.selected) return
    delete savedPlayer.value.spaceShip.owned[id]
}
</script>
<style scoped>
.img {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    height: 50px;
}
</style>