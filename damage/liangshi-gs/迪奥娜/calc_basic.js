import { mainAttrData, RankingKey, CalcMeasure, ParamsData, CalcBy } from '../index.js'
import { AllCalc } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "迪奥娜"
export const buffs = CalcBuff
export const defDmgKey = RankingKey(CharacterName)
export const defParams = ParamsData(CharacterName)
export const details = CalcMeasure(CharacterName, AllCalc)
export const mainAttr = mainAttrData[CharacterName]
export const createdBy = CalcBy(CharacterName)