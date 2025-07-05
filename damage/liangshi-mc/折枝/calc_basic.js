import { mainAttrData, RankingKey, CalcMeasure } from '../index.js'
import { AllCalc } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "折枝"
export const buffs = CalcBuff
export const defDmgKey = RankingKey(CharacterName)
export const details = CalcMeasure(CharacterName, AllCalc)
export const mainAttr = mainAttrData[CharacterName]