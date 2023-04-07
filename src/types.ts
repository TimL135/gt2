export interface Player extends GameObject {
    hp: number
    hpMax: number
    energy: number
    energyMax: number
    effects: { [key: string]: number }
    cooldowns: { [key: string]: number }
    cooldownsMax: { [key: string]: number }
}
export interface SkillDetails {
    [key: number]: SkillDetail
}
export interface SkillDetail {
    name: string
    description: string
    skillTreeId: number
    usedPointsNeed: number
    required?: {
        skillId: number,
        skillLvl: number
    }
    maxLvl: number
    multiplier: (lvl: number) => number
}
export interface ItemdDetails {
    [key: number]: {
        name: string
        img: string
        effect: () => void
        multiplier: () => number
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
        getMoveVector: (enemie: Enemie) => void
    }
}
export interface Enemie extends GameObject {
    move: (array: Enemie | Plasma, multiplier: number) => void
    damage: number
    getMoveVector: (enemie: Enemie) => void
}
export interface Plasma extends GameObject {
    move: () => void
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
