import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "菲比"
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
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 11, "常态攻击造成伤害次数": 11 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 8,
        avg: a1.avg * 8
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4
      }
    }
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 8,
        avg: a1.avg * 8
      }
    }
  },
  {
    title: `${TalentName.eName}伤害`,
    dmgKey: 'e',
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}折射伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 6, "共鸣技能造成伤害次数": 6 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['【镜之环】折射圣辉伤害2'][0], 'a')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}后${TalentName.aNameT}一段`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['夏弥尔之星第一段伤害'], 'a')
  },
  {
    title: `${TalentName.eName}后${TalentName.aNameT}二段`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "常态攻击使用次数": 2, "常态攻击命中次数": 3, "常态攻击造成伤害次数": 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.e['夏弥尔之星第二段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}后${TalentName.aNameT}三段`,
    dmgKey: 'a',
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 2, "共鸣技能造成伤害次数": 2, "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.e['夏弥尔之星第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 6,
        avg: a1.avg * 6
      }
    }
  },
  {
    title: '圣祷赦罪伤害',
    params: { "光噪效应": 1, Prayer: "Absolution", "重击使用次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['圣祷赦罪伤害'], 't')
  },
  {
    title: '显明告解伤害',
    params: { "光噪效应": 1, Prayer: "Confession", "共鸣技能使用次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['显明告解伤害'], 't')
  },
  {
    title: `赦罪${TalentName.a2NameT}星辉伤害`,
    dmgKey: 'z',
    params: { "光噪效应": 3, Prayer: "Absolution", "重击使用次数": 4, "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['重击·星辉伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `告解${TalentName.a2NameT}星辉伤害`,
    params: { "光噪效应": 3, Prayer: "Confession", "重击使用次数": 4, "常态攻击使用次数": 3, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['重击·星辉伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `赦罪${TalentName.qName}伤害`,
    params: { "光噪效应": 3, Prayer: "Absolution", "共鸣解放使用次数": 1, "共鸣解放命中次数": 1, "共鸣解放造成伤害次数": 1, "共鸣能量降低次数": 1 },
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'] + 255, 'q')
  },
  {
    title: `告解${TalentName.qName}伤害`,
    params: { "光噪效应": 10, Prayer: "Confession", "共鸣解放使用次数": 1, "共鸣解放命中次数": 1, "共鸣解放造成伤害次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `变奏入场伤害`,
    dmgKey: 'i',
    dmg: ({ talent }, dmg) => {
      let idmg = dmg(talent.i['技能伤害'], 'i')
      return {
        dmg: idmg.dmg,
        avg: idmg.avg
      }
    }
  },
  {
    title: `赦罪延奏伤害`,
    dmgKey: 'o',
    params: { "光噪效应": 3, Prayer: "Absolution", "延奏技能使用次数": 1, "延奏技能命中次数": 8, "延奏技能造成伤害次数": 8, "协奏能量消耗次数": 1 },
    dmg: ({}, dmg) => {
      let odmg = dmg(97.92625, 'o')
      return {
        dmg: odmg.dmg * 8,
        avg: odmg.avg * 8
      }
    }
  },
  {
    title: `告解延奏伤害`,
    params: { "光噪效应": 3, Prayer: "Confession", "延奏技能使用次数": 1, "延奏技能命中次数": 8, "延奏技能造成伤害次数": 8, "协奏能量消耗次数": 1 },
    dmg: ({}, dmg) => {
      let odmg = dmg(66.05125, 'o')
      return {
        dmg: odmg.dmg * 8,
        avg: odmg.avg * 8
      }
    }
  },
  {
    title: '光噪效应伤害',
    dmgKey: 'r',
    params: { "光噪效应": 9 },
    dmg: ({}, { reaction }) => reaction('Spectro')
  }
]