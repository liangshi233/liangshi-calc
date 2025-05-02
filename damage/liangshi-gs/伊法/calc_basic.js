import { mainAttrData, RankingKey } from '../index.js'
import { CalcMeasure } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "伊法"
export const buffs = CalcBuff
export const details = CalcMeasure
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, NatlanTeammate: 1, ElementWindTeam: 1, EnergyTeammate: 60, HealDetermine: true, Nightsoul: true, TruceChangeHp: true, SkillsHit: 0, SkillsDmg: 0 }
