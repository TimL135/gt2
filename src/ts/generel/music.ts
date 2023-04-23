import { ref } from 'vue';
const audioElement = document.createElement('audio');
export const musicStarts = ref(false);
audioElement.setAttribute('id', 'music');
audioElement.setAttribute('src', '../../public/music/Space.mp3');
audioElement.setAttribute('autoplay', 'autoplay');
audioElement.loop = true;
changeVolume(50);
export function changeVolume(volume = 50) {
    if (audioElement) audioElement.volume = volume / 5000;
}
export function start() {
    if (!musicStarts.value) {
        try {
            audioElement.play();
        } catch {
            return;
        }
    }
    musicStarts.value = true;
}
// export function itemSound(volume = 50, item: type.Item) {
//   const ItemSound = document.createElement('audio');
//   switch (item.type) {
//     case 'clearField':
//       ItemSound.setAttribute('src', '/music/BombSound.mp3');
//       break;
//     default:
//       ItemSound.setAttribute('src', '/music/CollectItemSound.mp3');
//       break;
//   }
//   ItemSound.setAttribute('id', 'itemSound');
//   ItemSound.setAttribute('autoplay', 'autoplay');
//   ItemSound.volume = volume / 600;
//   ItemSound.play();
// }
// export function plasmaSound(volume = 50) {
//   const PlasmaSound = document.createElement('audio');
//   PlasmaSound.setAttribute('id', 'plasmaSound');
//   PlasmaSound.setAttribute('src', '/music/PlasmaSound.mp3');
//   PlasmaSound.setAttribute('autoplay', 'autoplay');
//   PlasmaSound.volume = volume / 600;
//   PlasmaSound.play();
// }
