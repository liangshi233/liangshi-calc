import { LSconfig } from '#liangshi'
import { mainAttrData, RankingKey, CalcMeasure } from '../index.js'
import { AllCalc } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

// 默认打燃烧，不想打燃烧可以将BurningDetermine设置为false

let CharacterName = "艾梅莉埃"
let cfg = LSconfig.getConfig('user', 'config')
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
export const buffs = CalcBuff
export const details = CalcMeasure(CharacterName, AllCalc)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}`, BurningDetermine: true, ElementSame: 1, ElementGrassTeam: 1, FontaineTeammate: 1, PrimordialDetermine: "pneuma", EnergyTeammate: 50 }