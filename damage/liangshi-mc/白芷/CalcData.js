import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "白芷"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1, "念意": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "念意": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9, "念意": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 7,
        avg: a1.avg * 7
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 10, "常态攻击造成伤害次数": 10, "念意": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.tName}治疗量`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['念意治疗量2'][0] + talent.t['念意治疗量2'][1] * calc(attr.hp) / 100)
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
    title: `${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1, "自我治疗次数": 1, "念意": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  },
  {
    title: `${TalentName.eName}治疗量`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1, "自我治疗次数": 1, "念意": 4 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.e['治疗量2'][0] + talent.e['治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放治疗量`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['频隙回响治疗量2'][0] + talent.q['频隙回响治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `${TalentName.qName}持续治疗量`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "自我治疗次数": 5 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['刹那合弥治疗量2'][0] + talent.q['刹那合弥治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `变奏入场伤害`,
    params: { "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  },
  {
    title: '变奏治疗量',
    params: { "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.i['覆盖雪流盈治疗量2'][0] + talent.i['覆盖雪流盈治疗量2'][1] * calc(attr.hp) / 100)
  }
]