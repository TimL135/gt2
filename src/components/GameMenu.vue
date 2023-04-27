<template>
    <div class="d-flex flex-column justify-content-center align-items-center  h-100 w-100" style="position: absolute;">

        <div>
            <button class="btn btn-primary" @click="startGame">START</button>
            <button class="btn btn-primary" style="position: absolute; right: 10%;z-index: 2;" data-bs-toggle="modal"
                data-bs-target="#settingsModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="grey" class="bi bi-gear-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                </svg>
            </button>
        </div>
        <div class="mt-2">
            <div class="text-white bg-secondary px-2" v-for="e of Object.values(info)">
                {{ e }}
            </div>
        </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="settingsModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">settings</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Settings />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { start as startGame } from '../ts/game';
import { info } from '../ts/info'
import Settings from './Settings.vue';
document.onkeyup = (e: any) => {
    if (e.code == 'Enter') startGame();
};
</script>
<style scoped></style>