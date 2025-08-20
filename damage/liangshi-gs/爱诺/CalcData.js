import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "爱诺"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
      let a2 = dmg(talent.a['三段伤害2'][1], 'a', 'phy')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a2Name}循环伤害`,
    params: { ChargedUse: 1, ChargedHit: 3, ChargedDmg: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
  },
  {
    title: `${TalentName.a2Name}循环伤害`,
    dmgKey: 'z',
    params: { ChargedUse: 1, ChargedHit: 5, ChargedDmg: 5 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  },
  {
    title: `${TalentName.eName}一段伤害`,
    params: { SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['一段伤害'], 'e')
  },
  {
    title: `${TalentName.eName}一段蒸发`,
    params: { SkillsHit: 1, SkillsDmg: 1, FireAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['一段伤害'], 'e', 'vaporize')
  },
  {
    title: `${TalentName.eName}二段伤害`,
    dmgKey: 'e',
    params: { SkillsHit: 2, SkillsDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.e['二段伤害'], 'e')
  },
  {
    title: `${TalentName.eName}二段蒸发`,
    params: { SkillsHit: 2, SkillsDmg: 2, FireAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['二段伤害'], 'e', 'vaporize')
  },
  {
    title: `${TalentName.qName}水弹伤害`,
    dmgKey: 'q',
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['水弹伤害'], 'q')
  },
  {
    title: `${TalentName.qName}水弹蒸发`,
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1, FireAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['水弹伤害'], 'q', 'vaporize')
  },
  {
    check: ({ cons }) => cons >= 2,
    title: `${TalentName.c2Name}附加伤害`,
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1, Lunar: true, TruceTime: 4 },
    dmg: ({ calc, attr, talent }, { basic }) => basic(calc(attr.mastery) + calc(attr.atk) * 25 / 100, 'q')
  },
  {
    title: '单人月感电伤害',
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, Lunar: true, WaterAttachment: true, MineAttachment: true, Moonsign: 1 },
    dmg: ({}, { reaction }) => reaction('lunarCharged')
  },
  {
    title: '满辉单人月感电伤害',
    dmgKey: 'r',
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, Lunar: true, WaterAttachment: true, MineAttachment: true, Moonsign: 3 },
    dmg: ({}, { reaction }) => reaction('lunarCharged')
  },
  {
    title: '绽放伤害',
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, Moonsign: 1 },
    dmg: ({}, { reaction }) => reaction('bloom')
  },
  {
    title: '满辉绽放伤害',
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2, Moonsign: 3 },
    dmg: ({}, { reaction }) => reaction('bloom')
  }
]
