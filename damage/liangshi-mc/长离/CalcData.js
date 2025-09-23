import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "长离"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第一段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
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
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 12, "常态攻击造成伤害次数": 12 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第四段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第四段伤害2'][2], 'a')
      return {
        dmg: a1.dmg + a2.dmg * 4,
        avg: a1.avg + a2.avg * 4
      }
    }
  },
  {
    title: `${TalentName.a3Name}一段伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击第一段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}二段伤害`,
    params: { "空中攻击使用次数": 2, "空中攻击命中次数": 3, "空中攻击造成伤害次数": 3, "处于空中": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中攻击第二段伤害2'][0], 'a,a3')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a3Name}三段伤害`,
    params: { "空中攻击使用次数": 3, "空中攻击命中次数": 6, "空中攻击造成伤害次数": 6, "处于空中": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中攻击第三段伤害2'][0], 'a,a3')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "空中攻击使用次数": 4, "空中攻击命中次数": 11, "空中攻击造成伤害次数": 11, "处于空中": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中攻击第四段伤害2'][0], 'a,a3')
      let a2 = dmg(talent.a['空中攻击第四段伤害2'][1], 'a,a3')
      return {
        dmg: a1.dmg + a2.dmg * 4,
        avg: a1.avg + a2.avg * 4
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "离火": 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击'], 'a2')
  },
  {
    title: `空中${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中重击'], 'a2')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a4 = dmg(talent.a['闪避反击伤害'], 'a')
      return {
        dmg: a4.dmg * 3,
        avg: a4.avg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}释放伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 4, "共鸣技能造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['心眼·劫伤害2'][0], 'e')
      let e2 = dmg(talent.e['心眼·劫伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 3 + e2.dmg,
        avg: e1.avg * 3 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}${TalentName.aNameT}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "离火": 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['心眼·征伤害2'][0], 'e')
      let e2 = dmg(talent.e['心眼·征伤害2'][1], 'e')
      let e3 = dmg(talent.e['心眼·征伤害2'][2], 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg + e3.dmg,
        avg: e1.avg * 2 + e2.avg + e3.avg
      }
    }
  },
  {
    title: `${TalentName.eName}${TalentName.a3Name}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 6, "共鸣技能造成伤害次数": 6, "离火": 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['心眼·冲伤害2'][0], 'e')
      let e2 = dmg(talent.e['心眼·冲伤害2'][1], 'e')
      return {
        dmg: e1.dmg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: `${TalentName.tName}${TalentName.a2NameT}伤害`,
    params: { "重击使用次数": 1, "共鸣技能命中次数": 6, "共鸣技能造成伤害次数": 6 , "焚身以火": true },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.t['焚身以火伤害2'][0] + (cons >= 5 ? 50 : 0), 'e')
      let e2 = dmg(talent.t['焚身以火伤害2'][1] + (cons >= 5 ? 50 : 0), 'e')
      return {
        dmg: e1.dmg * 5 + e2.dmg,
        avg: e1.avg * 5 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 1, "共鸣解放造成伤害次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}后${TalentName.tName}${TalentName.a2NameT}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 1, "共鸣解放造成伤害次数": 1, "共鸣能量降低次数": 1, "重击使用次数": 1, "共鸣技能命中次数": 6, "共鸣技能造成伤害次数": 6, "焚身以火": true },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.t['焚身以火伤害2'][0] + (cons >= 5 ? 50 : 0), 'e')
      let e2 = dmg(talent.t['焚身以火伤害2'][1] + (cons >= 5 ? 50 : 0), 'e')
      return {
        dmg: e1.dmg * 5 + e2.dmg,
        avg: e1.avg * 5 + e2.avg
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
  }
]