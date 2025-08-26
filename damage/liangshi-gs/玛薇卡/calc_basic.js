import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "玛薇卡"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, Nightsoul: true, NatlanTeammate: 1, EnergyTeammate: 0 }
export const buffs = CalcBuff
export const details = [
{
  title: `满战意${TalentName.eName}持续伤害`, //每秒消耗约3夜魂值，攻击额外消耗约5夜魂值
  dmgKey: 'e',
  params: { Fighting_Spirit: 200, SkillsAfter: 2, EnergyDetermine: 0, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, ChangeNightsou: 4, NightsoulUse: 11 },
  dmg: ({ talent }, dmg) => dmg(talent.e['焚曜之环伤害'], 'e,nightsoul')
},
{
  title: `无战意${TalentName.eNameT}后一段攻击`, //每秒消耗约9夜魂值，普通攻击额外消耗约1夜魂值，重击每秒额外消耗约2夜魂值
  params: { Fighting_Spirit: 0, EnergyDetermine: 0, SkillsUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击一段伤害'], 'a,nightsoul')
},
{
  title: `满战意${TalentName.eNameT}后一段攻击`,
  params: { Fighting_Spirit: 200, EnergyDetermine: 0, SkillsUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击一段伤害'], 'a,nightsoul')
},
{
  title: `无战意${TalentName.eNameT}后尾段攻击`,
  params: { Fighting_Spirit: 0, EnergyDetermine: 0, SkillsUse: 1, NormalUse: 5, NormalHit: 5, NormalDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击五段伤害'], 'a,nightsoul')
},
{
  title: `满战意${TalentName.eNameT}后尾段攻击`,
  dmgKey: 'a',
  params: { Fighting_Spirit: 200, EnergyDetermine: 0, SkillsUse: 1, NormalUse: 5, NormalHit: 5, NormalDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车普通攻击五段伤害'], 'a,nightsoul')
},
{
  title: `满战意${TalentName.eNameT}后${TalentName.a2Name}循环伤害`,
  dmgKey: 'z',
  params: { Fighting_Spirit: 200, EnergyDetermine: 0, SkillsUse: 1, ChargedUse: 1, ChargedHit: 3, ChargedDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['驰轮车重击循环伤害'], 'a2,nightsoul')
},
{
  title: `半战意${TalentName.qName}释放伤害`,
  params: { Fighting_Spirit: 100, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `满战意${TalentName.qName}释放伤害`,
  params: { Fighting_Spirit: 200, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `满战意${TalentName.qName}释放融化`,
  dmgKey: 'q',
  params: { Fighting_Spirit: 200, EnergyDetermine: 0, IceAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'melt')
},
{
  title: `玛希班茜 满战意${TalentName.qName}融化`,
  dmgKey: 'q',
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, FightTime: 2, Fighting_Spirit: 200, EnergyDetermine: 0, IceAttachment: true, team: true, Xilonen: true, Bennett: true, Citlali: true, ElementDifferent: 2, ElementSame: 2, ElementRockTeam: 1, ElementIceTeam: 1, ElementFireTeam: 2, ShieldTime: 10, NatlanTeammate: 3, EnergyTeammate: 180,/* 玛薇卡的战意不会被视为元素能量被恶王丸与断浪长鳍计入 */ParticulateNumber: 0,/* 玛薇卡无法获取元素能量，获取能量晶球与微粒时无法触发获得能量晶球或微粒状态，获取战意不会被视为获取元素能量 */NightsoulUse: 234, HealNumber: 1, ChangeNightsou: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'melt')
}]