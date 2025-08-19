import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "尤诺"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `月环${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['月环·普攻第一段伤害'], 'a')
  },
  {
    title: `月环${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月环·普攻第二段伤害2'][0], 'a')
      let a2 = dmg(talent.a['月环·普攻第二段伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `月环${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月环·普攻第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['月环·普攻第三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中攻击2'][0], 'a,a3')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `月环${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月环·闪避反击2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `月弓${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['月环·普攻第一段伤害'], 'a')
  },
  {
    title: `月弓${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月弓·普攻第二段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `月弓${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月弓·普攻第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `月弓${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月弓·闪避反击2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `原初${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "月相流转": false, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['原初的律动伤害2'][0], 'e')
      let e2 = dmg(talent.e['原初的律动伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 7 + e2.dmg,
        avg: e1.avg * 7 + e2.avg
      }
    }
  },
  {
    title: `告终${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 3, "共鸣技能造成伤害次数": 3, "月相流转": false, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['告终的喧响伤害2'][0], 'e')
      let e2 = dmg(talent.e['告终的喧响伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg,
        avg: e1.avg * 2 + e2.avg
      }
    }
  },
  {
    title: `未终${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 2, "共鸣技能命中次数": 6, "共鸣技能造成伤害次数": 6, "月相流转": true, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['未终的喧响伤害2'][0], 'e')
      let e2 = dmg(talent.e['未终的喧响伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg,
        avg: e1.avg * 2 + e2.avg
      }
    }
  },
  {
    title: `越限${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "月相流转": true, "自我治疗次数": 1, "我痛饮他者的遗忘": true, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['越限的弦引伤害2'][0] + talent.t["越限的弦引强化伤害2"][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `越限${TalentName.eName}治疗`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "月相流转": true, "自我治疗次数": 1, "我痛饮他者的遗忘": true, "获得护盾次数": 4 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['越限的弦引治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: `月弓${TalentName.a2Name}伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "月相流转": true, "处于空中": true, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.t['流变·月弓伤害'], 'q')
  },
  {
    title: `月环${TalentName.a2Name}伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "月相流转": true, "处于空中": true, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => {
      let t1 = dmg(talent.t['流变·月环伤害2'][0], 'q')
      return {
        dmg: t1.dmg * 4,
        avg: t1.avg * 4
      }
    }
  },
  {
    title: `强化月弓${TalentName.aName}一段伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "月相流转": true, "处于空中": true, "自我治疗次数": 1, "我痛饮他者的遗忘": true, "获得护盾次数": 5 },
    dmg: ({ talent }, dmg) => dmg(talent.a['月环·普攻第一段强化伤害'], 'a')
  },
  {
    title: `强化月弓${TalentName.aName}一段治疗`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "月相流转": true, "处于空中": true, "自我治疗次数": 1, "我痛饮他者的遗忘": true, "获得护盾次数": 5 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['月弓·普攻第一段治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: `强化月弓${TalentName.aName}二段伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4, "月相流转": true, "处于空中": true, "自我治疗次数": 2, "我痛饮他者的遗忘": true, "获得护盾次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月弓·普攻第二段强化伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `强化月弓${TalentName.aName}二段治疗`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4, "月相流转": true, "处于空中": true, "自我治疗次数": 2, "我痛饮他者的遗忘": true, "获得护盾次数": 6 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['月弓·普攻第二段治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: `强化月弓${TalentName.aName}三段伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6, "月相流转": true, "处于空中": true, "自我治疗次数": 3, "我痛饮他者的遗忘": true, "获得护盾次数": 7 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月弓·普攻第三段强化伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `强化月弓${TalentName.aName}三段治疗`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6, "月相流转": true, "处于空中": true, "自我治疗次数": 3, "我痛饮他者的遗忘": true, "获得护盾次数": 7 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['月弓·普攻第三段治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: `强化月弓${TalentName.a4Name}伤害`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 1, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "月相流转": true, "处于空中": true, "自我治疗次数": 1, "我痛饮他者的遗忘": true, "获得护盾次数": 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['月弓·闪避强化反击2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `强化月弓${TalentName.a4Name}治疗`,
    params: { "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 1, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "月相流转": true, "处于空中": true, "自我治疗次数": 1, "我痛饮他者的遗忘": true, "获得护盾次数": 5 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['月弓·闪避反击治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: '至臻的完满伤害',
    params: { "重击使用次数": 1, "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "月相流转": true, "处于空中": true, "自我治疗次数": 1, "获得护盾次数": 6 },
    dmg: ({ talent, cons }, dmg) => dmg(talent.t['至臻的完满伤害'] + (cons >= 6 ? 1600 : 0), 'q')
  },
  {
    title: '至臻的完满治疗',
    params: { "重击使用次数": 1, "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "月相流转": true, "处于空中": true, "自我治疗次数": 1, "获得护盾次数": 6 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['至臻的完满治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: '满月领域持续治疗',
    params: { "重击使用次数": 1, "共鸣技能使用次数": 3, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "常态攻击使用次数": 6, "常态攻击命中次数": 10, "常态攻击造成伤害次数": 10, "月相流转": true, "处于空中": true, "自我治疗次数": 9, "获得护盾次数": 11 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['满月领域周期治疗量'] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "苍白死光的祝颂": 10, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `变奏入场伤害`,
    params: { "获得护盾次数": 1 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: i1.dmg * 7 + i2.dmg,
        avg: i1.avg * 7 + i2.avg
      }
    }
  },
  {
    title: '延奏离场伤害',
    params: { "延奏技能使用次数": 1 },
    dmg: ({ talent }, dmg) => dmg(100, 'o')
  }
]