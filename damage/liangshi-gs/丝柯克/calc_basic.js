import { mainAttrData, RankingKey } from '../index.js'
import { AllCalc, CalcMeasure } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "丝柯克"
export const buffs = CalcBuff
export const defDmgKey = RankingKey(CharacterName)
export const defParams = { EnergyDetermine: 0, FreezeDetermine: true, IceAttachment: true, ElementSame: 1, ElementIceTeam: 1 }
export const details = CalcMeasure
export const mainAttr = mainAttrData[CharacterName]
