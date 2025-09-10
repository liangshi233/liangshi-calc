import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "奈芙尔"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4 },
    dmg: ({ talent }, dmg) => {
      let a = dmg(talent.a['三段伤害2'][0], 'a')
      return {
        dmg: a.dmg * 2,
        avg: a.avg * 2
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5 },
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
  },
  {
    title: `${TalentName.eName}伤害`,
    dmgKey: 'e',
    params: { SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent, calc, attr }, { basic }) => basic((calc(attr.atk) * talent.e['技能伤害2'][0] + calc(attr.mastery) * talent.e['技能伤害2'][1]) / 100, 'e')
  },
  {
    title: `满层满辉${TalentName.eNameT}后${TalentName.a2NameT}自身一段`,
    params: { SkillsHit: 1, SkillsDmg: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Phantasm_Performance: true },
    dmg: ({ talent, calc, attr, cons, params }, { basic }) => basic(((calc(attr.atk) * talent.e['幻戏自身一段伤害2'][0] + calc(attr.mastery) * talent.e['幻戏自身一段伤害2'][1]) / 100) * (1 + Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)) / 10), 'a2')
  },
  {
    title: `满层满辉${TalentName.eNameT}后${TalentName.a2NameT}自身二段`,
    params: { SkillsHit: 1, SkillsDmg: 1, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, Phantasm_Performance: true },
    dmg: ({ talent, calc, attr, cons, params }, { basic }) => {
      let c0 = basic(((calc(attr.atk) * talent.e['幻戏自身二段伤害2'][0] + calc(attr.mastery) * talent.e['幻戏自身二段伤害2'][1]) / 100) * (1 + Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)) / 10), 'a2')
      let c6 = basic((calc(attr.mastery) * 85 / 100) * (1 + Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)) / 10), '', 'lunarBloom')
      return {
        dmg: cons >= 6 ? c6.dmg : c0.dmg,
        avg: cons >= 6 ? c6.avg : c0.avg
      }
    }
  },
  {
    title: `满层满辉${TalentName.eNameT}后${TalentName.a2NameT}协同一段`,
    params: { SkillsHit: 1, SkillsDmg: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Lunar: true, Phantasm_Performance: true },
    dmg: ({ talent, calc, attr, cons, params }, { basic }) => basic((calc(attr.mastery) * talent.e['幻戏虚影一段'] / 100) * (1 + Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)) / 10), '', 'lunarBloom')
  },
  {
    title: `满层满辉${TalentName.eNameT}后${TalentName.a2NameT}协同二段`,
    params: { SkillsHit: 1, SkillsDmg: 1, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, Lunar: true, Phantasm_Performance: true },
    dmg: ({ talent, calc, attr, cons, params }, { basic }) => basic((calc(attr.mastery) * talent.e['幻戏虚影二段'] / 100) * (1 + Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)) / 10), '', 'lunarBloom')
  },
  {
    title: `满层满辉${TalentName.eNameT}后${TalentName.a2NameT}协同三段`,
    dmgKey: 'z',
    params: { SkillsHit: 1, SkillsDmg: 1, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, Lunar: true, Phantasm_Performance: true },
    dmg: ({ talent, calc, attr, cons, params }, { basic }) => basic((calc(attr.mastery) * talent.e['幻戏虚影三段'] / 100) * (1 + Math.min((params.Veil_of_Falsehood || 99), (cons >= 2 ? 5 : 3)) / 10), '', 'lunarBloom')
  },
  {
    title: `${TalentName.qName}一段伤害`,
    params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
    dmg: ({ talent, calc, attr }, { basic }) => basic((calc(attr.atk) * talent.q['一段伤害2'][0] + calc(attr.mastery) * talent.q['一段伤害2'][1]) / 100, 'q')
  },
  {
    title: `${TalentName.qName}二段伤害`,
    dmgKey: 'q',
    params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, EnergyUse: 1 },
    dmg: ({ talent, calc, attr }, { basic }) => basic((calc(attr.atk) * talent.q['二段伤害2'][0] + calc(attr.mastery) * talent.q['二段伤害2'][1]) / 100, 'q')
  },
  {
    title: '绽放伤害',
    dmgKey: 'r',
    params: { Moonsign: 1 },
    dmg: ({}, { reaction }) => reaction('bloom')
  }
]
