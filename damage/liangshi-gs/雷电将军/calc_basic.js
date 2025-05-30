import { mainAttrData, RankingKey, CalcMeasure, ParamsData } from '../index.js'
import { AllCalc } from './CalcData.js'
import { CalcBuff } from './CalcBuff.js'
import { dirname, basename } from 'path'
import { fileURLToPath } from 'url'

let CharacterName = basename(dirname(fileURLToPath(import.meta.url)))
export const buffs = CalcBuff
export const defDmgKey = RankingKey(CharacterName)
export const defParams = ParamsData(CharacterName)
export const details = CalcMeasure(CharacterName, AllCalc)
export const mainAttr = mainAttrData[CharacterName]