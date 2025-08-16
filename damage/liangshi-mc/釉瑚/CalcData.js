import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "釉瑚"
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
      let a2 = dmg(talent.a['第二段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.amg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 5, "常态攻击造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 6, "重击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击·落霜坠伤害'], 'a2')
      return {
        dmg: a1.dmg * 6,
        avg: a1.avg * 6
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'][0], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => {
      let a1 =  dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 6,
        avg: a1.avg * 6
      }
    }
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  },
  {
    title: `${TalentName.eName}治疗量`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.e['匣中问祯治疗量2'][0] + talent.e['匣中问祯治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: '奇珍赏编钟伤害',
    params: { "常态攻击使用次数": 1, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['编钟伤害2'][0], 'e')
      let e2 = dmg(talent.e['编钟伤害2'][1], 'e')
      let e3 = dmg(talent.e['编钟伤害2'][2], 'e')
      return {
        dmg: e1.amg + e2.dmg * 3 + e3.dmg,
        avg: e1.avg + e2.avg * 3 + e3.avg
      }
    }
  },
  {
    title: '奇珍赏如意伤害',
    params: { "常态攻击使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['如意伤害2'][0], 'e')
      let e2 = dmg(talent.e['如意伤害2'][1], 'e')
      return {
        dmg: e1.amg + e2.dmg,
        avg: e1.avg + e2.avg
      }
    }
  },
  {
    title: '奇珍赏鼎伤害',
    params: { "常态攻击使用次数": 1, "共鸣技能命中次数": 7, "共鸣技能造成伤害次数": 7, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['鼎伤害2'][0], 'e')
      let e2 = dmg(talent.e['鼎伤害2'][1], 'e')
      return {
        dmg: e1.amg * 6 + e2.dmg,
        avg: e1.avg * 6 + e2.avg
      }
    }
  },
  {
    title: '奇珍赏面具伤害',
    params: { "常态攻击使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['面具伤害2'][0], 'e')
      let e2 = dmg(talent.e['面具伤害2'][1], 'e')
      return {
        dmg: e1.amg * 9 + e2.dmg,
        avg: e1.avg * 9 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.tName}诗中物(飞白)`,
    params: { "重击使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 1, "相同吉兆": 0 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['诗中物伤害2'][0], 'a2')
      return {
        dmg: a1.amg * 10,
        avg: a1.avg * 10
      }
    }
  },
  {
    title: `${TalentName.tName}诗中物(对偶)`,
    params: { "重击使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 1, "相同吉兆": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['诗中物伤害2'][0], 'a2')
      return {
        dmg: a1.amg * 10,
        avg: a1.avg * 10
      }
    }
  },
  {
    title: `${TalentName.tName}诗中物(联珠)`,
    params: { "重击使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 1, "相同吉兆": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['诗中物伤害2'][0], 'a2')
      return {
        dmg: a1.amg * 10,
        avg: a1.avg * 10
      }
    }
  },
  {
    title: `${TalentName.tName}诗中物(合说)`,
    params: { "重击使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 21, "相同吉兆": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['诗中物伤害2'][0], 'a2')
      return {
        dmg: a1.amg * 10,
        avg: a1.avg * 10
      }
    }
  },
  {
    title: `${TalentName.tName}诗中物治疗量`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 2, "相同吉兆": 0 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['诗中物治疗量2'][0] + talent.t['诗中物治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.tName}双关额外治疗量`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 10, "共鸣技能造成伤害次数": 10, "自我治疗次数": 2, "相同吉兆": 2 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['双关额外治疗量2'][0] + talent.t['双关额外治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `变奏入场伤害`,
    params: { "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: i1.dmg + i2.dmg,
        avg: i1.avg + i2.avg
      }
    }
  }
]