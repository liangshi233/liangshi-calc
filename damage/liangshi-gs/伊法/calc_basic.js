import { mainAttrData, RankingKey, CalcMeasure } from '../index.js'
import { CalcBuff } from './CalcBuff.js'
import { AllCalc } from './CalcData.js'

let CharacterName = "伊法"
export const buffs = CalcBuff
export const details = CalcMeasure(CharacterName, AllCalc)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, NatlanTeammate: 1, ElementWindTeam: 1, EnergyTeammate: 60, HealDetermine: true, Nightsoul: true, TruceChangeHp: true, SkillsHit: 0, SkillsDmg: 0 }
