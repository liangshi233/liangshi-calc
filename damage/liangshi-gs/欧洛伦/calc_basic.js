import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "欧洛伦"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ShieldDetermine: false, HealDetermine: false, ElementSame: 1, ElementMineTeam: 1, NatlanTeammate: 1, PrimordialDetermine: false, BondOfLifeDetermine: false, Nightsoul: true, TruceChangeHp: false }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}弹跳对单`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['宿灵球伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.eName}弹跳激化`,
  dmg: ({ talent }, dmg) => dmg(talent.e['宿灵球伤害'], 'e,nightsoul', 'aggravate')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}释放激化`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['施放伤害'], 'q,nightsoul', 'aggravate')
},
{
  title: `${TalentName.qName}音波碰撞伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}音波碰撞激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul', 'aggravate')
},
{
  title: `${TalentName.tName}附加伤害`,
  params: { Hypersense_effect: true, ElementDmg: 2 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 180 / 100, 'nightsoul')
},
{
  title: '感电反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('electroCharged')
}]
