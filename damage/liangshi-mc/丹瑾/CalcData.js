import { ObTalentName } from '../index.js'

let CharacterName = "丹瑾"
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
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第三段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a2Name}缭乱伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 3, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "重击使用次数": 1, "重击命中次数": 3, "重击造成伤害次数": 3, "生命降低次数": 3, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let t1 = dmg(talent.t['缭乱伤害2'][0], 'a2')
      return {
        dmg: t1.dmg * 3,
        avg: t1.avg * 3
      }
    }
  },
  {
    title: `满能${TalentName.a2Name}缭乱`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 3, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "重击使用次数": 1, "重击命中次数": 3, "重击造成伤害次数": 3, "生命降低次数": 3, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => {
      let t1 = dmg(talent.t['满能缭乱伤害2'][0], 'a2')
      return {
        dmg: t1.dmg * 7,
        avg: t1.avg * 7
      }
    }
  },
  {
    title: `${TalentName.a2Name}后纷落伤害`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 3, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "生命降低次数": 3, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['纷落伤害'], 'a2')
  },
  {
    title: `满能${TalentName.a2Name}后纷落`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 3, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "生命降低次数": 3, "自我治疗次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['满能纷落伤害2'][0], 'a2')
  },
  {
    title: `${TalentName.a2Name}缭乱治疗`,
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 3, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "生命降低次数": 3, "自我治疗次数": 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.i['缭乱治疗量'] * calc(attr.hp) / 100)
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { "空中攻击使用次数": 1, "空中攻击命中次数": 1, "空中攻击造成伤害次数": 1, "处于空中": true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}赤华伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "生命降低次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}朱蚀一段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "生命降低次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['朱蚀一段伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}朱蚀二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 2, "常态攻击造成伤害次数": 2, "共鸣技能使用次数": 2, "共鸣技能命中次数": 4, "共鸣技能造成伤害次数": 4, "生命降低次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['朱蚀二段伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}烬灭一段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "生命降低次数": 1 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['烬灭一段伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}烬灭二段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 2, "共鸣技能命中次数": 5, "共鸣技能造成伤害次数": 5, "生命降低次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['烬灭二段伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 3,
        avg: e1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.eName}烬灭三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3, "共鸣技能使用次数": 3, "共鸣技能命中次数": 8, "共鸣技能造成伤害次数": 8, "生命降低次数": 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['烬灭三段伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 3,
        avg: e1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.qName}伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放命中次数": 9, "共鸣解放造成伤害次数": 9, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['连续攻击伤害2'][0], 'q')
      let q2 = dmg(talent.q['绯刹爆发伤害'], 'q')
      return {
        dmg: q1.dmg * 8 + q2.dmg,
        avg: q1.avg * 8 + q2.avg
      }
    }
  },
  {
    title: '变奏伤害',
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  }
]