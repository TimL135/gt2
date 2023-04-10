<template>
    <div class="text-center">
        <div class="mb-2">
            <button v-for="port of ['shop', 'building', 'hangar']" @click="view = port" class="me-1 btn "
                :class="view == port ? 'btn-success' : 'btn-primary'">
                {{ port }}</button>
        </div>
        <Shop v-if="view == 'shop'"></Shop>
        <Building v-if="view == 'building'"></Building>
        <Hangar v-if="view == 'hangar'"></Hangar>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import Shop from '../components/Shop.vue';
import Building from '../components/Building.vue';
import Hangar from '../components/Hangar.vue';
const view = ref("shop")
</script>
<style scoped></style>