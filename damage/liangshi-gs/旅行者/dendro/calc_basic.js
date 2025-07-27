import LSconfig from '../../../../../../plugins/liangshi-calc/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "旅行者/dendro"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementGrassTeam: 1, EnergyTeammate: 80 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}激化`,
  params: { GrassAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { Overflowing_Lotuslight: 10, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q')
},
{
  title: `${TalentName.qName}单段激化`,
  dmgKey: 'q',
  params: { GrassAttachment: true, Overflowing_Lotuslight: 10, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q', 'spread')
},
{
  title: `${TalentName.qName}爆发伤害`,
  params: { Overflowing_Lotuslight: 10, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['激烈爆发伤害'], 'q')
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
  params: { Overflowing_Lotuslight: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}激化`,
  params: { GrassAttachment: true, Overflowing_Lotuslight: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  title: '草原核伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('bloom')
}]
