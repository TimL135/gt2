import { player, savedPlayer } from '../player';
import explosion from '/public/sounds/explosion.wav';
import laserShoot from "/public/sounds/laserShoot.wav"
import hitHurt from "/public/sounds/hitHurt.wav"
import powerUp from "/public/sounds/powerUp.wav"
import reload from "/public/sounds/reload.wav"
import click from "/public/sounds/click.wav"
import move from "/public/sounds/move.wav"
import { secondsToTicks, } from './helpers';

const sounds = {
    explosion,
    laserShoot,
    hitHurt,
    powerUp,
    reload,
    click,
    move
}

export function playSound(sound: string) {
    if (player.value.cooldowns["sound" + sound]) return
    const audioElement = document.createElement('audio');
    audioElement.setAttribute('src', sounds[sound]);
    audioElement.volume = (savedPlayer.value.settings.soundsVolume || 50) / (sound == 'move' ? 10000 : 5000);
    audioElement.setAttribute('autoplay', 'autoplay');
    player.value.cooldowns["sound" + sound] = secondsToTicks(0.1)
}