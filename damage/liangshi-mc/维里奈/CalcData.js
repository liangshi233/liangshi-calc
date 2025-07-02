import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "维里奈"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4 },
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
    params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}五段伤害`,
    params: { NormalUse: 4, NormalHit: 6, NormalDmg: 6 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第五段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a2Name}星星花绽放伤害`,
    params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, Photosynthesis_Energy: 4, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['重击·星星花绽放伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}一段伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击第一段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}二段伤害`,
    params: { PlungingUse: 2, PlungingHit: 2, PlungingDmg: 2, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击第二段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}三段伤害`,
    params: { PlungingUse: 3, PlungingHit: 4, PlungingDmg: 4, fly: true },
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['空中攻击第三段伤害2'][0], 'a,a3')
      return {
        dmg: a3.dmg * 2,
        avg: a3.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a3Name}星星花绽放一段`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true, Photosynthesis_Energy: 4, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击·星星花绽放第一段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}星星花绽放二段`,
    params: { PlungingUse: 2, PlungingHit: 2, PlungingDmg: 2, fly: true, Photosynthesis_Energy: 3, HealNumber: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击·星星花绽放第二段伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a3Name}星星花绽放三段`,
    params: { PlungingUse: 3, PlungingHit: 5, PlungingDmg: 5, fly: true, Photosynthesis_Energy: 2, HealNumber: 3 },
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['空中攻击·星星花绽放第三段伤害2'][0], 'a,a3')
      return {
        dmg: a3.dmg * 3,
        avg: a3.avg * 3
      }
    }
  },
  {
    title: '星星花绽放治疗',
    params: { NormalUse: 4, NormalHit: 6, NormalDmg: 6, HealNumber: 4, fly: true, Photosynthesis_Energy: 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['星星花绽放治疗量2'][0] + talent.t['星星花绽放治疗量2'][1] * calc(attr.atk) / 100)
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
    title: `${TalentName.eName}伤害`,
    params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      let e2 = dmg(talent.e['技能伤害2'][1], 'e')
      return {
        dmg: e1.dmg * 3 + e2.dmg,
        avg: e1.avg * 3 + e2.avg
      }
    }
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放治疗`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, HealNumber: 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['草木生长治疗量2'][0] + talent.q['草木生长治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `${TalentName.qName}协同伤害`,
    params: { BurstUse: 1, BurstDmg: 3, BurstHit: 3, EnergyUse: 1, HealNumber: 2, Photosynthesis_Mark: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['协同攻击伤害'], 'q,x')
  },
  {
    title: `${TalentName.qName}协同治疗`,
    params: { BurstUse: 1, BurstDmg: 3, BurstHit: 3, EnergyUse: 1, HealNumber: 2, Photosynthesis_Mark: true },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['协同攻击治疗量2'][0] + talent.q['协同攻击治疗量2'][1] * calc(attr.atk) / 100)
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  },
  {
    title: '延奏每段治疗',
    params: { HealNumber: 3, OutroUse: 1 },
    dmg: ({ attr, calc }, { heal }) => heal(calc(attr.atk) / 100 * 19)
  }
]