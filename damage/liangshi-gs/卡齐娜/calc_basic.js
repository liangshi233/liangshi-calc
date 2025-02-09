import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "卡齐娜"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { CrystallizeNumber: 5, HealDetermine: false, ElementSame: 1, ElementRockTeam: 1, EnemiesNumber: 4, RockDmg: 3, NatlanTeammate: 1, PrimordialDetermine: false, BondOfLifeDetermine: false, NightsoulUse: true, TruceChangeHp: false }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}搭乘伤害`,
  dmgKey: 'a',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转搭乘伤害'] / 100, 'e,nightsoul')
},
{
  title: `${TalentName.eName}独立伤害`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.e['冲天转转独立伤害'] / 100, 'e,nightsoul')
},
{
  title: `${TalentName.qName}伤害`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.def) * talent.q['技能伤害'] / 100, 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: '护盾替换摧毁伤害',
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.def) * 200 / 100, '')
}]
