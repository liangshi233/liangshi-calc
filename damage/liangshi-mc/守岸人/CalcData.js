import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "守岸人"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 3, NormalDmg: 3 },
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
    params: { NormalUse: 3, NormalHit: 6, NormalDmg: 6 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 7, NormalDmg: 7 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}耀星蝶伤害`,
    params: { NormalUse: 5, NormalHit: 9, NormalDmg: 9 },
    dmg: ({ talent }, dmg) => dmg(talent.t['耀星·蝶伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a2Name}演绎伤害`,
    params: { ChargedUse: 1, ChargedHit: 5, ChargedDmg: 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['演绎伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['下落攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}衍变伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['衍变伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.eName}治疗`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 1, Chaos_Theory: true },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['治疗量2'][1] * calc(attr.atk) / 100 + talent.q['治疗量2'][0])
  },
  {
    title: `${TalentName.eName}黯星蝶伤害`,
    params: { SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['黯星·蝶伤害'], 'e')
  },
  {
    title: `${TalentName.qName}单段治疗`,
    params: { BurstUse: 1, EnergyUse: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1])
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 1, NormalHit: 1, NormalDmg: 1, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}二段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 2, NormalHit: 3, NormalDmg: 3, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}三段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 3, NormalHit: 6, NormalDmg: 6, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}四段伤害`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 4, NormalHit: 7, NormalDmg: 7, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.a2Name}演绎伤害`,
    params: { BurstUse: 1, EnergyUse: 1, ChargedUse: 1, ChargedHit: 5, ChargedDmg: 5, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['演绎伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aName}耀星蝶`,
    params: { BurstUse: 1, EnergyUse: 1, NormalUse: 5, NormalHit: 9, NormalDmg: 9, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => dmg(talent.t['耀星·蝶伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.eName}黯星蝶`,
    dmgKey: 'e',
    params: { BurstUse: 1, EnergyUse: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['黯星·蝶伤害'], 'e')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.a3Name}衍变伤害`,
    params: { BurstUse: 1, EnergyUse: 1, PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ talent }, dmg) => dmg(talent.t['衍变伤害'], 'a3')
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => {
      let idmg = dmg(talent.i['启迪伤害2'][0], 'i')
      return {
        dmg: idmg.dmg * 5,
        avg: idmg.avg * 5
      }
    }
  },
  {
    title: '变奏入场治疗',
    params: { HealNumber: 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.i['启迪治疗量2'][1] * calc(attr.hp) / 100 + talent.i['启迪治疗量2'][0])
  },
  {
    title: `变奏洞悉伤害`,
    dmgKey: 'i',
    params: { HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ attr, calc, cons, talent }, { basic }) => {
      let idmg = basic(((cons >= 6 ? 42 : 0) + talent.i['洞悉伤害2'][0]) * calc(attr.hp) / 100, 'i')
      return {
        dmg: idmg.dmg * 3,
        avg: idmg.avg * 3
      }
    }
  },
  {
    title: '变奏洞悉治疗',
    params: { HealNumber: 1, Stellarealm: true, Supernal_Stellarealm: true },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.i['洞悉治疗量2'][1] * calc(attr.hp) / 100 + talent.i['洞悉治疗量2'][0])
  }
]