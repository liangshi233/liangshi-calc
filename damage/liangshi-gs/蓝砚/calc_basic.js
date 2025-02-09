import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "蓝砚"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ShieldTime: 5, ShieldDetermine: true, HealDetermine: false, ElementSame: 1, ElementWindTeam: 1, LiyueTeammate: 1, BondOfLifeDetermine: false, Nightsoul: false, TruceChangeHp: false }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}翦月环伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['翦月环伤害'], 'e')
},
{
  title: `${TalentName.eName}护盾量`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.atk) / 100 + talent.e['护盾吸收量2'][1] * 1)
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { EnergyDetermine: 0 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害2'][0], 'q')
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]
