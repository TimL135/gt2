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
                            <option :value="-1" v-if="ability != -1">none</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item" v-for="standard of (['weapons', 'passivs'] as const)">
            <h2 class="accordion-header" :id="`heading${standard}`">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${standard}`">
                    {{ standard }}
                </button>
            </h2>
            <div :id="`collapse${standard}`" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <Standard :standardProp="standard"></Standard>
                </div>
            </div>
        </div>
        <div class="accordion-item" v-for="crystal of ['time_crystal', 'power_crystal']">
            <h2 class="accordion-header" :id="`heading${crystal}`">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${crystal}`">
                    {{ crystal.replace('_', ' ') }}
                </button>
            </h2>
            <div :id="`collapse${crystal}`" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <Crystal :crystalProp="crystal.replace('_c', 'C')"></Crystal>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../../../ts/player';
import { getStats } from '../../../ts/spaceShip';
import { details as detailsAbilitys } from '../../../ts/abilitys';
import { imgs } from '../../../ts/spaceShip';
import { computed } from 'vue';
import { xpNeed } from '../../../ts/generel/config';
import Crystal from "./Crystal.vue"
import Standard from "./standard.vue"

const availableAbilitys = computed(() => {
    return savedPlayer.value.abilitys.owned.filter(e => !savedPlayer.value.abilitys.selected.includes(e))
})
function selectedSpaceShip(id: number) {
    savedPlayer.value.spaceShip.selected = id
}
function sellSpaceShip(id: number) {
    if (id == savedPlayer.value.spaceShip.selected) return
    savedPlayer.value.currency += 20
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