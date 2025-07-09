import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "埃洛伊"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 40 }
export const buffs = CalcBuff
export const details = [
{
  title: `附魔${TalentName.aName}第一段`,
  params: { Coil: 4, NormalElement: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['一段伤害2'][0], 'a')
    let a2 = dmg(talent.a['一段伤害2'][1], 'a')
    return {
      dmg: a1.dmg + a2.dmg,
      avg: a1.avg + a2.avg
    }
  }
},
{
  title: `附魔${TalentName.aName}第四段`,
  dmgKey: 'a',
  params: { coil: 4, NormalElement: 5, NormalHit: 5, NormalDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${TalentName.eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['冰尘弹伤害'], 'e')
},
{
  title: `${TalentName.eName}融化`,
  params: { FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['冰尘弹伤害'], 'e', 'melt')
},
{
  title: '冷冻炸弹伤害',
  params: { SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.e['冷冻炸弹伤害'], 'e')
},
{
  title: '冷冻炸弹融化',
  params: { SkillsHit: 4, SkillsDmg: 4, FireAttachment: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['冷冻炸弹伤害'], 'e', 'melt')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}融化`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, FireAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]