import { LSconfig } from '#liangshi'
import { ObTalentName } from '../index.js'
import fs from 'node:fs'

let CharacterName = "丝柯克"
let cfg = LSconfig.getConfig('user', 'config')
let TalentName = ObTalentName(CharacterName)
let skill
try {
  skill = fs.readFileSync('plugins/miao-plugin/resources/meta-gs/character/丝柯克/data.json', 'utf8')
  skill = JSON.parse(skill)
  skill = skill.talentData.e
} catch (err) {
  console.error(`${CharacterName}天赋数据读取失败: ${err}`)
}
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { SkillsUse: 0, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { SkillsUse: 0, NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { SkillsUse: 0, NormalUse: 3, NormalHit: 4, NormalDmg: 4, phy: true },
  dmg: ({ talent }, dmg) => {
    let a = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
    return {
      dmg: a.dmg * 2,
      avg: a.avg * 2
    }
  }
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { SkillsUse: 0, NormalUse: 5, NormalHit: 5, NormalDmg: 5, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}五段伤害`,
  params: { SkillsUse: 0, NormalUse: 5, NormalHit: 6, NormalDmg: 6, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { SkillsUse: 0, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['重击伤害2'][0], 'a2', 'phy')
    return {
      dmg: z.dmg * 2,
      avg: z.avg * 2
    }
  }
},
{
  title: `${TalentName.a3Name}期间伤害`,
  params: { SkillsUse: 0, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  params: { SkillsUse: 0, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  params: { SkillsUse: 0, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { ElementWaterTeam: 1, NormalElement: 1 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['一段伤害'][talentlevel]
    return dmg(e, 'a')
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段`,
  params: { ElementWaterTeam: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['二段伤害'][talentlevel]
    return dmg(e, 'a')
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段`,
  params: { ElementWaterTeam: 1, NormalUse: 3, NormalHit: 4, NormalDmg: 4, NormalElement: 4 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['三段伤害2'][talentlevel]
    let a = dmg(e[0], 'a')
    return {
      dmg: a.dmg * 2,
      avg: a.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段`,
  params: { ElementWaterTeam: 1, NormalUse: 4, NormalHit: 6, NormalDmg: 6, NormalElement: 6 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['四段伤害2'][talentlevel]
    let a1 = dmg(e[0], 'a')
    let a2 = dmg(e[1], 'a')
    return {
      dmg: a1.dmg + a2.dmg,
      avg: a1.avg + a2.avg
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}五段`,
  params: { ElementWaterTeam: 1, NormalUse: 5, NormalHit: 7, NormalDmg: 7, NormalElement: 7 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['五段伤害'][talentlevel]
    return dmg(e, 'a')
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}伤害`,
  params: { ElementWaterTeam: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['重击伤害2'][talentlevel]
    let z = dmg(e[0], 'a2')
    return {
      dmg: z.dmg * 3,
      avg: z.avg * 3
    }
  }
},
{
  title: `${TalentName.eNameT}${TalentName.qNameT}后${TalentName.aName}一段`,
  params: { ElementWaterTeam: 1, BurstUse: 1, NormalElement: 1, Deaths_Crossing: 3 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['一段伤害'][talentlevel]
    return dmg(e, 'a')
  }
},
{
  title: `${TalentName.eNameT}${TalentName.qNameT}后${TalentName.aName}二段`,
  params: { ElementWaterTeam: 1, BurstUse: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2, Deaths_Crossing: 3 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['二段伤害'][talentlevel]
    return dmg(e, 'a')
  }
},
{
  title: `${TalentName.eNameT}${TalentName.qNameT}后${TalentName.aName}三段`,
  params: { ElementWaterTeam: 1, BurstUse: 1, NormalUse: 3, NormalHit: 4, NormalDmg: 4, NormalElement: 4, Deaths_Crossing: 3 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['三段伤害2'][talentlevel]
    let a = dmg(e[0], 'a')
    return {
      dmg: a.dmg * 2,
      avg: a.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}${TalentName.qNameT}后${TalentName.aName}四段`,
  params: { ElementWaterTeam: 1, BurstUse: 1, NormalUse: 4, NormalHit: 6, NormalDmg: 6, NormalElement: 6, Deaths_Crossing: 3 },
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['四段伤害2'][talentlevel]
    let a1 = dmg(e[0], 'a')
    let a2 = dmg(e[1], 'a')
    return {
      dmg: a1.dmg + a2.dmg,
      avg: a1.avg + a2.avg
    }
  }
},
{
  title: `${TalentName.eNameT}${TalentName.qNameT}后${TalentName.aName}五段`,
  params: { ElementWaterTeam: 1, BurstUse: 1, NormalUse: 5, NormalHit: 7, NormalDmg: 7, NormalElement: 7, Deaths_Crossing: 3 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => {
    let talentlevel = Math.min(talent.talentLevel.e, 14)
    let e = skill['五段伤害'][talentlevel]
    return dmg(e, 'a')
  }
},
{
  title: `50层${TalentName.qName}斩击单段`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, Serpents_Subtlety: 50 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害2'][0], 'q')
},
{
  title: `50层${TalentName.qName}最终斩击`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, Serpents_Subtlety: 50 },
  dmg: ({ talent }, dmg) => dmg(talent.q['最终一击技能伤害'], 'q')
},
{
  title: `50层${TalentName.qName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, Serpents_Subtlety: 50 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let q2 = dmg(talent.q['最终一击技能伤害'], 'q')
    return {
      dmg: q1.dmg * 5 + q2.dmg,
      avg: q1.avg * 5 + q2.avg
    }
  }
},
{
  title: `满层${TalentName.qName}斩击单段`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, Serpents_Subtlety: 100 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害2'][0], 'q')
},
{
  title: `满层${TalentName.qName}最终斩击`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, Serpents_Subtlety: 100 },
  dmg: ({ talent }, dmg) => dmg(talent.q['最终一击技能伤害'], 'q')
},
{
  title: `满层${TalentName.qName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, Serpents_Subtlety: 100 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let q2 = dmg(talent.q['最终一击技能伤害'], 'q')
    return {
      dmg: q1.dmg * 5 + q2.dmg,
      avg: q1.avg * 5 + q2.avg
    }
  }
}]