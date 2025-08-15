import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "珂莱塔"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['普攻第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['普攻第二段伤害2'][0], 'a')
      let a2 = dmg(talent.a['普攻第二段伤害2'][1], 'a')
      let a3 = dmg(talent.a['普攻第二段伤害2'][2], 'a')
      return {
        dmg: a1.dmg + a2.dmg + a3.dmg,
        avg: a1.avg + a2.avg + a3.avg
      }
    }
  },
  {
    title: `强化${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['必要性手段第一段伤害'], 'a')
  },
  {
    title: `强化${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['必要性手段第二段伤害2'][0], 'a')
      let a2 = dmg(talent.a['必要性手段第二段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `强化${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 5, "常态攻击命中次数": 11, "常态攻击造成伤害次数": 11 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['必要性手段第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['必要性手段第三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg * 4,
        avg: a1.avg + a2.avg * 4
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 5, "重击造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      let a2 = dmg(talent.a['重击伤害2'][1], 'a2')
      let a3 = dmg(talent.a['重击伤害2'][2], 'a2')
      return {
        dmg: a1.dmg * 2 + a2.dmg * 2 + a3.dmg,
        avg: a1.avg * 2 + a2.dmg * 2 + a3.dmg
      }
    }
  },
  {
    title: `限制性策略${TalentName.a2Name}`,
    params: { "重击使用次数": 1, "重击命中次数": 5, "重击造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['限制性策略伤害2'][0], 'a2')
      let a2 = dmg(talent.a['限制性策略伤害2'][1], 'a2')
      let a3 = dmg(talent.a['限制性策略伤害2'][2], 'a2')
      return {
        dmg: a1.dmg * 2 + a2.dmg * 2 + a3.dmg,
        avg: a1.avg * 2 + a2.dmg * 2 + a3.dmg
      }
    }
  },
  {
    title: `末路见行${TalentName.a2Name}`,
    params: { "重击使用次数": 1, "共鸣技能命中次数": 6, "共鸣技能造成伤害次数": 6 },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.t['末路见行伤害2'][0] + (cons >= 5 ? 47 : 0), 'e')
      let a2 = dmg(talent.t['末路见行伤害2'][1] + (cons >= 5 ? 47 : 0), 'e')
      return {
        dmg: a1.dmg * 5 + a2.dmg,
        avg: a1.avg * 5 + a2.dmg
      }
    }
  },

  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'][0], 'a,a3')
  },
  {
    title: `礼节性问候${TalentName.a3Name}`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 2, "空中攻击造成伤害次数": 2, "处于空中": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['礼节性问候伤害2'][0], 'a,a3')
      let a2 = dmg(talent.a['礼节性问候伤害2'][1], 'a,a3')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      let a2 = dmg(talent.a['闪避反击伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}释放伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2 },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0] + (cons >= 3 ? 93 : 0), 'e')
      let e2 = dmg(talent.e['技能伤害2'][1] + (cons >= 3 ? 93 : 0), 'e')
      return {
        dmg: e1.dmg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}示我璀璨`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 3, "共鸣技能造成伤害次数": 3 },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.e['示我璀璨伤害2'][0] + (cons >= 3 ? 93 : 0), 'e')
      let e2 = dmg(talent.e['示我璀璨伤害2'][1] + (cons >= 3 ? 93 : 0), 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg,
        avg: e1.avg * 2 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { "重击使用次数": 1, "共鸣解放使用次数": 1, "共鸣能量降低次数": 1, "共鸣技能命中次数": 7, "共鸣技能造成伤害次数": 7 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'] + 80, 'e')
  },
  {
    title: `${TalentName.qName}死兆单段`,
    params: { "重击使用次数": 1, "共鸣解放使用次数": 3, "共鸣能量降低次数": 1, "共鸣技能命中次数": 17, "共鸣技能造成伤害次数": 17 },
    dmg: ({ talent, cons }, dmg) => {
      let q1 = dmg(talent.e['死兆伤害2'][0] + 80 + (cons >= 6 ? 186.6 : 0), 'e')
      let q2 = dmg(talent.e['死兆伤害2'][1] + 80, 'e')
      return {
        dmg: q1.dmg + q2.dmg * 4,
        avg: q1.avg + q2.avg * 4
      }
    }
  },
  {
    title: `${TalentName.qName}致死以终`,
    params: { "重击使用次数": 1, "共鸣解放使用次数": 6, "共鸣能量降低次数": 1, "共鸣技能命中次数": 28, "共鸣技能造成伤害次数": 28 },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['致死以终伤害'] + 80 + (cons >= 2 ? 126 : 0), 'e')
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: i1.dmg + i2.dmg * 2,
        avg: i1.avg + i2.avg * 2
      }
    }
  },
  {
    title: `延奏离场伤害`,
    params: { "延奏技能使用次数": 1, "延奏技能命中次数": 1, "延奏技能造成伤害次数": 1, "协奏能量消耗次数": 1 },
    dmg: ({}, dmg) => dmg(794.2, 'o')
  }
]