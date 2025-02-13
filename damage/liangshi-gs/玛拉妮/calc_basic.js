import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "玛拉妮"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementWaterTeam: 1, NatlanTeammate: 1, Nightsoul: true }
export const buffs = CalcBuff
export const details = [
{
  title: '鲨鲨撕咬基础伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul')
},
{
  title: '鲨鲨撕咬基础蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul', 'vaporize')
},
{
  title: '鲨鲨撕咬一层伤害',
  params: { Wave_Momentum: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul')
},
{
  title: '鲨鲨撕咬二层伤害',
  params: { Wave_Momentum: 2 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['鲨鲨撕咬基础伤害'] / 100, 'a,nightsoul')
},
{
  title: '巨浪鲨鲨撕咬伤害',
  params: { Wave_Momentum: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * ( talent.e['鲨鲨撕咬基础伤害'] + talent.e['巨浪鲨鲨撕咬伤害额外提升'] ) / 100, 'a,nightsoul')
},
{
  title: '巨浪鲨鲨撕咬蒸发',
  params: { Wave_Momentum: 3 },
  dmgKey: 'a',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * ( talent.e['鲨鲨撕咬基础伤害'] + talent.e['巨浪鲨鲨撕咬伤害额外提升'] ) / 100, 'a,nightsoul', 'vaporize')
},
{
  check: ({ cons }) => cons >= 1,
  title: '1命首次巨浪鲨鲨撕咬蒸发',
  params: { first: true , Wave_Momentum: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * ( talent.e['鲨鲨撕咬基础伤害'] + talent.e['巨浪鲨鲨撕咬伤害额外提升'] ) / 100, 'a,nightsoul', 'vaporize')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q,nightsoul')
},
{
  title: `${TalentName.qName}蒸发`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q,nightsoul', 'vaporize')
}]
