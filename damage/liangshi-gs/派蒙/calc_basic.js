import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    title: '圣遗物输出结果',
    dmg: ({ artis }) => {
      return {
        avg: artis,
        type: 'text'
      }
    }
  },
  {
    title: '武器输出结果',
    dmg: ({ weapon }) => {
      return {
        avg: weapon.name,
        type: 'text'
      }
    }
  },
  {
    title: '命之座等级输出结果',
    dmg: ({ cons }) => {
      return {
        avg: cons,
        type: 'text'
      }
    }
  },
  {
    title: '100%攻击力伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%防御力伤害',
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.e['技能伤害防御力'] * calc(attr.def) / 100 + (attr.e.plus || 0)
      return basic(ret, 'e')
    }
  }, {
    title: '100%生命值伤害',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害生命值'] / 100, 'e')
  }, {
    title: '护盾吸收量',
    dmg: ({ talent, calc, attr }, { shield }) =>
      shield((talent.q['护盾吸收量1'] * calc(attr.hp) / 100 + talent.q['护盾吸收量2'] * 1) * 1)
  }, {
    title: '治疗量',
    dmg: ({ talent, attr, calc }, { heal }) =>
      heal(talent.q['治疗量1'] * calc(attr.hp) / 100 + talent.q['治疗量2'] * 1)
  }, {
    title: '100%攻击力蒸发',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击力融化',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '蔓激化伤害提升',
    dmg: ({ talent }, dmg) => dmg(talent.e['蔓激化伤害提升'], 'e', 'spread')
  }, {
    title: '超激化伤害提升',
    dmg: ({ talent }, dmg) => dmg(talent.e['超激化伤害提升'], 'e', 'aggravate')
  }, {
    title: '扩散反应伤害',
    dmg: ({}, { reaction }) => reaction('swirl')
  }, {
    title: '燃烧反应伤害',
    dmg: ({}, { reaction }) => reaction('burning')
  }, {
    title: '超导反应伤害',
    dmg: ({}, { reaction }) => reaction('superConduct')
  }, {
    title: '感电反应伤害',
    dmg: ({}, { reaction }) => reaction('electroCharged')
  }, {
    title: '超载反应伤害',
    dmg: ({}, { reaction }) => reaction('overloaded')
  }, {
    title: '碎冰反应伤害',
    dmg: ({}, { reaction }) => reaction('shatter')
  }, {
    title: '草原核伤害',
    dmg: ({ calc, attr }, { reaction }) => {
      return reaction('bloom')
    }
  }, {
    title: '超绽放伤害',
    dmg: ({ calc, attr }, { reaction }) => {
      return reaction('hyperBloom')
    }
  }, {
    title: '烈绽放伤害',
    dmg: ({ calc, attr }, { reaction }) => {
      return reaction('burgeon')
    }
  }
]

export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs]
