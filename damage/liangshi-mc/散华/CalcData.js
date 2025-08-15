import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "散华"
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
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 6, "常态攻击造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 8, "常态攻击造成伤害次数": 8 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第四段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}五段伤害`,
    params: { "常态攻击使用次数": 5, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第五段伤害'], 'a')
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
    title: `${TalentName.a2Name}爆裂伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['爆裂伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: '冰川爆炸伤害',
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['冰川爆炸伤害'], 'e')
  },
  {
    title: '冰棱爆炸伤害',
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['冰棱爆炸伤害'], 'e')
  },
  {
    title: '冰棘爆炸伤害',
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['冰棘爆炸伤害'], 'e')
  },
  {
    title: `${TalentName.a3Name}一段伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击第一段伤害'], 'a,a3')
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
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  }
]