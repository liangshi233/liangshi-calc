import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "玛薇卡"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ShieldDetermine: false, HealDetermine: false, PrimordialDetermine: false, ElementSame: 1, ElementFireTeam: 1, BondOfLifeDetermine: false, Nightsoul: true, TruceChangeHp: false, NatlanTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `满战意${TalentName.eName}持续伤害`,
  dmgKey: 'e',
  params: { Fighting_Spirit: 200, SkillsAfter: 2, EnergyDetermine: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['焚曜之环伤害'], 'e,nightsoul')
},
{
  title: `无战意${TalentName.eNameT}后一段攻击`,
  params: { Fighting_Spirit: 0, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击一段伤害'], 'a,nightsoul')
},
{
  title: `满战意${TalentName.eNameT}后一段攻击`,
  params: { Fighting_Spirit: 200, EnergyDetermine: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击一段伤害'], 'a,nightsoul')
},
{
  title: `无战意${TalentName.eNameT}后尾段攻击`,
  params: { Fighting_Spirit: 0, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击五段伤害'], 'a,nightsoul')
},
{
  title: `满战意${TalentName.eNameT}后尾段攻击`,
  dmgKey: 'a',
  params: { Fighting_Spirit: 200, EnergyDetermine: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击五段伤害'], 'a,nightsoul')
},
{
  title: `满战意${TalentName.eNameT}后${TalentName.a2Name}循环伤害`,
  dmgKey: 'z',
  params: { Fighting_Spirit: 200, EnergyDetermine: 200 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车重击循环伤害'], 'a2,nightsoul')
},
{
  title: `半战意${TalentName.qName}释放伤害`,
  params: { Fighting_Spirit: 100, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `满战意${TalentName.qName}释放伤害`,
  params: { Fighting_Spirit: 200, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `满战意${TalentName.qName}释放融化`,
  dmgKey: 'q',
  params: { Fighting_Spirit: 200, EnergyDetermine: 0, IceAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'melt')
}]
