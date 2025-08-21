import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "奥古斯塔"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "获得护盾次数": 3 },
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
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6, "获得护盾次数": 4 },
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
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9, "获得护盾次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第四段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 3, "重击造成伤害次数": 3, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·鸣铁伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 2, "空中攻击伤害次数": 2, "处于空中": true, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['空中攻击伤害2'][0], 'a3')
      return {
        dmg: a3.dmg * 2,
        avg: a3.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `空中${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a2Name}烁雷·后撤伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击·烁雷·后撤伤害'] + (cons >= 3 ? 25 : 0), 'a2')
  },
  {
    title: `${TalentName.a2Name}烁雷·旋切伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "获得护盾次数": 2 },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['重击·烁雷·旋切伤害2'][0] + (cons >= 3 ? 25 : 0), 'a2')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a2Name}烁雷·升拳伤害`,
    params: { "共鸣技能使用次数": 2, "重击命中次数": 2, "重击造成伤害次数": 2, "获得护盾次数": 3 },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['重击·烁雷·升拳伤害2'][0] + (cons >= 3 ? 25 : 0), 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a4Name}重击·鸣铁伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击·重击·鸣铁伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a4Name}重击·后撤伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "重击命中次数": 1, "重击造成伤害次数": 1, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['闪避反击·烁雷·后撤伤害'], 'a2')
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 3, "共鸣技能造成伤害次数": 3, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 3,
        avg: e1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}不败恒阳·迅击伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.t['共鸣技能·不败恒阳·迅击伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}不败恒阳·跃空伤害`,
    params: { "共鸣技能使用次数": 2, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.t['共鸣技能·不败恒阳·跃空伤害2'][0], 'e')
      let e2 = dmg(talent.t['共鸣技能·不败恒阳·跃空伤害2'][1], 'e')
      return {
        dmg: e1.dmg + e2.dmg * 2,
        avg: e1.avg + e2.dmg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}不败恒阳·落袭伤害`,
    params: { "共鸣技能使用次数": 2, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "获得护盾次数": 3 },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.t['共鸣技能·不败恒阳·落袭伤害2'][0] + (cons >= 3 ? 25 : 0), 'e')
      let e2 = dmg(talent.t['共鸣技能·不败恒阳·落袭伤害2'][1] + (cons >= 3 ? 25 : 0), 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg,
        avg: e1.avg * 2 + e2.dmg
      }
    }
  },
  {
    title: `${TalentName.a4Name}不败恒阳·迅击伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中闪避反击·不败恒阳·迅击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { "共鸣解放使用次数": 1, "重击造成伤害次数": 8, "重击命中次数": 8, "共鸣能量降低次数": 1, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['共鸣解放·誓锋不殒伤害2'][0], 'a2')
      let q2 = dmg(talent.q['共鸣解放·誓锋不殒伤害2'][1], 'a2')
      let q3 = dmg(talent.q['共鸣解放·誓锋不殒伤害2'][2], 'a2')
      let q4 = dmg(talent.q['共鸣解放·誓锋不殒伤害2'][3], 'a2')
      return {
        dmg: q1.dmg * 2 + q2.dmg * 3 + q3.dmg * 2 + q4.dmg,
        avg: q1.avg * 2 + q2.avg * 3 + q3.avg * 2 + q4.avg
      }
    }
  },
  {
    title: `${TalentName.qName}烈阳伤害`,
    params: { "共鸣解放使用次数": 1, "重击使用次数": 1, "重击造成伤害次数": 1, "重击命中次数": 1, "获得护盾次数": 4 },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['赫日威临·烈阳伤害'] + (cons >= 3 ? 25 : 0), 'a2')
  },
  {
    title: `${TalentName.qName}不朽者之肃伤害`,
    params: { "共鸣解放使用次数": 2, "重击使用次数": 1, "重击造成伤害次数": 17, "重击命中次数": 17, "获得护盾次数": 5 },
    dmg: ({ talent, cons }, dmg) => {
      let q1 = dmg(talent.q['赫日威临·不朽者之肃伤害2'][0] + (cons >= 3 ? 25 : 0), 'a2')
      let q2 = dmg(talent.q['赫日威临·不朽者之肃伤害2'][1] + (cons >= 3 ? 25 : 0), 'a2')
      let q3 = dmg(talent.q['赫日威临·不朽者之肃伤害2'][2] + (cons >= 3 ? 25 : 0), 'a2')
      let q4 = dmg(talent.q['赫日威临·不朽者之肃伤害2'][3] + (cons >= 3 ? 25 : 0), 'a2')
      return {
        dmg: q1.dmg * 3 + q2.dmg * 3 + q3.dmg + q4.dmg,
        avg: q1.avg * 3 + q2.avg * 3 + q3.avg + q4.avg
      }
    }
  },
  {
    title: `${TalentName.qName}领域护盾量`,
    params: { "共鸣解放使用次数": 2, "重击使用次数": 1, "重击造成伤害次数": 17, "重击命中次数": 17, "获得护盾次数": 5 },
    dmg: ({ calc, attr, cons }, { shield }) => shield((calc(attr.hp) * 5 / 100 + 650) * (cons >= 5 ? 1.5 : 1))
  },
  {
    title: `变奏入场伤害`,
    params: { "获得护盾次数": 1 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: (i1.dmg + i2.dmg) * 2,
        avg: (i1.avg + i2.avg) * 2
      }
    }
  },
  {
    title: `变奏入场伤害`,
    params: { "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害'][0], 'i')
      return {
        dmg: i1.dmg * 2,
        avg: i1.avg * 2
      }
    }
  }
]