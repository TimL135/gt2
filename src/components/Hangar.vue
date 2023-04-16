<template>
    <div class="text-center">
        {{ savedPlayer.lvl.lvl + 1 }}
    </div>
    <div class="d-flex justify-content-center mb-2">
        <div class="progress w-50">
            <div class="progress-bar bg-info" style="--bs-progress-bar-transition: width 0.0s ease;"
                :style="{ width: (savedPlayer.lvl.xp / ((savedPlayer.lvl.lvl + 1) * xpNeed)) * 100 + '%' }">
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-center px-2">
        <div v-for="spaceShip of Object.entries(savedPlayer.spaceShip.owned)" class="border mb-1 p-1 me-1"
            :class="+spaceShip[0] == savedPlayer.spaceShip.selected ? 'border-dark' : ''" @click="selected(+spaceShip[0])">
            <div :class="typeof spaceShip[1].img == 'string' ? spaceShip[1].img : imgs[spaceShip[1].img]" class="img"></div>
            <div v-for="stat of Object.entries(getStats(spaceShip[1])) ">
                {{ stat[0] }}: {{ stat[1] }}
            </div>
            <button class="btn btn-danger" @click="sell(+spaceShip[0])">sell</button>
        </div>
    </div>
    <div class="text-center mt-2">
        abilitys
    </div>
    <div v-for="(_, ability) of savedPlayer.abilitys.selected" class="px-2 d-flex justify-content-center">
        <select class="form-select mb-1 w-50" v-model="savedPlayer.abilitys.selected[ability]"
            :title="detailsAbilitys[ability].description">
            <option :value="savedPlayer.abilitys.selected[ability]" :title="detailsAbilitys[ability].description">{{
                detailsAbilitys[savedPlayer.abilitys.selected[ability]]?.name || "none" }}</option>
            <option v-for="availableAbility of availableAbilitys" :value="availableAbility"
                :title="detailsAbilitys[availableAbility]?.description">{{
                    detailsAbilitys[availableAbility]?.name }}</option>
            <option :value="-1" v-if="savedPlayer.abilitys.selected[ability] != -1">none</option>
        </select>
    </div>
    <div class="text-center mt-2">
        Weapons
    </div>
    <button v-for="weapon of savedPlayer.weapons.owned" class="btn mb-1 me-1"
        :class="savedPlayer.weapons.selected == weapon ? 'btn-success' : 'btn-primary'"
        :title="detailsWeapons[weapon].description" @click="savedPlayer.weapons.selected = weapon">
        {{ detailsWeapons[weapon].name }}
    </button>
    <div class="text-center mt-2">
        Passivs
    </div>
    <button v-for="passiv of savedPlayer.passivs.owned" class="btn mb-1 me-1"
        :class="savedPlayer.passivs.selected == passiv ? 'btn-success' : 'btn-primary'"
        :title="detailsPassivs[passiv].description" @click="savedPlayer.passivs.selected = passiv">
        {{ detailsPassivs[passiv].name }}
    </button>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../ts/player';
import { details as detailsSpaceShip, getStats } from '../ts/spaceShip';
import { details as detailsAbilitys } from '../ts/abilitys';
import { details as detailsWeapons } from '../ts/weapon';
import { details as detailsPassivs } from '../ts/passivs';
import { imgs } from '../ts/spaceShip';
import { computed } from 'vue';
import { xpNeed } from '../ts/generel/config';

const availableAbilitys = computed(() => {
    return savedPlayer.value.abilitys.owned.filter(e => !savedPlayer.value.abilitys.selected.includes(e))
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