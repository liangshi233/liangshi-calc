import { Format } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "鉴心"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { "常态攻击使用次数": 1, "常态攻击命中次数": 1, "常态攻击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { "常态攻击使用次数": 2, "常态攻击命中次数": 4, "常态攻击造成伤害次数": 4 },
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
    params: { "常态攻击使用次数": 3, "常态攻击命中次数": 8, "常态攻击造成伤害次数": 8 },
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
    params: { "常态攻击使用次数": 4, "常态攻击命中次数": 9, "常态攻击造成伤害次数": 9 },
    dmg: ({ talent }, dmg) => dmg(talent.a['第四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { "重击使用次数": 1, "重击命中次数": 1, "重击造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
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
      let a2 = dmg(talent.a['闪避反击伤害2'][1], 'a')
      return {
        dmg: a1.dmg * 2 + a2.dmg,
        avg: a1.avg * 2 + a2.avg
      }
    }
  },
  {
    title: `${TalentName.eName}行气反击伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['行气反击伤害'], 'e')
  },
  {
    title: `${TalentName.eName}降气反击伤害`,
    params: { "共鸣技能使用次数": 1, "共鸣技能命中次数": 1, "共鸣技能造成伤害次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['降气反击伤害'], 'e')
  },
  {
    title: `${TalentName.qName}持续伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 1, "共鸣解放命中次数": 1, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['共鸣解放持续伤害'], 'q')
  },
  {
    title: `${TalentName.qName}结束伤害`,
    params: { "共鸣解放使用次数": 1, "共鸣解放造成伤害次数": 10, "共鸣解放命中次数": 10, "共鸣能量降低次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['共鸣解放炸裂伤害'], 'q')
  },
  {
    title: '运气冲拳伤害',
    params: { "重击使用次数": 1, "重击命中次数": 2, "重击造成伤害次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.t['冲拳伤害'], 'a2')
  },
  {
    title: '运气持续伤害',
    params: { "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "护盾保护时间": 2, "自我治疗次数": 1, "获得护盾次数": 1 },
    dmg: ({ talent }, dmg) => dmg(talent.t['运气持续伤害'], 'a2')
  },
  {
    title: '小周天震气伤害',
    params: { "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "护盾保护时间": 2, "自我治疗次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent }, dmg) => dmg(talent.t['小周天震气伤害'], 'a2')
  },
  {
    title: '大周天·内震气伤害',
    params: { "重击使用次数": 1, "重击命中次数": 7, "重击造成伤害次数": 7, "护盾保护时间": 5, "自我治疗次数": 2, "获得护盾次数": 3 },
    dmg: ({ talent }, dmg) => dmg(talent.t['大周天·内震气伤害'], 'a2')
  },
  {
    title: '大周天·外震气伤害',
    params: { "重击使用次数": 1, "重击命中次数": 11, "重击造成伤害次数": 11, "护盾保护时间": 5, "自我治疗次数": 2, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.t['大周天·外震气伤害'], 'a2')
  },
  {
    title: '推手伤害',
    params: { "重击使用次数": 1, "重击命中次数": 11, "重击造成伤害次数": 11, "护盾保护时间": 5, "自我治疗次数": 2, "获得护盾次数": 4 },
    dmg: ({ talent }, dmg) => dmg(talent.t['推手伤害'], 'a2')
  },
  {
    title: '运气护盾量',
    params: { "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "护盾保护时间": 2, "自我治疗次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['未达小周天最终盾量2'][0] * calc(attr.atk) + talent.t['未达小周天最终盾量2'][1] / 100)
  },
  {
    title: '小周天护盾量',
    params: { "重击使用次数": 1, "重击命中次数": 4, "重击造成伤害次数": 4, "护盾保护时间": 3, "自我治疗次数": 1, "获得护盾次数": 2 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['小周天最终盾量2'][0] * calc(attr.atk) + talent.t['小周天最终盾量2'][1] / 100)
  },
  {
    title: '大周天·内最终盾量',
    params: { "重击使用次数": 1, "重击命中次数": 11, "重击造成伤害次数": 11, "护盾保护时间": 5, "自我治疗次数": 2, "获得护盾次数": 3 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['大周天·内最终盾量2'][0] * calc(attr.atk) + talent.t['大周天·内最终盾量2'][1] / 100)
  },
  {
    title: '大周天·外最终盾量',
    params: { "重击使用次数": 1, "重击命中次数": 11, "重击造成伤害次数": 11, "护盾保护时间": 5, "自我治疗次数": 2, "获得护盾次数": 4 },
    dmg: ({ talent, attr, calc }, { shield }) => shield(talent.t['大周天·外最终盾量2'][0] * calc(attr.atk) + talent.t['大周天·外最终盾量2'][1] / 100)
  },
  {
    title: '护盾每跳治疗',
    params: { "重击使用次数": 1, "重击命中次数": 11, "重击造成伤害次数": 11, "护盾保护时间": 5, "自我治疗次数": 2, "获得护盾次数": 4 },
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