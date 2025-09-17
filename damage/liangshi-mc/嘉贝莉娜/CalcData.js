import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "嘉贝莉娜"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a2')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a2')
      let a2 = dmg(talent.a['第二段伤害2'][1], 'a2')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "重击命中次数": 8, "重击造成伤害次数": 8 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a2')
      let a2 = dmg(talent.a['第三段伤害2'][1], 'a2')
      return {
        dmg: a1.dmg * 2 + a1.dmg * 2,
        avg: a1.avg * 2 + a2.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "重击命中次数": 8, "重击造成伤害次数": 8 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'r')
  },
  {
    title: `${TalentName.a3Name}下落伤害`,
    params: { "空中攻击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击·枪弹暴雨下落攻击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}扫射单段伤害`,
    params: { "空中攻击使用次数": 1, "重击命中次数": 8, "重击造成伤害次数": 8, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击·枪弹暴雨持续扫射伤害'], 'a2')
  },
  {
    title: `${TalentName.a2Name}一段伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·燧发杀戮第一段伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a2Name}二段伤害`,
    params: { "重击使用次数": 2, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·燧发杀戮第二段伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a2Name}三段伤害`,
    params: { "重击使用次数": 3, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·燧发杀戮第三段伤害2'][0], 'r')
      let a2 = dmg(talent.a['重击·燧发杀戮第三段伤害2'][1], 'r')
      return {
        dmg: a1.dmg * 3 + a2.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "重击命中次数": 3, "重击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a4 = dmg(talent.a['闪避反击·血债将偿伤害'], 'a2')
      return {
        dmg: a4.dmg * 3,
        avg: a4.avg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}迫近伤害`,
    params: { "共鸣技能使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.e['共鸣技能·迫近伤害2'][0] + (cons >= 5 ? 150 : 0), 'a2')
      let e2 = dmg(talent.e['共鸣技能·迫近伤害2'][1] + (cons >= 5 ? 150 : 0), 'a2')
      return {
        dmg: e1.dmg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}恶翼扬升伤害`,
    params: { "共鸣技能使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "恶魔位格": true },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.e['共鸣技能·恶翼扬升伤害2'][0] + (cons >= 5 ? 150 : 0), 'a2')
      let e2 = dmg(talent.e['共鸣技能·恶翼扬升伤害2'][1] + (cons >= 5 ? 150 : 0), 'a2')
      return {
        dmg: e1.dmg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}一段伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·燧发杀戮第一段伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a2Name}二段伤害`,
    params: { "重击使用次数": 2, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·燧发杀戮第二段伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a2Name}三段伤害`,
    params: { "重击使用次数": 3, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·燧发杀戮第三段伤害2'][0], 'r')
      let a2 = dmg(talent.a['重击·燧发杀戮第三段伤害2'][1], 'r')
      return {
        dmg: a1.dmg * 3 + a2.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.aName}一段伤害`,
    params: { "共鸣技能使用次数": 1, "常态攻击使用次数": 1, "重击命中次数": 3, "重击造成伤害次数": 3, "恶魔位格": true },
    dmg: ({ talent }, dmg) => dmg(talent.t['普攻·炽天猎杀第一段伤害'] + 85, 'a2')
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.aName}二段伤害`,
    params: { "共鸣技能使用次数": 1, "常态攻击使用次数": 2, "重击命中次数": 6, "重击造成伤害次数": 6, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['普攻·炽天猎杀第二段伤害2'][0] + 85, 'a2')
      let a2 = dmg(talent.t['普攻·炽天猎杀第二段伤害2'][1] + 85, 'a2')
      let a3 = dmg(talent.t['普攻·炽天猎杀第二段伤害2'][2] + 85, 'a2')
      return {
        dmg: a1.dmg + a2.dmg + a3.dmg,
        avg: a1.avg + a2.avg + a3.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.aName}三段伤害`,
    params: { "共鸣技能使用次数": 1, "常态攻击使用次数": 3, "重击命中次数": 10, "重击造成伤害次数": 10, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['普攻·炽天猎杀第三段伤害2'][0] + 85, 'a2')
      let a2 = dmg(talent.t['普攻·炽天猎杀第三段伤害2'][1] + 85, 'a2')
      return {
        dmg: a1.dmg * 3 + a1.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.aName}四段伤害`,
    params: { "共鸣技能使用次数": 1, "常态攻击使用次数": 4, "重击命中次数": 10, "重击造成伤害次数": 10, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['普攻·炽天猎杀第四段伤害2'][0] + 85, 'a2')
      let a2 = dmg(talent.t['普攻·炽天猎杀第四段伤害2'][1] + 85, 'a2')
      return {
        dmg: a1.dmg * 3 + a1.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.aName}五段伤害`,
    params: { "共鸣技能使用次数": 1, "常态攻击使用次数": 5, "重击命中次数": 10, "重击造成伤害次数": 10, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['普攻·炽天猎杀第五段伤害2'][0] + 85, 'a2')
      let a2 = dmg(talent.t['普攻·炽天猎杀第五段伤害2'][1] + 85, 'a2')
      return {
        dmg: a1.dmg + a1.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.a2Name}一段伤害`,
    params: { "共鸣技能使用次数": 1, "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['重击·炼羽裁决第一段伤害2'][0] + 85, 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.a2Name}二段伤害`,
    params: { "共鸣技能使用次数": 1, "重击使用次数": 2, "重击命中次数": 6, "重击造成伤害次数": 6, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['重击·炼羽裁决第二段伤害2'][0] + 85, 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.a2Name}三段伤害`,
    params: { "共鸣技能使用次数": 1, "重击使用次数": 3, "重击命中次数": 6, "重击造成伤害次数": 6, "恶魔位格": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['重击·炼羽裁决第三段伤害2'][0] + 85, 'r')
      let a2 = dmg(talent.t['重击·炼羽裁决第三段伤害2'][1] + 85, 'r')
      return {
        dmg: a1.dmg * 3 + a2.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.a3Name}下落伤害`,
    params: { "共鸣技能使用次数": 1, "空中攻击使用次数": 1, "重击命中次数": 3, "重击造成伤害次数": 3, "处于空中": true, "恶魔位格": true },
    dmg: ({ talent }, dmg) => dmg(talent.t['空中攻击·火狱暴雨下落攻击伤害'] + 85, 'a2')
  },
  {
    title: `${TalentName.qNameT}${TalentName.eNameT}后${TalentName.a3Name}扫射单段伤害`,
    params: { "共鸣技能使用次数": 1, "空中攻击使用次数": 1, "重击命中次数": 10, "重击造成伤害次数": 10, "处于空中": true, "恶魔位格": true },
    dmg: ({ talent }, dmg) => dmg(talent.t['空中攻击·火狱暴雨持续扫射伤害'] + 85, 'a2')
  },
  {
    title: `${TalentName.eNameT}后${TalentName.eName}迫近伤害`,
    params: { "共鸣技能使用次数": 2, "重击命中次数": 4, "重击造成伤害次数": 4, "恶魔位格": true },
    dmg: ({ talent, cons }, dmg) => {
      let e1 = dmg(talent.t['共鸣技能·掠袭伤害2'][0] + (cons >= 5 ? 150 : 0), 'a2')
      let e2 = dmg(talent.t['共鸣技能·掠袭伤害2'][1] + (cons >= 5 ? 150 : 0), 'a2')
      return {
        dmg: e1.dmg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent, cons }, dmg) => {
      let q1 = dmg(talent.q['共鸣解放·炼净伤害2'][0] + (cons >= 3 ? 120 : 0), 'r')
      let q2 = dmg(talent.q['共鸣解放·炼净伤害2'][1] + (cons >= 3 ? 120 : 0), 'r')
      return {
        dmg: q1.dmg + q2.dmg * 11,
        avg: q1.avg + q2.avg * 11
      }
    }
  },
  {
    title: `变奏入场伤害`,
    dmgKey: 'i',
    dmg: ({ talent }, dmg) => dmg(talent.i['变奏技能·永火上膛伤害'], 'i')
  },
  {
    title: `延奏离场伤害`,
    dmgKey: 'o',
    dmg: ({ talent }, dmg) => {
      let o1 = dmg(talent.o['延奏技能伤害2'][0], 'o')
      let o2 = dmg(talent.o['延奏技能伤害2'][0], 'o')
      return {
        dmg: o1.dmg * 3 + o2.dmg,
        avg: o1.avg * 3 + o2.avg
      }
    }
  }
]