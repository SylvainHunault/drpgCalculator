import { useState, useMemo } from 'react';
import { Calculator, Map as MapIcon, Settings2, Info, ChevronDown, ChevronUp, X } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

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

// ============================================================
// Fonctions de calcul (exactes du code original, paramétrées)
// ============================================================

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

function rewardFight(
  team: { level: number }[],
  monsters: MonsterFiche[],
  baseGold: number,
  randomGoldMax: number
): {
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
    gold += (getRandomNumber(0, randomGoldMax) + baseGold) * 10;
    teamXP.push({ level: d.level, xp: xp });
  }

  const goldMultiplier = 1.29;
  // Malus based on size of team starting size 2
  let teamSizeMalus = 1;
  for (let i = 2; i <= team.length; i++) {
    teamSizeMalus -= 0.5 * Math.pow(0.1, i - 2);
  }
  const malus = fgold >= 1 ? fgold * teamSizeMalus : fgold;
  gold = Math.round(gold * goldMultiplier * goldFactor * malus);

  return { gold, totalWinXP, teamXP };
}

function generateMonsterList(
  team: { level: number }[],
  place: MapZone,
  monsterListData: Readonly<Record<Monster, MonsterFiche>>
): MonsterFiche[] {
  let teamPowerLevel = 0;
  let greatestFighterLevel = 0;

  for (const dinoz of team) {
    teamPowerLevel += dinoz.level;
    if (dinoz.level > greatestFighterLevel) greatestFighterLevel = dinoz.level;
  }

  const diff = (team.length + 2) / (team.length * 2 + 1);
  teamPowerLevel = Math.round(teamPowerLevel * diff);

  const monsters = Object.values(monsterListData)
    .filter(m => m.zones.includes(place))
    .map(m => ({
      monster: m,
      p: monsterLevelProba(greatestFighterLevel, m.odds, m.level)
    }))
    .filter(m => m.p > 0);

  const monsterArray: MonsterFiche[] = [];
  let total = monsters.reduce((acc, m) => acc + m.p, 0);

  if (total === 0) {
    for (const monsterElement of monsters) {
      monsterElement.p = 100;
    }
    total = monsters.length * 100;
  }

  if (monsters.length === 0) {
    return monsterArray;
  }

  const mdelta = Math.max(Math.round(teamPowerLevel / 4), 2);
  let monsterLevel = 0;

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

// Simulation légère : uniquement les moyennes (gold/xp), pour le tracé des courbes
function simulateAverages(
  team: { level: number }[],
  iterations: number,
  place: MapZone,
  monsterListData: Readonly<Record<Monster, MonsterFiche>>,
  baseGold: number,
  randomGoldMax: number
): { avgGoldPerDinoz: number; avgXpPerDinoz: number } {
  let totalGold = 0;
  let totalXP = 0;

  for (let i = 0; i < iterations; i++) {
    const monsters = generateMonsterList(team, place, monsterListData);
    const rewards = rewardFight(team, monsters, baseGold, randomGoldMax);
    totalGold += rewards.gold;
    totalXP += rewards.totalWinXP;
  }

  return {
    avgGoldPerDinoz: totalGold / iterations / team.length,
    avgXpPerDinoz: totalXP / iterations / team.length
  };
}

// Simulation complète avec détail des compositions (pour le panneau "clic sur un point")
function simulateMonsterGeneration(
  team: { level: number }[],
  iterations: number,
  place: MapZone,
  monsterListData: Readonly<Record<Monster, MonsterFiche>>,
  baseGold: number,
  randomGoldMax: number
): Map<string, {
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
    const monsters = generateMonsterList(team, place, monsterListData);
    const composition = monsters.map(m => m.id).sort().join(',') || '(aucun monstre)';
    const rewards = rewardFight(team, monsters, baseGold, randomGoldMax);

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

// ============================================================
// Configuration UI
// ============================================================

const ALL_ZONES = Object.values(MapZone) as MapZone[];

const ZONE_LABELS: Record<string, string> = {
  [MapZone.DINOLAND]: 'Dinoland',
  [MapZone.DINOWEST]: 'Dinoland Ouest',
  [MapZone.JUNGLE]: 'Jungle',
  [MapZone.ILES]: 'Îles',
  [MapZone.GTOUTCHAUD]: 'Grand Tout Chaud',
  [MapZone.STEPPE]: 'Steppes',
  [MapZone.DARKWORLD]: 'DarkWorld'
};

const GROUP_SIZES = [1, 2, 3, 4, 5, 6];

const GROUP_COLORS: Record<number, string> = {
  1: '#6366f1',
  2: '#22c55e',
  3: '#f59e0b',
  4: '#ef4444',
  5: '#06b6d4',
  6: '#a855f7'
};

type MonsterOverride = { level: number; xp: number; xpBonus: number; odds: number };

function buildInitialOverrides(): Record<string, MonsterOverride> {
  const result: Record<string, MonsterOverride> = {};
  (Object.keys(monsterList) as Monster[]).forEach(id => {
    const m = monsterList[id];
    result[id] = { level: m.level, xp: m.xp ?? 10, xpBonus: m.xpBonus ?? 0, odds: m.odds };
  });
  return result;
}

function applyOverrides(overrides: Record<string, MonsterOverride>): Record<Monster, MonsterFiche> {
  const result = {} as Record<Monster, MonsterFiche>;
  (Object.keys(monsterList) as Monster[]).forEach(id => {
    const base = monsterList[id];
    const o = overrides[id];
    result[id] = { ...base, level: o.level, xp: o.xp, xpBonus: o.xpBonus, odds: o.odds };
  });
  return result;
}

type PlotPoint = { level: number } & Record<string, number>;

export default function DinozCalculator() {
  const [selectedZones, setSelectedZones] = useState<MapZone[]>([MapZone.DINOLAND]);
  const [selectedGroupSizes, setSelectedGroupSizes] = useState<number[]>([1]);
  const [iterations, setIterations] = useState(500);

  const [monsterOverrides, setMonsterOverrides] = useState<Record<string, MonsterOverride>>(buildInitialOverrides());
  const [baseGold, setBaseGold] = useState(43);
  const [randomGoldMax, setRandomGoldMax] = useState(36);
  const [showMonsterParams, setShowMonsterParams] = useState(false);

  const [displayMetric, setDisplayMetric] = useState<'xp' | 'gold'>('xp');

  const [plotData, setPlotData] = useState<Record<string, PlotPoint[]>>({});
  const [calculatedZones, setCalculatedZones] = useState<MapZone[]>([]);
  const [calculatedGroupSizes, setCalculatedGroupSizes] = useState<number[]>([]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [progress, setProgress] = useState(0);

  const [selectedPoint, setSelectedPoint] = useState<{ zone: MapZone; groupSize: number; level: number } | null>(null);
  const [pointResults, setPointResults] = useState<Map<string, {
    count: number;
    avgGold: number;
    avgTotalXP: number;
    avgTeamXP: { level: number; avgXP: number }[];
  }> | null>(null);
  const [isSimulatingPoint, setIsSimulatingPoint] = useState(false);

  const effectiveMonsterList = useMemo(() => applyOverrides(monsterOverrides), [monsterOverrides]);

  const toggleZone = (zone: MapZone) => {
    setSelectedZones(prev =>
      prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
    );
  };

  const toggleGroupSize = (size: number) => {
    setSelectedGroupSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size].sort((a, b) => a - b)
    );
  };

  const selectAllGroupSizes = () => setSelectedGroupSizes([...GROUP_SIZES]);

  const updateMonsterOverride = (id: string, field: keyof MonsterOverride, value: number) => {
    setMonsterOverrides(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const runCalculation = async () => {
    if (selectedZones.length === 0 || selectedGroupSizes.length === 0 || isCalculating) return;

    setIsCalculating(true);
    setProgress(0);
    setSelectedPoint(null);
    setPointResults(null);

    const zones = [...selectedZones];
    const sizes = [...selectedGroupSizes];
    const monsterListData = effectiveMonsterList;
    const bGold = baseGold;
    const rGoldMax = randomGoldMax;
    const iters = Math.max(1, iterations);

    const newPlotData: Record<string, PlotPoint[]> = {};
    for (const zone of zones) {
      newPlotData[zone] = Array.from({ length: 50 }, (_, i) => ({ level: i + 1 }));
    }

    const totalCombos = zones.length * sizes.length * 50;
    let done = 0;

    for (const zone of zones) {
      for (const size of sizes) {
        for (let level = 1; level <= 50; level++) {
          const team = Array.from({ length: size }, () => ({ level }));
          const { avgGoldPerDinoz, avgXpPerDinoz } = simulateAverages(
            team, iters, zone, monsterListData, bGold, rGoldMax
          );
          const point = newPlotData[zone][level - 1];
          point[`g${size}_gold`] = Math.round(avgGoldPerDinoz);
          point[`g${size}_xp`] = Math.round(avgXpPerDinoz);

          done++;
          if (done % 4 === 0 || done === totalCombos) {
            setProgress(Math.round((done / totalCombos) * 100));
            await new Promise(resolve => setTimeout(resolve, 0));
          }
        }
      }
    }

    setPlotData(newPlotData);
    setCalculatedZones(zones);
    setCalculatedGroupSizes(sizes);
    setIsCalculating(false);
  };

  const handlePointClick = async (zone: MapZone, groupSize: number, level: number) => {
    setSelectedPoint({ zone, groupSize, level });
    setIsSimulatingPoint(true);
    setPointResults(null);

    const team = Array.from({ length: groupSize }, () => ({ level }));
    const iters = Math.max(1, iterations);
    const chunkSize = 1000;
    const totalChunks = Math.ceil(iters / chunkSize);
    const monsterListData = effectiveMonsterList;
    const bGold = baseGold;
    const rGoldMax = randomGoldMax;

    const allResults = new Map<string, {
      count: number;
      totalGold: number;
      totalXP: number;
      teamXPSums: { level: number; totalXP: number }[];
    }>();

    for (let chunk = 0; chunk < totalChunks; chunk++) {
      const chunkIterations = Math.min(chunkSize, iters - chunk * chunkSize);
      const chunkResults = simulateMonsterGeneration(team, chunkIterations, zone, monsterListData, bGold, rGoldMax);

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
      await new Promise(resolve => setTimeout(resolve, 0));
    }

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

    setPointResults(finalResults);
    setIsSimulatingPoint(false);
  };

  const sortedPointCompositions = pointResults
    ? Array.from(pointResults.entries()).sort(([, a], [, b]) => b.count - a.count).slice(0, 15)
    : [];
  const pointTotal = pointResults
    ? Array.from(pointResults.values()).reduce((sum, v) => sum + v.count, 0)
    : 0;
  const pointAvgGold = pointResults && pointTotal > 0
    ? Array.from(pointResults.values()).reduce((a, b) => a + (b.avgGold * b.count) / pointTotal, 0)
    : 0;
  const pointAvgXP = pointResults && pointTotal > 0
    ? Array.from(pointResults.values()).reduce((a, b) => a + (b.avgTotalXP * b.count) / pointTotal, 0)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-indigo-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Calculateur de Gains Dinoz</h1>
          </div>

          {/* Zones */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapIcon className="text-blue-600" size={22} />
              <h2 className="text-xl font-semibold text-gray-700">Zones</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ALL_ZONES.map(zone => (
                <label
                  key={zone}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedZones.includes(zone)
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-800'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-indigo-600"
                    checked={selectedZones.includes(zone)}
                    onChange={() => toggleZone(zone)}
                  />
                  <span className="text-sm font-medium">{ZONE_LABELS[zone] ?? zone}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tailles de groupe */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Tailles de groupe</h2>
              <button
                onClick={selectAllGroupSizes}
                className="text-sm px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-medium"
              >
                Tout sélectionner
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {GROUP_SIZES.map(size => (
                <label
                  key={size}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    selectedGroupSizes.includes(size)
                      ? 'border-2'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  style={selectedGroupSizes.includes(size) ? {
                    backgroundColor: `${GROUP_COLORS[size]}1a`,
                    borderColor: GROUP_COLORS[size],
                    color: GROUP_COLORS[size]
                  } : undefined}
                >
                  <input
                    type="checkbox"
                    checked={selectedGroupSizes.includes(size)}
                    onChange={() => toggleGroupSize(size)}
                  />
                  <span className="text-sm font-medium">{size} Dinoz</span>
                </label>
              ))}
            </div>
          </div>

          {/* Itérations + calcul */}
          <div className="flex flex-wrap items-end gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Itérations par point (niveau × taille × zone)
              </label>
              <input
                type="number"
                min={1}
                value={iterations}
                onChange={(e) => setIterations(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              onClick={runCalculation}
              disabled={isCalculating || selectedZones.length === 0 || selectedGroupSizes.length === 0}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCalculating ? `Calcul en cours… ${progress}%` : 'Calculer'}
            </button>

            {isCalculating && (
              <div className="flex-1 min-w-[160px] h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Nombre total de combats simulés : {(selectedZones.length * selectedGroupSizes.length * 50 * Math.max(1, iterations)).toLocaleString()}.
            Un nombre élevé de zones/tailles/itérations augmente le temps de calcul.
          </p>
        </div>

        {/* Paramètres des monstres et de l'or */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <button
            onClick={() => setShowMonsterParams(prev => !prev)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <Settings2 className="text-gray-600" size={22} />
              <h2 className="text-xl font-semibold text-gray-700">Paramètres des monstres et de l'or</h2>
            </div>
            {showMonsterParams ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showMonsterParams && (
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or de base</label>
                  <input
                    type="number"
                    value={baseGold}
                    onChange={(e) => setBaseGold(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or aléatoire (max)</label>
                  <input
                    type="number"
                    value={randomGoldMax}
                    onChange={(e) => setRandomGoldMax(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto max-h-96 overflow-y-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Monstre</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Zones</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Niveau</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">XP</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Bonus XP</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Odds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Object.keys(monsterList) as Monster[]).map(id => {
                      const m = monsterList[id];
                      const o = monsterOverrides[id];
                      return (
                        <tr key={id} className="border-t">
                          <td className="px-3 py-1.5 text-gray-800 font-medium">{m.name}</td>
                          <td className="px-3 py-1.5 text-gray-500 text-xs">
                            {m.zones.map(z => ZONE_LABELS[z] ?? z).join(', ') || '—'}
                          </td>
                          <td className="px-3 py-1.5">
                            <input
                              type="number"
                              value={o.level}
                              onChange={(e) => updateMonsterOverride(id, 'level', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-1.5">
                            <input
                              type="number"
                              value={o.xp}
                              onChange={(e) => updateMonsterOverride(id, 'xp', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-1.5">
                            <input
                              type="number"
                              value={o.xpBonus}
                              onChange={(e) => updateMonsterOverride(id, 'xpBonus', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                            />
                          </td>
                          <td className="px-3 py-1.5">
                            <input
                              type="number"
                              value={o.odds}
                              onChange={(e) => updateMonsterOverride(id, 'odds', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sélecteur de métrique + graphiques */}
        {calculatedZones.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-2xl font-bold text-gray-800">Gains moyens par Dinoz, par niveau</h2>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="metric"
                    checked={displayMetric === 'xp'}
                    onChange={() => setDisplayMetric('xp')}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm font-medium text-gray-700">XP</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="metric"
                    checked={displayMetric === 'gold'}
                    onChange={() => setDisplayMetric('gold')}
                    className="accent-indigo-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Or</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {calculatedZones.map(zone => (
                <div key={zone} className="border rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">{ZONE_LABELS[zone] ?? zone}</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={plotData[zone]} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="level"
                        label={{ value: 'Niveau moyen du groupe', position: 'insideBottom', offset: -5 }}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        label={{ value: displayMetric === 'xp' ? 'XP / Dinoz' : 'Or / Dinoz', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Legend />
                      {calculatedGroupSizes.map(size => (
                        <Line
                          key={size}
                          type="monotone"
                          dataKey={`g${size}_${displayMetric}`}
                          name={`${size} Dinoz`}
                          stroke={GROUP_COLORS[size]}
                          strokeWidth={2}
                          dot={(dotProps: any) => {
                            const { cx, cy, payload, index } = dotProps;
                            return (
                              <circle
                                key={`dot-${zone}-${size}-${index}`}
                                cx={cx}
                                cy={cy}
                                r={3.5}
                                fill={GROUP_COLORS[size]}
                                stroke="#fff"
                                strokeWidth={1}
                                style={{ cursor: 'pointer' }}
                                onClick={() => handlePointClick(zone, size, payload.level)}
                              />
                            );
                          }}
                          activeDot={{ r: 6 }}
                          isAnimationActive={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Cliquez sur un point pour lancer une simulation détaillée des compositions à ce niveau.
            </p>
          </div>
        )}

        {/* Détail du point cliqué */}
        {selectedPoint && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Détail — {ZONE_LABELS[selectedPoint.zone] ?? selectedPoint.zone}, {selectedPoint.groupSize} Dinoz, niveau {selectedPoint.level}
              </h2>
              <button
                onClick={() => { setSelectedPoint(null); setPointResults(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>
            </div>

            {isSimulatingPoint && (
              <div className="text-center text-gray-500 py-8">Simulation en cours…</div>
            )}

            {!isSimulatingPoint && pointResults && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Or moyen (équipe)</div>
                    <div className="text-xl font-bold text-yellow-600">{Math.round(pointAvgGold).toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">XP totale moyenne (équipe)</div>
                    <div className="text-xl font-bold text-green-600">{Math.round(pointAvgXP).toLocaleString()}</div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-3">Compositions les plus probables</h3>
                <div className="grid grid-cols-1 gap-3">
                  {sortedPointCompositions.map(([composition, data], index) => {
                    const probability = pointTotal > 0 ? (data.count / pointTotal) * 100 : 0;
                    const monsterNames = composition === '(aucun monstre)'
                      ? ['Aucun monstre']
                      : composition.split(',').map(id => monsterList[id as Monster]?.name ?? id);

                    return (
                      <div key={composition} className="bg-gray-50 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-gray-500 w-8">#{index + 1}</span>
                            <div className="flex flex-wrap gap-2">
                              {monsterNames.map((name, i) => (
                                <span key={i} className="bg-white px-3 py-1 rounded-full text-sm font-medium border">
                                  {name}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-800">{probability.toFixed(3)}%</div>
                            <div className="text-sm text-gray-500">{data.count}/{pointTotal}</div>
                          </div>
                        </div>
                        <div className="bg-white border-t px-4 py-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-sm text-gray-600">Or moyen</div>
                            <div className="text-lg font-bold text-yellow-600">{data.avgGold.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-600">XP totale moyenne</div>
                            <div className="text-lg font-bold text-green-600">{data.avgTotalXP.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-sm text-yellow-800">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 flex-shrink-0" size={16} />
              <ul className="list-disc list-inside space-y-1">
                <li>Pour chaque zone, taille de groupe et niveau, tous les Dinoz du groupe sont au même niveau (= niveau moyen).</li>
                <li>Les graphiques affichent les gains <strong>moyens par Dinoz</strong> sur le nombre d'itérations choisi.</li>
                <li>Un clic sur un point relance une simulation détaillée des compositions pour ce point précis.</li>
                <li>Les paramètres de monstres et d'or sont modifiables et s'appliquent immédiatement au prochain calcul.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
