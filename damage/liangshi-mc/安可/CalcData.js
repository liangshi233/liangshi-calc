import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "安可"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 8, NormalDmg: 8 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第四段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4
      }
    }
  },
  {
    title: `${TalentName.aName}咩咩伤害`,
    params: { NormalUse: 5, NormalHit: 9, NormalDmg: 9 },
    dmg: ({ talent }, dmg) => dmg(talent.a['咩咩伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `失控${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Mayhem: 100 },
    dmg: ({ talent }, dmg) => dmg(talent.t['白咩·失控之炎伤害'], 'q')
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      let a2 = dmg(talent.a['闪避反击伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}热力羊咩伤害`,
    params: { SkillsUse: 1, SkillsHit: 8, SkillsDmg: 8 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['热力羊咩伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 8,
        avg: e1.avg * 8
      }
    }
  },
  {
    title: `${TalentName.eName}尾段伤害`,
    params: { SkillsUse: 2, SkillsHit: 9, SkillsDmg: 9 },
    dmg: ({ talent }, dmg) => dmg(talent.e['热情欢迎式伤害'], 'e')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 1, NormalHit: 2, NormalDmg: 2, Cosmos_Rave: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['黑咩·胡闹第一段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}二段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 2, NormalHit: 5, NormalDmg: 5, Cosmos_Rave: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['黑咩·胡闹第二段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}三段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 3, NormalHit: 9, NormalDmg: 9, Cosmos_Rave: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['黑咩·胡闹第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}四段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 4, NormalHit: 12, NormalDmg: 12, Cosmos_Rave: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['黑咩·胡闹第四段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['黑咩·重击伤害'], 'a2')
  },
  {
    title: `暴走${TalentName.a2Name}伤害`,
    params: { BurstUse: 1, EnergyUse: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Cosmos_Rave: true, Mayhem: 100 },
    dmg: ({ talent }, dmg) => dmg(talent.t['黑咩·暴走之炎伤害'], 'q')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
    params: { BurstUse: 1, EnergyUse: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, Cosmos_Rave: true },
    dmg: ({ talent }, dmg) => {
      let a4 = dmg(talent.q['黑咩·狂热伤害2'][0], 'e')
      return {
        dmg: a4.dmg * 4,
        avg: a4.avg * 4
      }
    }
  },
  {
    title: `变奏入场伤害`,
    dmgKey: 'l',
    dmg: ({ talent }, dmg) => {
      let l1 = dmg(talent.l['技能伤害2'][0], 'l')
      let l2 = dmg(talent.l['技能伤害2'][1], 'l')
      return {
        dmg: l1.dmg * 3 + l2.dmg,
        avg: l1.avg * 3 + l2.avg
      }
    }
  },
  {
    title: `延奏单段伤害`,
    dmgKey: 'o',
    params: { OutroUse: 1, OutroHit: 3, OutroDmg: 3, ConcertoUse: 1 },
    dmg: ({}, dmg) => dmg(176.76, 'o')
  }
]