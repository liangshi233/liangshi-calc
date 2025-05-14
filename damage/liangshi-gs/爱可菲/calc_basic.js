import { mainAttrData, RankingKey, CalcMeasure } from '../index.js'
import { AllCalc } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

//默认打冻结，携带冰风4但不想打冻结的可以将FreezeDetermine改为false

let CharacterName = "爱可菲"
export const buffs = CalcBuff
export const details = CalcMeasure(CharacterName, AllCalc)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { FreezeDetermine: true, ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 80, FontaineTeammate: true, PrimordialDetermine: "ousia" }