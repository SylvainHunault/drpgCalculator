import { useState, useCallback } from 'react';
import { Calculator, Users, Zap, Target, Info, BarChart3 } from 'lucide-react';

// Types exacts basés sur le code fourni
// @ts-ignore
export enum Monster {
    GOUPIGNON = 'GOUPIGNON',
    GOUPIGNON2 = 'GOUPIGNON2',
    GOUPIGNON3 = 'GOUPIGNON3',
    WOLF = 'WOLF',
    GLUON = 'GLUON',
    GREEN_GIANT = 'GREEN_GIANT',
    COQDUR = 'COQDUR',
    FLAM = 'FLAM',
    GOBLIN = 'GOBLIN',
    BARCHE = 'BARCHE',
    COBRA = 'COBRA',
    PIRA = 'PIRA',
    KAZKA = 'KAZKA',
    ANGUIL = 'ANGUIL',
    BORG = 'BORG',
    KORGON = 'KORGON',
    RONCIV = 'RONCIV',
    BAT = 'BAT',
    GRDIEN = 'GRDIEN',
    WORM2 = 'WORM2',
    WORM = 'WORM',
    SCORP = 'SCORP',
    CACTUS = 'CACTUS',
    BRIG1_ALL = 'BRIG1_ALL',
    BRIG1_HOME = 'BRIG1_HOME',
    BRIG2_ALL = 'BRIG2_ALL',
    BRIG2_HOME = 'BRIG2_HOME',
    BRIG3_ALL = 'BRIG3_ALL',
    BRIG3_HOME = 'BRIG3_HOME',
    GROPI = 'GROPI',
    MIMIC = 'MIMIC',
    EARTH2 = 'EARTH2',
    VEGETOX_GUARD = 'VEGETOX_GUARD',
    VEGETOX_GUARD_2 = 'VEGETOX_GUARD_2',
    FRUTOX_DEFENDER = 'FRUTOX_DEFENDER',
    PIRHANOS = 'PIRHANOS',
    PIRHANOS_2 = 'PIRHANOS_2'
}

// @ts-ignore
export enum MapZone {
    DINOLAND = 'Dinoland',
    DINOWEST = 'Dinoland_West',
    JUNGLE = 'Jungle',
    ILES = 'Islands',
    GTOUTCHAUD = 'Grand Tout Chaud',
    STEPPE = 'Steppes',
    // NIMBAO = 'Nimbao',
    // ILEMONSTRE = 'zone_monisl',
    // CAUSHEMESH = 'zone_caush',
    // ALL = 'all',
    DARKWORLD = 'DarkWorld',
    // NOWHERE = 'nowhere'
}


type groupMonster = {
  quantity: number;
  odds: number;
};

export type MonsterFiche = {
    id: Monster;
    name: string;
    boss?: boolean;
    hp: number;
    elements: { air: number; fire: number; lightning: number; water: number; wood: number };
    // bonus attack for monster
    bonus_attack?: number | undefined;
    // bonus defense for monster
    bonus_defense?: number | undefined;
    // Resilience determines how much damage a fighter takes in.
    // Damage formula is: damage^(1-resilience*0.01)
    // So each point in resilience lowers the damage receive.
    // PVP default is 40 points so 1 - 40*0.01 = 0.6 (the original number used by MT)
    // PVE (aka monsters) is case by case
    resilience: number;
    groups?: groupMonster[];
    xp?: number;
    xpBonus?: number;
    gold?: number;
    // Chance of encountering this monster.
    odds: number;
    level: number;
    zones: MapZone[];
    special?: boolean;
    canBeCaptured: boolean;
    noMove?: boolean;
    display?: string;
    size?: number;
    dark?: boolean;
};

