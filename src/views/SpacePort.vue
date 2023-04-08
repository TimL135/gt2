<template>
    <div class="text-center">
        <div class="mb-2">
            <button v-for="port of ['shop']" @click="view = port" class="me-1 btn btn-secondary">{{ port }}</button>
        </div>
        <Shop v-if="view == 'shop'"></Shop>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import Shop from '../components/Shop.vue';
const view = ref("shop")
</script>
<style scoped></style>