import { ref, watch } from 'vue';
import backgroundMusic from '/public/music/Space.mp3';
import { savedPlayer } from '../player';
const audioElement = document.createElement('audio');
export const musicStarts = ref(false);
audioElement.setAttribute('id', 'music');
audioElement.setAttribute('src', backgroundMusic);
audioElement.setAttribute('autoplay', 'autoplay');
audioElement.loop = true;
changeVolume();
watch(() => savedPlayer.value.settings.musicVolume, () => changeVolume());
export function changeVolume() {
    if (audioElement) audioElement.volume = (savedPlayer.value.settings.musicVolume || 50) / 5000;
}
export function start() {
    if (!musicStarts.value) {
        try {
            audioElement.play();
            musicStarts.value = true;
        } catch {
            return;
        }
    }

}