// Liste exacte des monstres du code
export const monsterList: Readonly<Record<Monster, MonsterFiche>> = {
    [Monster.GOUPIGNON]: {
        id: Monster.GOUPIGNON,
        name: 'goupignon',
        hp: 20,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 33,
        level: 1,
        zones: [MapZone.DINOLAND],
        canBeCaptured: true,
        display: 'goupi'
    },
    [Monster.GOUPIGNON2]: {
        id: Monster.GOUPIGNON2,
        name: 'goupignon',
        hp: 20,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 33,
        level: 1,
        zones: [MapZone.DINOLAND],
        canBeCaptured: true,
        display: 'goupi2'
    },
    [Monster.GOUPIGNON3]: {
        id: Monster.GOUPIGNON3,
        name: 'goupignon',
        hp: 20,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 33,
        level: 1,
        zones: [MapZone.DINOLAND],
        canBeCaptured: true,
        display: 'goupi3'
    },
    [Monster.WOLF]: {
        id: Monster.WOLF,
        name: 'wolf',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 1,
        bonus_defense: 1,
        resilience: 0,
        odds: 80,
        level: 5,
        zones: [MapZone.DINOLAND],
        groups: [
            { quantity: 0, odds: 5 },
            { quantity: 1, odds: 3 },
            { quantity: 2, odds: 1 }
        ],
        canBeCaptured: true,
        display: 'wolf'
    },
    [Monster.GLUON]: {
        id: Monster.GLUON,
        name: 'gluon',
        hp: 35,
        elements: {
            air: 2,
            fire: 2,
            lightning: 2,
            water: 2,
            wood: 2
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 20,
        level: 7,
        xp: 25,
        zones: [MapZone.DINOLAND],
        canBeCaptured: true,
        display: 'gluon'
    },
    [Monster.GREEN_GIANT]: {
        id: Monster.GREEN_GIANT,
        name: 'greeng',
        hp: 70,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 3,
        bonus_defense: 6,
        resilience: 0,
        odds: 100,
        level: 14,
        zones: [MapZone.DINOLAND],
        canBeCaptured: true,
        display: 'gvert'
    },
    [Monster.COQDUR]: {
        id: Monster.COQDUR,
        name: 'coq',
        hp: 80,
        elements: {
            air: 3,
            fire: 3,
            lightning: 3,
            water: 3,
            wood: 3
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 50,
        level: 21,
        zones: [MapZone.DINOLAND],
        canBeCaptured: true,
        display: 'coq'
    },
    [Monster.FLAM]: {
        id: Monster.FLAM,
        name: 'flam',
        hp: 10,
        elements: {
            fire: 1,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 100,
        level: 3,
        xp: 7,
        zones: [MapZone.GTOUTCHAUD],
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 3 },
            { quantity: 2, odds: 1 }
        ],

        canBeCaptured: true,
        display: 'flam'
    },
    [Monster.GOBLIN]: {
        id: Monster.GOBLIN,
        name: 'goblin',
        hp: 60,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 2,
        bonus_defense: 1,
        resilience: 0,
        odds: 100,
        level: 5,
        zones: [MapZone.GTOUTCHAUD],
        canBeCaptured: true,
        display: 'goblin'
    },
    [Monster.BARCHE]: {
        id: Monster.BARCHE,
        name: 'barche',
        hp: 70,
        elements: {
            fire: 3,
            wood: 1,
            water: 2,
            lightning: 1,
            air: 1
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 0,
        odds: 20,
        level: 10,
        xp: 15,
        zones: [MapZone.GTOUTCHAUD],
        canBeCaptured: true,
        display: 'barche'
    },
    [Monster.COBRA]: {
        id: Monster.COBRA,
        name: 'cobra',
        hp: 100,
        elements: {
            fire: 5,
            wood: 0,
            water: 0,
            lightning: 4,
            air: 0
        },
        resilience: 0,
        odds: 50,
        level: 20,
        zones: [MapZone.GTOUTCHAUD],
        canBeCaptured: true,
        display: 'cobra'
    },
    [Monster.PIRA]: {
        id: Monster.PIRA,
        name: 'pira',
        hp: 5,
        elements: {
            fire: 0,
            wood: 0,
            water: 1,
            lightning: 0,
            air: 0
        },
        resilience: 0,
        odds: 100,
        level: 6,
        xp: 5,
        zones: [MapZone.ILES],
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 0 },
            { quantity: 2, odds: 1 }
        ],
        canBeCaptured: true,
        display: 'pira'
    },
    [Monster.KAZKA]: {
        id: Monster.KAZKA,
        name: 'kazka',
        hp: 50,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 3,
        bonus_defense: 7,
        resilience: 0,
        odds: 50,
        level: 8,
        zones: [MapZone.ILES],
        canBeCaptured: true,
        display: 'kazka'
    },
    [Monster.ANGUIL]: {
        id: Monster.ANGUIL,
        name: 'anguil',
        hp: 120,
        elements: {
            fire: 2,
            wood: 0,
            water: 4,
            lightning: 0,
            air: 0
        },
        resilience: 0,
        odds: 70,
        level: 18,
        xp: 15,
        zones: [MapZone.ILES],
        canBeCaptured: true,
        display: 'anguil'
    },
    [Monster.BORG]: {
        id: Monster.BORG,
        name: 'borg',
        hp: 100,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 10,
        bonus_defense: 40,
        resilience: 0,
        odds: 50,
        level: 28,
        zones: [MapZone.ILES],
        canBeCaptured: false,
        display: 'borg'
    },
    [Monster.KORGON]: {
        id: Monster.KORGON,
        name: 'korgon',
        hp: 10,
        elements: {
            fire: 3,
            wood: 4,
            water: 0,
            lightning: 0,
            air: 0
        },
        resilience: 0,
        odds: 100,
        level: 7,
        zones: [MapZone.JUNGLE],
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 2 },
            { quantity: 2, odds: 1 }
        ],
        canBeCaptured: true,
        display: 'korgon'
    },
    [Monster.RONCIV]: {
        id: Monster.RONCIV,
        name: 'ronciv',
        hp: 70,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 6,
        bonus_defense: 15,
        resilience: 0,
        odds: 100,
        level: 15,
        zones: [MapZone.JUNGLE],
        canBeCaptured: true,
        noMove: true,
        display: 'ronciv'
    },
    [Monster.BAT]: {
        id: Monster.BAT,
        name: 'bat',
        hp: 50,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 25,
        bonus_defense: 18,
        resilience: 40,
        odds: 50,
        level: 20,
        zones: [MapZone.JUNGLE],
        canBeCaptured: true,
        display: 'bat'
    },
    [Monster.GRDIEN]: {
        id: Monster.GRDIEN,
        name: 'grdien',
        hp: 80,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 10,
        bonus_defense: 25,
        resilience: 40,
        odds: 50,
        level: 25,
        xp: 15,
        zones: [MapZone.JUNGLE],
        canBeCaptured: true,
        noMove: true,
        display: 'grdien'
    },
    [Monster.WORM2]: {
        id: Monster.WORM2,
        name: 'worm2',
        hp: 50,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 6,
        bonus_defense: 10,
        resilience: 40,
        odds: 50,
        level: 20,
        zones: [MapZone.STEPPE],
        canBeCaptured: true,
    },
    [Monster.WORM]: {
        id: Monster.WORM,
        name: 'worm',
        hp: 60,
        elements: {
            fire: 0,
            wood: 0,
            water: 10,
            lightning: 15,
            air: 0
        },
        resilience: 40,
        odds: 50,
        level: 30,
        zones: [MapZone.STEPPE],
        canBeCaptured: true,
        noMove: true
    },
    [Monster.SCORP]: {
        id: Monster.SCORP,
        name: 'scorp',
        hp: 50,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 9,
            air: 0
        },
        resilience: 40,
        odds: 50,
        level: 30,
        zones: [MapZone.STEPPE],
        canBeCaptured: true,
    },
    [Monster.CACTUS]: {
        id: Monster.CACTUS,
        name: 'cactus',
        hp: 20,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 40,
        bonus_defense: 130,
        resilience: 40,
        odds: 50,
        level: 38,
        xp: 12,
        zones: [MapZone.STEPPE],
        canBeCaptured: true,
    },
    [Monster.BRIG1_ALL]: {
        id: Monster.BRIG1_ALL,
        name: 'brig1',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 70,
        bonus_defense: 0,
        resilience: 40,
        odds: 10,
        level: 25,
        zones: [MapZone.STEPPE],
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 1 }
        ],
        canBeCaptured: true,
    },
    [Monster.BRIG1_HOME]: {
        id: Monster.BRIG1_HOME,
        name: 'brig1',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 70,
        bonus_defense: 0,
        resilience: 40,
        odds: 500,
        level: 25,
        zones: [MapZone.STEPPE],
                groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 1 }
        ],
        canBeCaptured: true,
    },
    [Monster.BRIG2_ALL]: {
        id: Monster.BRIG2_ALL,
        name: 'brig2',
        hp: 5,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 40,
        odds: 10,
        level: 25,
        xp: 6,
        zones: [MapZone.STEPPE],
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 0 },
            { quantity: 2, odds: 0 },
            { quantity: 3, odds: 1 }
        ],
        canBeCaptured: true,
    },
    [Monster.BRIG2_HOME]: {
        id: Monster.BRIG2_HOME,
        name: 'brig2',
        hp: 5,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 0,
        bonus_defense: 0,
        resilience: 40,
        odds: 500,
        level: 25,
        xp: 6,
        zones: [MapZone.STEPPE],
                groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 0 },
            { quantity: 2, odds: 0 },
            { quantity: 3, odds: 1 }
        ],
        canBeCaptured: true,
    },
    [Monster.BRIG3_ALL]: {
        id: Monster.BRIG3_ALL,
        name: 'brig3',
        hp: 20,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 50,
        bonus_defense: 20,
        resilience: 40,
        odds: 10,
        level: 25,
        xp: 7,
        zones: [MapZone.STEPPE],
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 0 },
            { quantity: 2, odds: 1 }
        ],
        canBeCaptured: true,
    },
    [Monster.BRIG3_HOME]: {
        id: Monster.BRIG3_HOME,
        name: 'brig3',
        hp: 20,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 50,
        bonus_defense: 20,
        resilience: 40,
        odds: 500,
        level: 25,
        xp: 7,
        zones: [MapZone.STEPPE],
                groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 0 },
            { quantity: 2, odds: 1 }
        ],
        canBeCaptured: true,
    },
    [Monster.GROPI]: {
        id: Monster.GROPI,
        name: 'gropi',
        hp: 10,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 15,
        bonus_defense: 25,
        resilience: 40,
        odds: 100,
        level: 7,
        zones: [MapZone.DINOWEST],
        canBeCaptured: true,
    },
    [Monster.MIMIC]: {
        id: Monster.MIMIC,
        name: 'mimic',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 30,
        bonus_defense: 50,
        resilience: 40,
        odds: 100,
        level: 35,
        zones: [MapZone.DINOWEST],
        canBeCaptured: true
    },
    [Monster.EARTH2]: {
        id: Monster.EARTH2,
        name: 'earth2',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 10,
        bonus_defense: 40,
        resilience: 40,
        odds: 100,
        level: 15,
        zones: [MapZone.DINOWEST],
        canBeCaptured: true
    },
    [Monster.VEGETOX_GUARD]: {
        id: Monster.VEGETOX_GUARD,
        name: 'mugard',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 30,
        bonus_defense: 15,
        resilience: 0,
        odds: 100,
        level: 22,
        zones: [],
        canBeCaptured: true
    },
    [Monster.VEGETOX_GUARD_2]: {
        id: Monster.VEGETOX_GUARD_2,
        name: 'veginf',
        hp: 30,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 30,
        bonus_defense: 15,
        resilience: 0,
        odds: 0,
        level: 22,
        zones: [],
        canBeCaptured: true
    },
    [Monster.FRUTOX_DEFENDER]: {
        id: Monster.FRUTOX_DEFENDER,
        name: 'frutox',
        hp: 50,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 30,
        bonus_defense: 20,
        resilience: 0,
        odds: 100,
        level: 22,
        zones: [],
        canBeCaptured: true
    },
    [Monster.PIRHANOS]: {
        id: Monster.PIRHANOS,
        name: 'piraos',
        zones: [MapZone.DARKWORLD],
        level: 15,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 50,
        bonus_defense: 30,
        resilience: 40,
        odds: 100,
        hp: 15,
        groups: [
            { quantity: 0, odds: 0 },
            { quantity: 1, odds: 0 },
            { quantity: 2, odds: 1 }
        ],
        canBeCaptured: false
    },
    [Monster.PIRHANOS_2]: {
        id: Monster.PIRHANOS_2,
        name: 'pirao2',
        zones: [MapZone.DARKWORLD],
        level: 15,
        elements: {
            fire: 0,
            wood: 0,
            water: 0,
            lightning: 0,
            air: 0
        },
        bonus_attack: 50,
        bonus_defense: 30,
        resilience: 40,
        odds: 100,
        hp: 10,
        canBeCaptured: true
    }
};

