<template>
    <div>
        scrap: {{ savedPlayer.currency || 0 }}
    </div>
    <div class="accordion px-2" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne">
                    weapons
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse " data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <Weapon></Weapon>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo">
                    spaceships
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">

                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang='ts'>
import { savedPlayer } from '../ts/player';
import Weapon from "./shop/Weapons.vue"
</script>
<style scoped></style>