import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "卜灵"
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
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
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
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害2'], 'a')
  },
  {
    title: `${TalentName.a2Name}山雷颐伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7, "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击·山雷颐伤害'], 'a2')
  },
  {
    title: `${TalentName.a2Name}雷山小过伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7, "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击·雷山小过伤害'], 'a2')
  },

  {
    title: `${TalentName.a2Name}艮为山治疗`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7, "重击使用次数": 1, "自我治疗次数": 1 },
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['重击·艮为山治疗量2'][1] * calc(attr.atk) / 100 + talent.q['重击·艮为山治疗量2'][0])
  },
  {
    title: `${TalentName.a2Name}震为雷治疗`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 7, "常态攻击造成伤害次数": 7, "重击使用次数": 1, "自我治疗次数": 1 },
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['重击·震为雷治疗量2'][1] * calc(attr.atk) / 100 + talent.q['重击·震为雷治疗量2'][0])
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}释放伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['引雷符伤害'], 'e')
  },
  {
    title: `${TalentName.eName}牵引单段伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 11, "共鸣技能造成伤害次数": 11 },
    dmg: ({ talent }, dmg) => dmg(talent.e['牵引持续伤害2'][0], 'e')
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['飞雷诀伤害'], 'q')
  },
  {
    title: `${TalentName.qName}归一释放伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1, "飞雷诀·归一": true },
    dmg: ({ talent }, dmg) => dmg(talent.q['飞雷诀·归一伤害'], 'q')
  },
  {
    title: `${TalentName.qName}归一单段伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 10, "共鸣解放命中次数": 10, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['五雷荡煞阵持续伤害'], 'q')
  },
  {
    title: `变奏入场伤害`,
    params: { "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  },
  {
    title: `变奏入场治疗`,
    params: { "自我治疗次数": 1 },
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['重击·震为雷治疗量2'][1] * calc(attr.atk) / 100 + talent.q['重击·震为雷治疗量2'][0])
  }
]