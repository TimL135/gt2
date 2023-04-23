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
    <div class="accordion px-2" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingSpaceShips">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseSpaceShips">
                    SpaceShips
                </button>
            </h2>
            <div id="collapseSpaceShips" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="d-flex justify-content-center">
                        <div v-for="spaceShip of Object.entries(savedPlayer.spaceShip.owned)" class="border mb-1 p-1 me-1"
                            :class="+spaceShip[0] == savedPlayer.spaceShip.selected ? 'border-dark' : ''"
                            @click="selectedSpaceShip(+spaceShip[0])">
                            <div :class="typeof spaceShip[1].img == 'string' ? spaceShip[1].img : imgs[spaceShip[1].img]"
                                class="img"></div>
                            <div v-for="stat of Object.entries(getStats(spaceShip[1])) ">
                                {{ stat[0] }}: {{ stat[1] }}
                            </div>
                            <button class="btn btn-danger" @click.stop="sellSpaceShip(+spaceShip[0])">sell</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingAbiliys">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseAbiliys">
                    Abiliys
                </button>
            </h2>
            <div id="collapseAbiliys" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div v-for="(ability, index) of savedPlayer.abilitys.selected"
                        class="px-2 d-flex justify-content-center">
                        <select class="form-select mb-1 w-50" v-model="savedPlayer.abilitys.selected[index]"
                            :title="detailsAbilitys[ability]?.description">
                            <option :value="savedPlayer.abilitys.selected[index]"
                                :title="detailsAbilitys[ability]?.description">{{
                                    detailsAbilitys[savedPlayer.abilitys.selected[index]]?.name || "none" }}</option>
                            <option v-for="availableAbility of availableAbilitys" :value="availableAbility"
                                :title="detailsAbilitys[availableAbility]?.description">{{
                                    detailsAbilitys[availableAbility]?.name }}</option>
                            <option :value="-1" v-if="savedPlayer.abilitys.selected[ability] != -1">none</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingWeapons">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseWeapons">
                    Weapons
                </button>
            </h2>
            <div id="collapseWeapons" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <button v-for="weapon of savedPlayer.weapons.owned" class="btn mb-1 me-1"
                        :class="savedPlayer.weapons.selected == weapon ? 'btn-success' : 'btn-primary'"
                        :title="detailsWeapons[weapon].description" @click="savedPlayer.weapons.selected = weapon">
                        {{ detailsWeapons[weapon].name }}
                    </button>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingPassivs">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePassivs">
                    Passivs
                </button>
            </h2>
            <div id="collapsePassivs" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <button v-for="passiv of savedPlayer.passivs.owned" class="btn mb-1 me-1"
                        :class="savedPlayer.passivs.selected == passiv ? 'btn-success' : 'btn-primary'"
                        :title="detailsPassivs[passiv].description" @click="savedPlayer.passivs.selected = passiv">
                        {{ detailsPassivs[passiv].name }}
                    </button>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingArtefacts">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseArtefacts">
                    time crystal
                </button>
            </h2>
            <div id="collapseArtefacts" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="d-flex justify-content-center">
                        <div v-for="artefact of Object.entries(savedPlayer.artefacts.owned)" class="border mb-1 p-1 me-1"
                            :class="+artefact[0] == savedPlayer.artefacts.selected ? 'border-dark' : ''"
                            @click="selectedArtefact(+artefact[0])">
                            <div v-for="stat of Object.keys(artefact[1])" class="mb-1">
                                {{ showStat(+artefact[0], stat) }}
                            </div>
                            <button class="btn btn-danger" @click.stop="sellArtefact(+artefact[0])">sell</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingPowerCrystal">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsePowerCrystal">
                    power crystal
                </button>
            </h2>
            <div id="collapsePowerCrystal" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="d-flex justify-content-center">
                        <div v-for="powerCrystal of Object.entries(savedPlayer.powerCrystal.owned)"
                            class="border mb-1 p-1 me-1"
                            :class="+powerCrystal[0] == savedPlayer.powerCrystal.selected ? 'border-dark' : ''"
                            @click="selectedPowerCrystal(+powerCrystal[0])">
                            <div v-for="stat of Object.keys(powerCrystal[1])" class="mb-1">
                                {{ showStatTimeCrystal(+powerCrystal[0], stat) }}
                            </div>
                            <button class="btn btn-danger" @click.stop="sellPowerCrystal(+powerCrystal[0])">sell</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../../ts/player';
import { getStats } from '../../ts/spaceShip';
import { details as detailsAbilitys } from '../../ts/abilitys';
import { details as detailsWeapons } from '../../ts/weapon';
import { details as detailsPassivs } from '../../ts/passivs';
import { imgs } from '../../ts/spaceShip';
import { computed } from 'vue';
import { xpNeed } from '../../ts/generel/config';
import { showStat, showStatTimeCrystal } from "../../ts/artefact"

const availableAbilitys = computed(() => {
    return savedPlayer.value.abilitys.owned.filter(e => !savedPlayer.value.abilitys.selected.includes(e))
})
function selectedSpaceShip(id: number) {
    savedPlayer.value.spaceShip.selected = id
}
function selectedArtefact(id: number) {
    savedPlayer.value.artefacts.selected = id
}
function selectedPowerCrystal(id: number) {
    savedPlayer.value.powerCrystal.selected = id
}
function sellSpaceShip(id: number) {
    if (id == savedPlayer.value.spaceShip.selected) return
    savedPlayer.value.currency += 20
    delete savedPlayer.value.spaceShip.owned[id]
}
function sellArtefact(id: number) {
    if (id == savedPlayer.value.artefacts.selected) return
    savedPlayer.value.currency += 20 * Object.keys(savedPlayer.value.artefacts.owned[id]).length
    delete savedPlayer.value.artefacts.owned[id]
}
function sellPowerCrystal(id: number) {
    if (id == savedPlayer.value.powerCrystal.selected) return
    savedPlayer.value.currency += 20 * Object.keys(savedPlayer.value.powerCrystal.owned[id]).length
    delete savedPlayer.value.powerCrystal.owned[id]
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