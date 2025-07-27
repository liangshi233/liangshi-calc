import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "久岐忍"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementMineTeam: 1, EnergyTeammate: 60, OwnHp: 25, HealDetermine: true, HealTeamDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}释放伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}每跳伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, HealNumber: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['越祓草轮伤害'], 'e')
},
{
  title: `${TalentName.eName}每跳激化`,
  params: { GrassAttachment: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, HealNumber: 3 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['越祓草轮伤害'], 'e', 'aggravate')
},
{
  check: ({ cons }) => cons >= 4,
  title: `${TalentName.c4Name}雷草标伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, HealNumber: 3 },
  dmg: ({ attr , talent , calc }, { basic }) => basic(calc(attr.hp) * 9.7 / 100, '')
},
{
  title: '超绽放伤害',
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, HealNumber: 3 },
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('hyperBloom')
},
{
  title: `${TalentName.eName}每跳治疗`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3, HealNumber: 3 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * talent.e['越祓草轮治疗量2'][0] / 100 + talent.e['越祓草轮治疗量2'][1] * 1 + calc(attr.mastery) * 0.75)
},
{
  title: `${TalentName.qName}单段伤害`,
  params: { BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['单次伤害'] * calc(attr.hp) / 100, 'q')
},
{
  title: `${TalentName.qName}单段激化`,
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 4, BurstDmg: 4 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['单次伤害'] * calc(attr.hp) / 100, 'q', 'aggravate')
}]