// Fonctions exactes du code original
function monsterLevelProba(dinozLevel: number, p: number, monsterLvl: number): number {
  let delta = dinozLevel - monsterLvl;
  if (delta < 0) {
    if (delta < -3) return 0;
    delta = -delta * 3;
  }
  delta = Math.pow(delta, 1.5);
  return Math.round((p * 1000) / (3 + delta));
}

function weightedRandom<T extends { odds: number }>(items: T[], totalOdds: number): T {
  let i = 0;
  const weights: number[] = [];
  for (i = 0; i < items.length; i++) {
    weights[i] = items[i].odds / totalOdds + (weights[i - 1] || 0);
  }

  const random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) {
    if (weights[i] > random) {
      break;
    }
  }

  return items[i];
}

// Fonctions de récompense basées sur le code fourni
function getRandomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const calculatePvExp = (
  totalMonsterXp: number,
  dinozLevel: number,
  maxLevel: number,
  initialMaxLevel: number
): number => {
  const XP_BASE: number = 1.2;
  const XP_ADD: number = 0.8;
  const MINIMUM_XP_FACTOR: number = 1.0;
  const XP_MULTIPLICATOR: number = 1.0;

  const levelDiff = (maxLevel - dinozLevel) / maxLevel;
  let xpFactor = Math.max(XP_BASE + XP_ADD * levelDiff, MINIMUM_XP_FACTOR);

  if (maxLevel / initialMaxLevel > xpFactor) xpFactor = maxLevel / initialMaxLevel;

  return Math.round(totalMonsterXp * xpFactor * XP_MULTIPLICATOR);
};

