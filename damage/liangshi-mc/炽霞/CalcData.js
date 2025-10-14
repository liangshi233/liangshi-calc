import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "炽霞"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 8, "常态攻击造成伤害次数": 8 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `满蓄力${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['闪避反击伤害'], 'a')
  },
  {
    title: `${TalentName.eName}释放伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 8,
        avg: e1.avg * 8
      }
    }
  },
  {
    title: `${TalentName.eName}热压弹伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 20, "共鸣技能造成伤害次数": 20 },
    dmg: ({ talent }, dmg) => dmg(talent.t['热压弹伤害'], 'e')
  },
  {
    title: `${TalentName.eName}轰轰伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 38, "共鸣技能造成伤害次数": 38, "轰轰": true },
    dmg: ({ talent }, dmg) => dmg(talent.t['轰轰伤害'], 'e')
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 2, "共鸣解放造成伤害次数": 2, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['技能伤害2'][0], 'q')
      let q2 = dmg(talent.q['技能伤害2'][1], 'q')
      return {
        dmg: q1.dmg + q2.dmg * 11,
        avg: q1.avg + q1.avg * 11
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
        dmg: i1.dmg + i2.dmg * 4,
        avg: i1.avg + i2.avg * 4
      }
    }
  },
  {
    title: `延奏单段伤害`,
    dmgKey: 'o',
    params: { "延奏技能使用次数": 1, "延奏技能命中次数": 1, "延奏技能造成伤害次数": 1, "协奏能量消耗次数": 1 },
    dmg: ({}, dmg) => dmg(530, 'o')
  }
]