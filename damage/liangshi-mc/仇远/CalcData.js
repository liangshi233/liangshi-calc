import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "仇远"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第二段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 8, "常态攻击造成伤害次数": 8 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 4 + a2.dmg,
        avg: a1.avg * 4 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a2 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a2.dmg * 2,
        avg: a2.avg * 2
      }
    }
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
        dmg: a1.dmg + a2.dmg * 3,
        avg: a1.avg + a2.avg * 3
      }
    }
  },
  {
    title: `点按${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e = dmg(talent.e['技能伤害'], 'e')
      return {
        dmg: e.dmg * 3,
        avg: e.avg * 3
      }
    }
  },
  {
    title: `长按${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['不远辞伤害2'][0], 'e')
      let e2 = dmg(talent.e['不远辞伤害2'][1], 'e')
      let e3 = dmg(talent.e['不远辞伤害2'][2], 'e')
      return {
        dmg: e1.dmg + e2.dmg * 3 + e3.dmg,
        avg: e1.avg + e2.avg * 3 + e3.avg
      }
    }
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.tName}一段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['答剑·质黑相青第一段伤害2'][0], 'a2')
      let a2 = dmg(talent.t['答剑·质黑相青第一段伤害2'][1], 'a2')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.tName}二段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['答剑·质黑相青第二段伤害2'][0], 'a2')
      let a2 = dmg(talent.t['答剑·质黑相青第二段伤害2'][1], 'a2')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.tName}三段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 10, "常态攻击造成伤害次数": 10 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['答剑·质黑相青第三段伤害2'][0], 'a2')
      let a2 = dmg(talent.t['答剑·质黑相青第三段伤害2'][1], 'a2')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.tName}四段伤害`,
    params: { "常态攻击使用次数": 5, "常态攻击命中次数": 11, "常态攻击造成伤害次数": 11 },
    dmg: ({ talent }, dmg) => dmg(talent.t['答剑·质黑相青第四段伤害'], 'a2')
  },
  {
    title: `${TalentName.tName}弦歌不缀伤害`,
    params: { "重击攻击命中次数": 5, "重击攻击造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['答剑·弦歌不缀伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.tName}割股之心伤害`,
    params: { "重击攻击命中次数": 15, "重击攻击造成伤害次数": 15 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['答剑·割股之心伤害2'][0], 'a2')
      let a2 = dmg(talent.t['答剑·割股之心伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 3 + a2.dmg * 4 * 3,
        avg: a1.avg * 3 + a2.avg * 4 * 3
      }
    }
  },
  {
    title: `${TalentName.tName}忠烈死节伤害`,
    params: { "重击攻击命中次数": 1, "重击攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['答剑·忠烈死节伤害2'][0], 'a2')
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      let i3 = dmg(talent.i['技能伤害2'][2], 'i')
      return {
        dmg: i1.dmg * 5 + i2.dmg + i3.dmg,
        avg: i1.avg * 5 + i2.avg + i3.avg
      }
    }
  }
]