function rewardFight(team: { level: number }[], monsters: MonsterFiche[]): {
  gold: number;
  totalWinXP: number;
  teamXP: { level: number; xp: number }[];
} {
  const XP_NEWB_BONUS = [15, 10, 6.6, 4.3, 2.5];
  const goldFactor = 1.0;
  let totalWinXP = 0;
  const teamLevel = team.reduce((acc, dinoz) => acc + dinoz.level, 0);
  let fgold = 0;
  let gold = 0;
  const teamXP: { level: number; xp: number }[] = [];

  for (const d of team) {
    let xp = 0;
    const cur = d.level / teamLevel;
    let gfact = 1.0;

    for (const f of monsters) {
      const factor = f.level >= d.level ? 1 : 4 / (4 + (d.level - f.level));
      let monsterXp = (f.xp ?? 10) * factor * cur;
      fgold += (f.gold ?? 1.0) * factor * cur * gfact;
      
      // newbie bonus
      if (d.level <= 5) monsterXp += XP_NEWB_BONUS[d.level - 1] * cur;
      // bonus for fighters of same level of the monster
      if (Math.abs(f.level - d.level) <= 5 && f.xpBonus) monsterXp += f.xpBonus;
      xp += monsterXp;
    }

    xp = calculatePvExp(xp, d.level, 50, 50);
    totalWinXP += xp;
    gold += (getRandomNumber(0, 36) + 43) * 10;
    teamXP.push({ level: d.level, xp: xp });
  }

	const fprob = getRandomNumber(0, 100);
	let goldMultiplier = 1;
	if (fprob < 1) goldMultiplier = 10;
	else if (fprob < 11) goldMultiplier = 3;
	// Gold multiplier average: 1.29
	// Gold base * multiplier: 610 * 1.29 = 786.9

	// Malus based on size of team starting size 2
	// Size 2: 0.5 - Size 3: 0.45 - Size 4: 0.445 - Size 5: 0.4445 etc.
	let teamSizeMalus = 1;
	for (let i = 2; i <= team.length; i++) {
		teamSizeMalus -= 0.5 * Math.pow(0.1, i - 2);
	}
	const malus = fgold >= 1 ? fgold * teamSizeMalus : fgold;
	gold = Math.round(gold * goldMultiplier * goldFactor * malus);

  return { gold, totalWinXP, teamXP };
}

