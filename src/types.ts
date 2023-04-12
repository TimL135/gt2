export interface Player extends GameObject {
    hp: number
    hpMax: number
    energy: number
    energyMax: number
    effects: { [key: string]: number }
    cooldowns: { [key: string]: number }
    invincible: boolean
}
export interface SavedPlayer {
    spaceShip: {
        selected: number
        owned: {
            [key: number]: {
                img: string
                stats: number
            }
        }
    }
    abilitys: {
        selected: number[]
        owned: number[]
    }
    points: { [key: number]: number }
    skills: { [key: number]: number }
    buildings: { [key: number]: number }
    currency: number
    weapons: {
        selected: number
        owned: number[]
    }
    passivs: {
        selected: number
        owned: number[]
    }
}
export interface SpaceShipDetails {
    [key: number]: {
        speed: number,
        hpMax: number,
        energyMax: number,
        size: number
    }
}
export interface AbilityDetails {
    [key: number]: {
        name: string
        description: string
        cooldown: number
        effect: () => void
        condition: () => boolean
        energyCost: number
    }
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
export interface WeaponDetails {
    [key: number]: WeaponDetail
}
export interface WeaponDetail {
    name: string
    description: string
    size: number
    speed: number
    cooldown: number
    damage: number
    shot: () => void
    move: (plasma: Plasma) => void
    getMoveVector: (plasma: Plasma, index?: number) => void
}
export interface ItemdDetails {
    [key: number]: {
        name: string
        img: string
        effect: () => void
        multiplier: () => void
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
    move: (array: Enemie | Plasma) => void
    damage: number
    getMoveVector: (enemie: Enemie) => void
}
export interface Plasma extends GameObject {
    name: string
    description: string
    size: number
    speed: number
    cooldown: number
    damage: number
    shot: () => void
    move: (plasma: Plasma) => void
    getMoveVector: (plasma: Plasma, index?: number) => void
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
