import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "白芷"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1, Concentration: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, Concentration: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 9, NormalDmg: 9, Concentration: 3 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 7,
        avg: a1.avg * 7
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 10, NormalDmg: 10, Concentration: 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['重击伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.tName}治疗量`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, HealNumber: 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.t['念意治疗量2'][0] + talent.t['念意治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['闪避反击伤害'], 'a')
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, HealNumber: 1, Concentration: 4 },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  },
  {
    title: `${TalentName.eName}治疗量`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, HealNumber: 1, Concentration: 4 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.e['治疗量2'][0] + talent.e['治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}释放治疗量`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, HealNumber: 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['频隙回响治疗量2'][0] + talent.q['频隙回响治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `${TalentName.qName}持续治疗量`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1, HealNumber: 5 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['刹那合弥治疗量2'][0] + talent.q['刹那合弥治疗量2'][1] * calc(attr.hp) / 100)
  },
  {
    title: `变奏入场伤害`,
    params: { HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.i['技能伤害'], 'i')
  },
  {
    title: '变奏治疗量',
    params: { HealNumber: 1 },
    dmg: ({ attr, calc, talent }, { heal }) => heal(talent.i['覆盖雪流盈治疗量2'][0] + talent.i['覆盖雪流盈治疗量2'][1] * calc(attr.hp) / 100)
  }
]