// Simulation de la génération de monstre avec calcul des récompenses
function simulateMonsterGeneration(team: { level: number }[], iterations: number = 10000, map: MapZone): Map<string, {
  count: number;
  avgGold: number;
  avgTotalXP: number;
  avgTeamXP: { level: number; avgXP: number }[];
}> {
  const results = new Map<string, {
    count: number;
    totalGold: number;
    totalXP: number;
    teamXPSums: { level: number; totalXP: number }[];
  }>();
  
  for (let sim = 0; sim < iterations; sim++) {
    const monsters = generateMonsterList(team, map);
    const composition = monsters.map(m => m.id).sort().join(',');
    const rewards = rewardFight(team, monsters);
    
    if (!results.has(composition)) {
      results.set(composition, {
        count: 0,
        totalGold: 0,
        totalXP: 0,
        teamXPSums: team.map(d => ({ level: d.level, totalXP: 0 }))
      });
    }
    
    const entry = results.get(composition)!;
    entry.count++;
    entry.totalGold += rewards.gold;
    entry.totalXP += rewards.totalWinXP;
    
    rewards.teamXP.forEach((xp, i) => {
      entry.teamXPSums[i].totalXP += xp.xp;
    });
  }
  
  // Convertir en moyennes
  const finalResults = new Map<string, {
    count: number;
    avgGold: number;
    avgTotalXP: number;
    avgTeamXP: { level: number; avgXP: number }[];
  }>();
  
  for (const [composition, data] of results) {
    finalResults.set(composition, {
      count: data.count,
      avgGold: Math.round(data.totalGold / data.count),
      avgTotalXP: Math.round(data.totalXP / data.count),
      avgTeamXP: data.teamXPSums.map(xp => ({
        level: xp.level,
        avgXP: Math.round(xp.totalXP / data.count)
      }))
    });
  }
  
  return finalResults;
}

