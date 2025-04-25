import { LSconfig } from '#liangshi'
import { mainAttrData, RankingKey } from '../index.js'
import { CalcMeasure } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "阿蕾奇诺"
let cfg = LSconfig.getConfig('user', 'config')
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
export const buffs = CalcBuff
export const details = CalcMeasure
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}`, ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 60, HealDetermine: true }