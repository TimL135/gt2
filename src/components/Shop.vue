<template>
    <Currency></Currency>
    <div class="accordion px-2" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo">
                    spaceships
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <SpaceShip></SpaceShip>
                </div>
            </div>
        </div>

        <div class="accordion-item" v-for="item of ['abilitys', 'passivs', 'weapons']">
            <h2 class="accordion-header" :id="`heading${item}`">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    :data-bs-target="`#collapse${item}`">
                    {{ item }}
                </button>
            </h2>
            <div :id="`collapse${item}`" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <Items :item="item"></Items>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang='ts'>
import Currency from './Currency.vue';
import SpaceShip from "./shop/SpaceShips.vue"
import Items from "./shop/Items.vue"

import { skillMultiplier } from '../ts/skills';
skillMultiplier()
</script>
<style scoped></style>