function generateMonsterList(team: { level: number }[], place: MapZone): MonsterFiche[] {
  let teamPowerLevel = 0;
  let greatestFighterLevel = 0;
  
  for (const dinoz of team) {
    teamPowerLevel += dinoz.level;
    if (dinoz.level > greatestFighterLevel) greatestFighterLevel = dinoz.level;
  }
  
  const diff = (team.length + 2) / (team.length * 2 + 1);
  teamPowerLevel = Math.round(teamPowerLevel * diff);

  const monsters = Object.values(monsterList)
      .filter(m => {
          // Filter monsters by zones
          return m.zones.includes(place);
      })
    .map(m => ({
      monster: m,
      p: monsterLevelProba(greatestFighterLevel, m.odds, m.level)
    }))
    .filter(m => m.p > 0);

  let monsterLevel = 0;
  const monsterArray: MonsterFiche[] = [];
  let total = monsters.reduce((acc, m) => acc + m.p, 0);

  if (total === 0) {
    for (const monsterElement of monsters) {
      monsterElement.p = 100;
    }
    total = monsters.length * 100;
  }

  const mdelta = Math.max(Math.round(teamPowerLevel / 4), 2);
  
  while (monsterLevel < teamPowerLevel) {
    const ml = monsters.map(a => ({ monster: a.monster, odds: a.p }));
    const m = weightedRandom(ml, total).monster;
    
    let count = 1;
    if (m.groups) {
      const totalGroup = m.groups.reduce((acc, item) => acc + item.odds, 0);
      const weightedGroup = weightedRandom(m.groups, totalGroup).quantity;
      count += weightedGroup;
    }
    
    for (let i = 0; i < count; i++) {
      monsterLevel += m.level;
      monsterArray.push(m);
      if (m.groups && count > 1 && monsterLevel >= teamPowerLevel) {
        break;
      }
    }
    monsterLevel += mdelta;
  }

  return monsterArray;
}

function getMonsterProbabilities(team: { level: number }[]): { monster: MonsterFiche; probability: number }[] {
  const greatestFighterLevel = Math.max(...team.map(d => d.level));
  
  const monsters = Object.values(monsterList)
    .map(m => ({
      monster: m,
      p: monsterLevelProba(greatestFighterLevel, m.odds, m.level)
    }))
    .filter(m => m.p > 0);

  const total = monsters.reduce((acc, m) => acc + m.p, 0);
  
  return monsters.map(m => ({
    monster: m.monster,
    probability: total > 0 ? (m.p / total) * 100 : 0
  }));
}

