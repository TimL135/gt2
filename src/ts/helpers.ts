import { gameTicks } from "./config";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function makeSec(sec: number) {
    return Math.round(gameTicks * sec)
}