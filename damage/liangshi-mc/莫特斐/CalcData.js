import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "莫特斐"
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
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第三段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第四段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第四段伤害2'][2], 'a')
      return {
        dmg: a1.dmg * 4 + a2.dmg,
        avg: a1.avg * 4 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `满蓄力${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}单段伤害`,
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
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 8,
        avg: e1.avg * 8
      }
    }
  },
  {
    title: `强化${TalentName.eName}伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['怒火赋格伤害'], 'e')
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 1, "共鸣解放造成伤害次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['暴烈终曲伤害'], 'q')
  },
  {
    title: `${TalentName.qName}加强音伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 10, "共鸣解放造成伤害次数": 10, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['加强音伤害'], 'q,x')
  },
  {
    title: `变奏入场伤害`,
    dmgKey: 'i',
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  }
]