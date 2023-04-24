import { ComputedRef } from "vue"

export interface TimeCrystal {
    enemieSpawnTime: number
    enemieSpeedTime: number
    enemieHpTime: number
    enemieSpecialTime: number
    enemieDamageTime: number
}
export interface PowerCrystal {
    enemieSpeedPower: number
    enemieHpPower: number
    enemieSpecialPower: number
    enemieDamagePower: number
}
export interface Player extends GameObject {
    hp: number
    hpMax: number
    energy: number
    energyMax: number
    effects: { [key: string]: number }
    cooldowns: { [key: string]: number }
    invincible: boolean
    big: boolean
}
export interface OwnedSpaceShip {
    img: number
    stats: number
    statsMultiplier: number
}
export interface SavedPlayer {
    spaceShip: {
        selected: number
        owned: {
            [key: number]: OwnedSpaceShip
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
    lvl: {
        lvl: number
        xp: number
    }
    timeCrystal: {
        selected: number
        owned: { [key: number]: TimeCrystal }
    }
    powerCrystal: {
        selected: number
        owned: { [key: number]: PowerCrystal }
    }
    score: {
        highScore: number
    }
}
export interface SpaceShipStats {
    speed: number,
    hpMax: number,
    energyMax: number,
    size: number
}
export interface SpaceShipDetails {
    [key: number]: {
        speed: number,
        hpMax: number,
        energyMax: number,
        size: number
        statsMultiplier: {
            speed: "in" | "de" | "const",
            hpMax: "in" | "de" | "const",
            energyMax: "in" | "de" | "const",
            size: "in" | "de" | "const",
        }
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
    multiplier: () => ComputedRef<number>
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
    hp: number
    hpMax: number
    damage: number
    move: (enemie: Enemie) => void
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
    img: string | number
    size: number
    speed: number
    direction: number
}
export interface Vector {
    x: number
    y: number
}
