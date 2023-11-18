<template>
    <div class="text-center">
        <div class="mb-2">
            <button v-for="port of ['shop', 'building', 'honor', 'hangar','world']" @click="view = port" class="me-1 btn "
                :class="view == port ? 'btn-success' : 'btn-primary'">
                {{ port }}</button>
        </div>
        <Shop v-if="view == 'shop'"></Shop>
        <Building v-if="view == 'building'"></Building>
        <Score v-if="view == 'honor'"></Score>
        <Hangar v-if="view == 'hangar'"></Hangar>
        <World v-if="view == 'world'"></World>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import Shop from '../components/spacePort/shop/Shop.vue';
import Building from '../components/spacePort/Building.vue';
import Hangar from '../components/spacePort/hangar/Hangar.vue';
import Score from '../components/spacePort/Score.vue';
import World from '@/components/spacePort/World.vue';
const view = ref("hangar")
</script>
<style scoped></style>