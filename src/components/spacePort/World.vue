<template>
    <div class="h3">
posible enemies
    </div>
    <div class="d-flex justify-content-center">
       <div v-for="enemie of posibleDetails" style="height: 5rem; width: 5rem;" class="object me-2"  :class="enemie.img">
    </div>  
    </div>
   
</template>
<script setup lang='ts'>
import {  posibleDetails } from '@/ts/enemies';
</script>
<style scoped>
.object {
    background-size: contain;
    background-repeat: no-repeat;
}
</style>