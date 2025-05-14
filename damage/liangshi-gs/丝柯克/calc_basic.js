import { mainAttrData, RankingKey, CalcMeasure } from '../index.js'
import { AllCalc } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'

//默认打冻结，携带冰风4但不想打冻结的可以将FreezeDetermine改为false, 技能等级提高效果需手动提高，后续会在符合条件的条目自动提高(仅在技能等级小于15级时提高,显示的仍为提高前等级)

let CharacterName = "丝柯克"
export const buffs = CalcBuff
export const details = CalcMeasure(CharacterName, AllCalc)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { EnergyDetermine: 0, FreezeDetermine: true, IceAttachment: true, ElementSame: 1, ElementIceTeam: 1 }