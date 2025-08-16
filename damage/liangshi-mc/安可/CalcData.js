import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "安可"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
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
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 8, "常态攻击造成伤害次数": 8 },
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
    params: { "常态攻击使用次数": 5, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => dmg(talent.a['咩咩伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `失控${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "失序值": 100 },
    dmg: ({ talent }, dmg) => dmg(talent.t['白咩·失控之炎伤害'], 'q')
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
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
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8 },
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
    params: { "共鸣技能使用次数": 2, "共鸣技能命中次数": 9, "共鸣技能造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => dmg(talent.e['热情欢迎式伤害'], 'e')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "黑咩大暴走": true },
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
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "常态攻击使用次数": 2, "常态攻击命中次数": 5, "常态攻击造成伤害次数": 5, "黑咩大暴走": true },
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
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9, "黑咩大暴走": true },
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
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "常态攻击使用次数": 4, "常态攻击命中次数": 12, "常态攻击造成伤害次数": 12, "黑咩大暴走": true },
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
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['黑咩·重击伤害'], 'a2')
  },
  {
    title: `暴走${TalentName.a2Name}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "黑咩大暴走": true, "失序值": 100 },
    dmg: ({ talent }, dmg) => dmg(talent.t['黑咩·暴走之炎伤害'], 'q')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "共鸣技能使用次数": 1, "共鸣技能命中次数": 4, "共鸣技能造成伤害次数": 4, "黑咩大暴走": true },
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
    dmgKey: 'i',
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: i1.dmg * 3 + i2.dmg,
        avg: i1.avg * 3 + i2.avg
      }
    }
  },
  {
    title: `延奏单段伤害`,
    dmgKey: 'o',
    params: { "延奏技能使用次数": 1, "延奏技能命中次数": 3, "延奏技能造成伤害次数": 3, "协奏能量消耗次数": 1 },
    dmg: ({}, dmg) => dmg(176.76, 'o')
  }
]