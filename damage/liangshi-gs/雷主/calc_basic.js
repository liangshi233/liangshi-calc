import { Format, LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "旅行者/electro"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 80 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}激化`,
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'aggravate')
},
{
  title: `${TalentName.eName}元素充能提升`,
  dmgKey: 'f',
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, SkillsAfter: 0.2 },
  dmg: ({ attr, calc }) => {
    return {
      avg: Format.percent((calc(attr.recharge) * 10 / 100 + 20) / 100),
      type: 'text'
    }
  }
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}释放激化`,
  params: { GrassAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  title: `${TalentName.qName}落雷伤害`,
  params: { Lightning_Shroud: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qName}强化落雷`,
  params: { Lightning_Shroud: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'] * 200 / 100, 'q')
},
{
  title: `${TalentName.qName}落雷激化`,
  dmgKey: 'q',
  params: { GrassAttachment: true, Lightning_Shroud: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q', 'aggravate')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qName}强化落雷激化`,
  params: { GrassAttachment: true, Lightning_Shroud: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'] * 200 / 100, 'q', 'aggravate')
}]