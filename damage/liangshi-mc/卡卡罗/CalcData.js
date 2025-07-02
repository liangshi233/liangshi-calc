import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "卡卡罗"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 2, NormalDmg: 2 },
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
    params: { NormalUse: 2, NormalHit: 3, NormalDmg: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 7, NormalDmg: 7 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg * 3,
        avg: a1.avg + a2.avg * 3
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 10, NormalDmg: 10 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 5, ChargedDmg: 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      let a2 = dmg(talent.a['闪避反击伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 3 + a2.dmg,
        avg: a1.avg * 3 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}一段伤害`,
    params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['灭杀指令一段伤害2'][0], 'e')
      let e2 = dmg(talent.e['灭杀指令一段伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg,
        avg: e1.avg * 2 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}二段伤害`,
    params: { SkillsUse: 2, SkillsHit: 6, SkillsDmg: 6 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['灭杀指令二段伤害2'][0], 'e')
      let e2 = dmg(talent.e['灭杀指令二段伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 2 + e2.dmg,
        avg: e1.avg * 2 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}三段伤害`,
    params: { SkillsUse: 3, SkillsHit: 8, SkillsDmg: 8 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['灭杀指令三段伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 2,
        avg: e1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, Deathblade_Gear: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}一段`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, Deathblade_Gear: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['猎犬剑技·狂噬影狱第一段'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}二段`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, Deathblade_Gear: true, NormalUse: 2, NormalHit: 5, NormalDmg: 5 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['猎犬剑技·狂噬影狱第二段2'][0], 'a')
      let q2 = dmg(talent.q['猎犬剑技·狂噬影狱第二段2'][1], 'a')
      return {
        dmg: q1.dmg * 2 + q2.dmg * 2,
        avg: q1.avg * 2 + q2.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}三段`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, Deathblade_Gear: true, NormalUse: 3, NormalHit: 6, NormalDmg: 6 },
    dmg: ({ talent }, dmg) => dmg(talent.q['猎犬剑技·狂噬影狱第三段'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}四段`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, Deathblade_Gear: true, NormalUse: 4, NormalHit: 12, NormalDmg: 12 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['猎犬剑技·狂噬影狱第四段2'][0], 'a')
      return {
        dmg: q1.dmg * 6,
        avg: q1.avg * 6
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}五段`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, Deathblade_Gear: true, NormalUse: 5, NormalHit: 14, NormalDmg: 14 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['猎犬剑技·狂噬影狱第五段2'][0], 'a')
      return {
        dmg: q1.dmg * 2,
        avg: q1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
    params: { BurstUse: 1, BurstDmg: 6, BurstHit: 6, EnergyUse: 1, ChargedUse: 1 },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['重击伤害2'][0], 'q')
      return {
        dmg: q1.dmg * 5,
        avg: q1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.a2Name}仁慈伤害`,
    params: { ChargedUse: 1, ChargedHit: 9, ChargedDmg: 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['「仁慈」伤害2'][0], 'a2')
      let a2 = dmg(talent.t['「仁慈」伤害2'][1], 'a2')
      return {
        dmg: a1.dmg * 8 + a2.dmg,
        avg: a1.avg * 8 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}死告伤害`,
    params: { ChargedUse: 1, BurstDmg: 9, BurstHit: 9 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['「死告」伤害2'][0], 'q')
      let a2 = dmg(talent.t['「死告」伤害2'][1], 'q')
      return {
        dmg: a1.dmg * 8 + a2.dmg,
        avg: a1.avg * 8 + a2.avg
      }
    }
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: (i1.dmg + i2.dmg) * 2,
        avg: (i1.avg + i2.avg) * 2
      }
    }
  },
  {
    title: `变奏必要的手段伤害`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.q['「必要的手段」伤害2'][0], 'i')
      return {
        dmg: i1.dmg * 2,
        avg: i1.avg * 2
      }
    }
  },
  {
    title: `延奏离场伤害`,
    dmg: ({ talent }, dmg) => {
      let o1 = dmg(talent.o['技能伤害2'][0], 'o')
      let o2 = dmg(talent.o['技能伤害2'][1], 'o')
      return {
        dmg: o1.dmg + o2.dmg,
        avg: o1.avg + o2.avg
      }
    }
  }
]