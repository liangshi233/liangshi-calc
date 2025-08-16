import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "维里奈"
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
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 5, "常态攻击造成伤害次数": 5 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}五段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第五段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a2Name}星星花绽放伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "光合能量": 4, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['重击·星星花绽放伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}一段伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击第一段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}二段伤害`,
    params: { "空中攻击使用次数": 2, "空中攻击命中次数": 2, "空中攻击造成伤害次数": 2, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击第二段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}三段伤害`,
    params: { "空中攻击使用次数": 3, "空中攻击命中次数": 4, "空中攻击造成伤害次数": 4, "处于空中": true },
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['空中攻击第三段伤害2'][0], 'a,a3')
      return {
        dmg: a3.dmg * 2,
        avg: a3.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a3Name}星星花绽放一段`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true, "光合能量": 4, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击·星星花绽放第一段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}星星花绽放二段`,
    params: { "空中攻击使用次数": 2, "空中攻击命中次数": 2, "空中攻击造成伤害次数": 2, "处于空中": true, "光合能量": 3, "自我治疗次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击·星星花绽放第二段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}星星花绽放三段`,
    params: { "空中攻击使用次数": 3, "空中攻击命中次数": 5, "空中攻击造成伤害次数": 5, "处于空中": true, "光合能量": 2, "自我治疗次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['空中攻击·星星花绽放第三段伤害2'][0], 'a,a3')
      return {
        dmg: a3.dmg * 3,
        avg: a3.avg * 3
      }
    }
  },
  {
    title: '星星花绽放治疗',
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6, "自我治疗次数": 4, "处于空中": true, "光合能量": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['星星花绽放治疗量2'][0] + talent.t['星星花绽放治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
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
    title: `${TalentName.qName}释放伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放治疗`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['草木生长治疗量2'][0] + talent.q['草木生长治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.qName}协同伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 3, "共鸣解放命中次数": 3, "共鸣能量降低次数": 1, "自我治疗次数": 2, "光合标记": true },
    dmg: ({ talent }, dmg) => dmg(talent.q['协同攻击伤害'], 'q,x')
  },
  {
    title: `${TalentName.qName}协同治疗`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 3, "共鸣解放命中次数": 3, "共鸣能量降低次数": 1, "自我治疗次数": 2, "光合标记": true },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['协同攻击治疗量2'][0] + talent.q['协同攻击治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  },
  {
    title: '延奏每段治疗',
    params: { "自我治疗次数": 3, "延奏技能使用次数": 1 },
    dmg: ({ attr, calc }, { heal }) => heal(calc(attr.atk) / 100 * 19)
  }
]