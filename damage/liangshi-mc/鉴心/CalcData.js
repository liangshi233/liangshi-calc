import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "鉴心"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 4, NormalDmg: 4 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第二段伤害2'][0], 'a')
      let a2 = dmg(talent.a['第二段伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 8, NormalDmg: 8 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['第三段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 4,
        avg: a1.avg * 4
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    params: { NormalUse: 4, NormalHit: 9, NormalDmg: 9 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, fly: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['空中攻击伤害'], 'a,a3')
  },
  {
    title: `${TalentName.a4Name}伤害`,
    params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['闪避反击伤害2'][0], 'a')
      let a2 = dmg(talent.a['闪避反击伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}行气反击伤害`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['行气反击伤害'], 'e')
  },
  {
    title: `${TalentName.eName}降气反击伤害`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['降气反击伤害'], 'e')
  },
  {
    title: `${TalentName.qName}持续伤害`,
    params: { BurstUse: 1, BurstDmg: 1, BurstHit: 1, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['共鸣解放持续伤害'], 'q')
  },
  {
    title: `${TalentName.qName}结束伤害`,
    params: { BurstUse: 1, BurstDmg: 10, BurstHit: 10, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['共鸣解放炸裂伤害'], 'q')
  },
  {
    title: '运气冲拳伤害',
    params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.t['冲拳伤害'], 'a2')
  },
  {
    title: '运气持续伤害',
    params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4, ShieldTime: 2, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['运气持续伤害'], 'a2')
  },
  {
    title: '小周天震气伤害',
    params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4, ShieldTime: 2, HealNumber: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['小周天震气伤害'], 'a2')
  },
  {
    title: '大周天·内震气伤害',
    params: { ChargedUse: 1, ChargedHit: 7, ChargedDmg: 7, ShieldTime: 5, HealNumber: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.t['小周天震气伤害'], 'a2')
  },
  {
    title: '大周天·外震气伤害',
    params: { ChargedUse: 1, ChargedHit: 11, ChargedDmg: 11, ShieldTime: 5, HealNumber: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.t['小周天震气伤害'], 'a2')
  },
  {
    title: '推手伤害',
    params: { ChargedUse: 1, ChargedHit: 11, ChargedDmg: 11, ShieldTime: 5, HealNumber: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.t['推手伤害'], 'a2')
  },
  {
    title: '运气护盾量',
    params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4, ShieldTime: 2, HealNumber: 1 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['未达小周天最终盾量2'][0] * calc(attr.atk) + talent.t['未达小周天最终盾量2'][1] / 100)
  },
  {
    title: '小周天护盾量',
    params: { ChargedUse: 1, ChargedHit: 4, ChargedDmg: 4, ShieldTime: 3, HealNumber: 1 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['小周天最终盾量2'][0] * calc(attr.atk) + talent.t['小周天最终盾量2'][1] / 100)
  },
  {
    title: '大周天·内最终盾量',
    params: { ChargedUse: 1, ChargedHit: 11, ChargedDmg: 11, ShieldTime: 5, HealNumber: 2 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['大周天·内最终盾量2'][0] * calc(attr.atk) + talent.t['大周天·内最终盾量2'][1] / 100)
  },
  {
    title: '大周天·外最终盾量',
    params: { ChargedUse: 1, ChargedHit: 11, ChargedDmg: 11, ShieldTime: 5, HealNumber: 2 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['大周天·外最终盾量2'][0] * calc(attr.atk) + talent.t['大周天·外最终盾量2'][1] / 100)
  },
  {
    title: '护盾每跳治疗',
    params: { ChargedUse: 1, ChargedHit: 11, ChargedDmg: 11, ShieldTime: 5, HealNumber: 2 },
    dmg: ({ talent, calc, attr }, { heal }) => heal(talent.t['护盾回复生命值2'][0] * calc(attr.atk) + talent.t['护盾回复生命值2'][1] / 100)
  },
  {
    title: `变奏入场伤害`,
    dmg: ({ talent }, dmg) => {
      let i1 = dmg(talent.i['技能伤害2'][0], 'i')
      let i2 = dmg(talent.i['技能伤害2'][1], 'i')
      return {
        dmg: i1.dmg * 3 + i2.dmg,
        avg: i1.avg * 3 + i2.avg
      }
    }
  }
]