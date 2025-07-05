import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "折枝"
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
    params: { NormalUse: 2, NormalHit: 7, NormalDmg: 7 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 8, NormalDmg: 8 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第三段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { SkillsUse: 4, SkillsHit: 8, SkillsDmg: 8, ChargedUse: 2, ChargedHit: 6, ChargedDmg: 6 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.t['重击·构形伤害2'][0], 'a2')
      return {
        dmg: a1.dmg * 3,
        avg: a1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 6, PlungingDmg: 6, fly: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['空中攻击伤害2'][0], 'a,a3')
      let a2 = dmg(talent.a['空中攻击伤害2'][1], 'a,a3')
      return {
        dmg: a1.dmg * 5 + a2.dmg,
        avg: a1.avg * 5 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 5, NormalDmg: 5 },
    dmg: ({ talent }, dmg) => {
      let a1 =  dmg(talent.a['闪避反击伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 5,
        avg: a1.avg * 5
      }
    }
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['技能伤害2'][0], 'e')
      return {
        dmg: e1.dmg * 3,
        avg: e1.avg * 3
      }
    }
  },
  {
    title: `强化${TalentName.eName}伤害`,
    params: { SkillsUse: 3, SkillsHit: 5, SkillsDmg: 5 },
    dmg: ({ talent }, dmg) => dmg(talent.t['神来之笔伤害'], 'a')
  },
  {
    title: `极意·强化${TalentName.eName}`,
    params: { SkillsUse: 4, SkillsHit: 8, SkillsDmg: 8 },
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.t['极意·神来之笔伤害2'][0], 'a')
      return {
        dmg: e1.dmg * 3,
        avg: e1.avg * 3
      }
    }
  },
  {
    title: `${TalentName.qName}协同伤害`,
    params: { BurstUse: 1, BurstDmg: 6, BurstHit: 6, EnergyUse: 1, SkillsUse: 4, SkillsHit: 8, SkillsDmg: 8 },
    dmg: ({ talent }, dmg) => dmg(talent.q['墨鹤伤害'], 'a,x')
  },
  {
    title: `变奏入场伤害`,
    params: { HealNumber: 1 },
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      return {
        dmg: i1.dmg * 3,
        avg: i1.avg * 3
      }
    }
  }
]