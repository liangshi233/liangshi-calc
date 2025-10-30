import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "千咲"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第一段伤害'], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 5, "常态攻击造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第二段伤害2'][1], 'a')
      let a3 = dmg(talent.a['第二段伤害2'][2], 'a')
      return {
        dmg: a1.dmg + a2.dmg + a3.dmg,
        avg: a1.avg + a2.avg + a3.avg
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['纷裂贯穿伤害2'][0], 'a')
      let a2 = dmg(talent.a['纷裂贯穿伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 4 + a2.dmg,
        avg: a1.avg * 4 + a2.avg
      }
    }
  },
  {
    title: `点击${TalentName.aName}断命之铗伤害`,
    params: { "常态攻击使用次数": 6, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6, "共鸣解放造成伤害次数": 5, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'q')
      let a2 = dmg(talent.a['第三段伤害2'][1], 'q')
      let a3 = dmg(talent.a['第三段伤害2'][2], 'q')
      let a4 = dmg(talent.a['断命之铗点击伤害'], 'q')
      return {
        dmg: a1.dmg + a2.dmg + a3.dmg + a4.dmg,
        avg: a1.avg + a2.avg + a3.avg + a4.avg
      }
    }
  },

  {
    title: '撤弦治疗',
    params: { "常态攻击使用次数": 6, "常态攻击命中次数": 10, "常态攻击造成伤害次数": 6, "共鸣解放造成伤害次数": 5, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.a['断命之铗治疗量2'][0] + talent.a['断命之铗治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.aName}撤弦伤害`,
    params: { "常态攻击使用次数": 6, "常态攻击命中次数": 10, "常态攻击造成伤害次数": 6, "共鸣解放造成伤害次数": 5, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['断命之铗点击伤害'], 'q')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `碎响切面伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['碎响切面伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `垂落终焉伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "处于空中": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['碎响切面伤害2'][0], 'a,a3')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
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
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      let a2 = dmg(talent.a['闪避反击伤害2'][1], 'a')
      let a3 = dmg(talent.a['闪避反击伤害2'][2], 'a')
      return {
        dmg: a1.dmg + a2.dmg + a3.dmg,
        avg: a1.avg + a2.avg + a3.avg
      }
    }
  },
  {
    title: `${TalentName.a3Name}收弦伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['解弦之眼·收弦伤害'], 'a')
  },


  {
    title: `${TalentName.tName}第一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 6, "共鸣解放造成伤害次数": 6, "电锯模式": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['锯环·疾攻第一段伤害2'], 'q')
      return {
        dmg: a1.dmg * 6,
        avg: a1.avg * 6
      }
    }
  },

  {
    title: `${TalentName.tName}第二段单段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 13, "共鸣解放造成伤害次数": 13, "电锯模式": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['锯环·疾攻第二段伤害2'][0], 'q')
  },

  {
    title: `${TalentName.tName}第三段单段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 29, "共鸣解放造成伤害次数": 29, "电锯模式": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['锯环·疾攻第三段伤害2'][0], 'q')
  },
  {
    title: `${TalentName.tName}第三段单段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 41, "共鸣解放造成伤害次数": 41, "电锯模式": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['锯环·疾攻第三段·坠响伤害2'][0], 'q')
  },



  {
    title: `${TalentName.tName}第三段·坠响伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 41, "共鸣解放造成伤害次数": 41, "电锯模式": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['锯环·疾攻第三段·坠响伤害2'], 'q')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },

  {
    title: `${TalentName.tName}终结伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 41, "共鸣解放造成伤害次数": 41,"电锯模式": true, "获得护盾次数": 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['锯环·终结伤害2'][0], 'q')
      let a2 = dmg(talent.t['锯环·终结伤害2'][0], 'q')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg * a2.avg
      }
    }
  },
  {
    title: `100层${TalentName.tName}终结伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 41, "共鸣解放造成伤害次数": 41,"电锯模式": true, "获得护盾次数": 1, "锯环残响": true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['锯环·终结伤害2'][0], 'q')
      let a2 = dmg(talent.t['锯环·终结伤害2'][0], 'q')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg * a2.avg
      }
    }
  },
  {
    title: `${TalentName.tName}终结盾量`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 41, "共鸣解放造成伤害次数": 41, "电锯模式": true, "获得护盾次数": 1 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['锯环·终结护盾量2'][0] * calc(attr.atk) + talent.t['锯环·终结护盾量2'][1] / 100)
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 4, "共鸣技能造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      let e2 = dmg(talent.e['技能伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 3 + e2.dmg,
        avg: e1.avg * 3 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}齿轨轮回单段伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['解弦之眼伤害'], 'e')
  },
  {
    title: `${TalentName.eName}齿轨轮回单段伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => dmg(talent.e['齿轨轮回伤害2'][0], 'e')
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放治疗`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['治疗量2'][0] + talent.q['治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  }
]