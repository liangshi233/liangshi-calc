import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "宵宫"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementFireTeam: 1, EnergyTeammate: 60, SkillsHit: 0, SkillsDmg: 0 }
export const buffs = CalcBuff
export const details = [
{
  title: '炽焰箭首段',
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1, NormalElement: 1, Niwabi_Enshou: true },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['一段伤害2'][0], 'a')
    return {
      avg: a1.avg * 2,
      dmg: a1.dmg * 2
    }
  }
},
{
  title: '炽焰箭首段蒸发',
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1, NormalElement: 1, Niwabi_Enshou: true, WaterAttachment: true },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['一段伤害2'][0], 'a')
    let a2 = dmg(talent.a['一段伤害2'][0], 'a', 'vaporize')
    return {
      avg: a1.avg + a2.avg,
      dmg: a1.dmg + a2.dmg
    }
  }
},
{
  title: '炽焰箭尾箭',
  params: ({ cons }) => ({ NormalUse: 5, NormalHit: cons >= 6 ? 10 : 7, NormalDmg: cons >= 6 ? 10 : 7, NormalElement: cons >= 6 ? 10 : 7, Niwabi_Enshou: true }),
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: '炽焰箭尾箭蒸发',
  params: ({ cons }) => ({ NormalUse: 5, NormalHit: cons >= 6 ? 10 : 7, NormalDmg: cons >= 6 ? 10 : 7, NormalElement: cons >= 6 ? 10 : 7, Niwabi_Enshou: true, WaterAttachment: true }),
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},
{
  title: '焰硝矢伤害',
  params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.a['焰硝矢伤害'], 'a2')
},
{
  title: `${TalentName.qName}爆炸伤害`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['琉金火光爆炸伤害'], 'q')
},
{
  title: `${TalentName.qName}爆炸蒸发`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, WaterAttachment: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['琉金火光爆炸伤害'], 'q', 'vaporize')
}]