export default function DinozCalculator() {
  const [team, setTeam] = useState([{ level: 1 }]);
  const [targetComposition, setTargetComposition] = useState<Monster[]>([]);
  const [individualProbs, setIndividualProbs] = useState<{ monster: MonsterFiche; probability: number }[]>([]);
  const [compositionResults, setCompositionResults] = useState<Map<string, {
    count: number;
    avgGold: number;
    avgTotalXP: number;
    avgTeamXP: { level: number; avgXP: number }[];
  }>>(new Map());
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationIterations, setSimulationIterations] = useState(10000);
    const [selectedZone, setSelectedZone] = useState<MapZone>(MapZone.DINOLAND);

  const addDinoz = () => {
    if (team.length < 5) {
      setTeam([...team, { level: 1 }]);
    }
  };

  const removeDinoz = (index: number) => {
    if (team.length > 1) {
      const newTeam = team.filter((_, i) => i !== index);
      setTeam(newTeam);
    }
  };

  const updateDinozLevel = (index: number, level: number) => {
    const newTeam = [...team];
    newTeam[index].level = Math.max(1, Math.min(50, level));
    setTeam(newTeam);
  };

  const calculateIndividualProbabilities = useCallback(() => {
    const probs = getMonsterProbabilities(team);
    setIndividualProbs(probs);
  }, [team]);

  const runCompositionSimulation = async () => {
    setIsSimulating(true);
    setCompositionResults(new Map());
    
    // Simulation par chunks pour ne pas bloquer l'UI
    const chunkSize = 1000;
    const totalChunks = Math.ceil(simulationIterations / chunkSize);
    const allResults = new Map<string, {
      count: number;
      totalGold: number;
      totalXP: number;
      teamXPSums: { level: number; totalXP: number }[];
    }>();
    
    for (let chunk = 0; chunk < totalChunks; chunk++) {
      const chunkIterations = Math.min(chunkSize, simulationIterations - chunk * chunkSize);
      const chunkResults = simulateMonsterGeneration(team, chunkIterations, selectedZone);
      
      for (const [composition, data] of chunkResults) {
        if (!allResults.has(composition)) {
          allResults.set(composition, {
            count: 0,
            totalGold: 0,
            totalXP: 0,
            teamXPSums: team.map(d => ({ level: d.level, totalXP: 0 }))
          });
        }
        
        const entry = allResults.get(composition)!;
        entry.count += data.count;
        entry.totalGold += data.avgGold * data.count;
        entry.totalXP += data.avgTotalXP * data.count;
        
        data.avgTeamXP.forEach((xp, i) => {
          entry.teamXPSums[i].totalXP += xp.avgXP * data.count;
        });
      }
      
      // Petite pause pour laisser l'UI se rafraîchir
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    // Convertir en moyennes finales
    const finalResults = new Map<string, {
      count: number;
      avgGold: number;
      avgTotalXP: number;
      avgTeamXP: { level: number; avgXP: number }[];
    }>();
    
    for (const [composition, data] of allResults) {
      finalResults.set(composition, {
        count: data.count,
        avgGold: Math.round(data.totalGold / data.count),
        avgTotalXP: Math.round(data.totalXP / data.count),
        avgTeamXP: data.teamXPSums.map(xp => ({
          level: xp.level,
          avgXP: Math.round(xp.totalXP / data.count)
        }))
      });
    }
    
    setCompositionResults(finalResults);
    setIsSimulating(false);
  };

  const toggleMonsterInComposition = (monsterId: Monster) => {
    const newComposition = targetComposition.includes(monsterId)
      ? targetComposition.filter(id => id !== monsterId)
      : [...targetComposition, monsterId];
    setTargetComposition(newComposition);
  };

  const getTargetCompositionProbability = () => {
    if (targetComposition.length === 0 || compositionResults.size === 0) return 0;
    
    const targetKey = targetComposition.sort().join(',');
    const data = compositionResults.get(targetKey);
    const count = data?.count || 0;
    const total = Array.from(compositionResults.values()).reduce((sum, val) => sum + val.count, 0);
    return total > 0 ? (count / total) * 100 : 0;
  };

  const getTargetCompositionRewards = () => {
    if (targetComposition.length === 0 || compositionResults.size === 0) return null;
    
    const targetKey = targetComposition.sort().join(',');
    return compositionResults.get(targetKey) || null;
  };

  const teamPowerLevel = team.reduce((sum, dinoz) => sum + dinoz.level, 0);
  const diff = (team.length + 2) / (team.length * 2 + 1);
  const adjustedPowerLevel = Math.round(teamPowerLevel * diff);
  const averageLevel = teamPowerLevel / team.length;

  const sortedCompositions = Array.from(compositionResults.entries())
    .sort(([,a], [,b]) => b.count - a.count)
    .slice(0, 20); // Top 20 compositions les plus probables
    const totalResult = Array.from(compositionResults.values()).reduce((sum, val) => sum + val.count, 0)
    const averageGold = Array.from(compositionResults.values()).reduce((a,b) => a + (b.avgGold * b.count / totalResult), 0)
    const averageTotalXP = Array.from(compositionResults.values()).reduce((a,b) => a + (b.avgTotalXP * b.count / totalResult), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Calculateur de Probabilités Dinoz</h1>
          </div>

          {/* Configuration de l'équipe */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-700">Configuration de l'équipe</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              {team.map((dinoz, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-lg border">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dinoz {index + 1}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={dinoz.level}
                      onChange={(e) => updateDinozLevel(index, parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {team.length > 1 && (
                      <button
                        onClick={() => removeDinoz(index)}
                        className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              {team.length < 5 && (
                <button
                  onClick={addDinoz}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Ajouter un Dinoz
                </button>
              )}
              
              <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <div>Niveau total: {teamPowerLevel} | Niveau moyen: {averageLevel.toFixed(1)}</div>
                <div>Niveau ajusté: {adjustedPowerLevel} (facteur: {diff.toFixed(3)})</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={calculateIndividualProbabilities}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center gap-2"
            >
              <BarChart3 size={20} />
              Probabilités individuelles
            </button>

              <select
                  id="zoneSelect"
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value as MapZone)}
                  className="border rounded p-2"
              >
                  <option value="">-- Sélectionnez --</option>
                  {Object.values(MapZone).map((zone) => (
                      <option key={zone} value={zone}>
                          {zone}
                      </option>
                  ))}
              </select>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1000"
                max="100000"
                step="1000"
                value={simulationIterations}
                onChange={(e) => setSimulationIterations(parseInt(e.target.value) || 10000)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={runCompositionSimulation}
                disabled={isSimulating}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                <Zap size={20} />
                {isSimulating ? 'Simulation...' : 'Simuler compositions'}
              </button>
            </div>
          </div>
        </div>

        {/* Probabilités individuelles */}
        {individualProbs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Probabilités individuelles de sélection</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {individualProbs.map((result, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    targetComposition.includes(result.monster.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleMonsterInComposition(result.monster.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{result.monster.name}</h3>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Niv. {result.monster.level}</span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Probabilité</span>
                      <span>{result.probability.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(result.probability, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {result.monster.groups && (
                    <div className="text-xs text-gray-500">
                      Peut apparaître en groupe ({result.monster.groups.length} variantes)
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="text-blue-600 mt-0.5" size={16} />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Note sur les probabilités individuelles :</p>
                  <p>Ces pourcentages représentent la probabilité qu'un monstre soit <strong>sélectionné</strong> lors de chaque tirage, pas la probabilité finale d'apparition dans la composition. Un même monstre peut être tiré plusieurs fois selon le système de groupes et le niveau de puissance requis.</p>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* Gains globaux */}
          {compositionResults.size > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Gains moyens sur les {totalResult} tirages toutes composition confondues</h2>
                  <div className="bg-white border-t px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div className="text-center">
                              <div className="text-sm text-gray-600">Gold moyen</div>
                              <div className="text-lg font-bold text-yellow-600">
                                  {averageGold.toLocaleString()}
                              </div>
                          </div>

                          <div className="text-center">
                              <div className="text-sm text-gray-600">XP totale moyenne</div>
                              <div className="text-lg font-bold text-green-600">
                                  {averageTotalXP.toLocaleString()}
                              </div>
                          </div>

                          <div className="text-center">
                              <div className="text-sm text-gray-600">XP moyenne/Dinoz</div>
                              <div className="text-sm font-medium text-green-700">
                                  {Math.round(averageTotalXP / team.length).toLocaleString()}
                              </div>
                          </div>
                      </div>


                  </div>
              </div>
          )}
        {/* Résultats de simulation */}
        {compositionResults.size > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Compositions les plus probables</h2>
            
            {/* Composition ciblée */}
            {targetComposition.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="text-indigo-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Composition ciblée</h3>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {targetComposition.map(monsterId => {
                    const monster = monsterList[monsterId];
                    return (
                      <span key={monsterId} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                        {monster.name}
                      </span>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Probabilité</div>
                    <div className="text-xl font-bold text-indigo-700">
                      {getTargetCompositionProbability().toFixed(4)}%
                    </div>
                  </div>
                  
                  {getTargetCompositionRewards() && (
                    <>
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Gold moyen</div>
                        <div className="text-xl font-bold text-yellow-600">
                          {getTargetCompositionRewards()!.avgGold.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg">
                        <div className="text-sm text-gray-600">XP totale moyenne</div>
                        <div className="text-xl font-bold text-green-600">
                          {getTargetCompositionRewards()!.avgTotalXP.toLocaleString()}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {getTargetCompositionRewards() && (
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 mb-2">XP moyenne par Dinoz:</div>
                    <div className="flex flex-wrap gap-2">
                      {getTargetCompositionRewards()!.avgTeamXP.map((dinozXP, i) => (
                        <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Dinoz {i + 1} (Niv.{dinozXP.level}): {dinozXP.avgXP} XP
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-gray-600 mt-4">
                  Cliquez sur les monstres dans la section "Probabilités individuelles" pour créer votre composition ciblée
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3">
              {sortedCompositions.map(([composition, data], index) => {
                const total = Array.from(compositionResults.values()).reduce((sum, val) => sum + val.count, 0);
                const probability = (data.count / total) * 100;
                const monsters = composition.split(',').map(id => monsterList[id as Monster]);
                
                return (
                  <div key={composition} className="bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-500 w-8">#{index + 1}</span>
                        <div className="flex flex-wrap gap-2">
                          {monsters.map((monster, i) => (
                            <span key={i} className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
                              {monster.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">{probability.toFixed(3)}%</div>
                        <div className="text-sm text-gray-500">{data.count}/{total}</div>
                      </div>
                    </div>
                    
                    {/* Récompenses */}
                    <div className="bg-white border-t px-4 py-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-sm text-gray-600">Gold moyen</div>
                          <div className="text-lg font-bold text-yellow-600">
                            {data.avgGold.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600">XP totale moyenne</div>
                          <div className="text-lg font-bold text-green-600">
                            {data.avgTotalXP.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-sm text-gray-600">XP moyenne/Dinoz</div>
                          <div className="text-sm font-medium text-green-700">
                            {Math.round(data.avgTotalXP / team.length).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">XP détaillée par Dinoz:</div>
                        <div className="flex flex-wrap justify-center gap-1">
                          {data.avgTeamXP.map((dinozXP, i) => (
                            <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              D{i + 1} (Niv.{dinozXP.level}): {dinozXP.avgXP}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-sm text-gray-600 text-center">
              Simulation basée sur {simulationIterations.toLocaleString()} itérations - 
              {compositionResults.size} compositions uniques trouvées
            </div>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm text-yellow-800">
            <strong>Informations importantes :</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Les <strong>probabilités individuelles</strong> montrent la chance de sélection de chaque monstre lors d'un tirage</li>
              <li>La <strong>simulation de compositions</strong> génère des combats complets et calcule les probabilités réelles d'apparition</li>
              <li>Le système de groupes peut faire apparaître plusieurs instances du même monstre</li>
              <li>Plus d'itérations = résultats plus précis (mais calcul plus long)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}