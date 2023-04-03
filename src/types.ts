export interface Player extends GameObject {
    hp: number
    hpMax: number
    magazine: number
    magazineMax: number
    effects: { [key: string]: number }
    cooldowns: { [key: string]: number }
    cooldownsMax: { [key: string]: number }
}
export interface ItemdDetails {
    [key: number]: {
        name: string
        img: string
        effect: Function
    }
}
export interface Item extends GameObject {
    effect: Function
    lifeDuration: number
    name: string
}
export interface EnemieDetails {
    [key: number]: {
        move: Function
        img: string
        getMoveVector: Function
    }
}
export interface Enemie extends GameObject {
    move: Function
    damage: number
    getMoveVector: Function
}
export interface Plasma extends GameObject {
    move: Function
    damage: number
}
export interface GameObject {
    id: number
    cords: Vector
    moveVector: Vector
    img: string
    size: number
    speed: number
    direction: number
}
export interface Vector {
    x: number
    y: number
}