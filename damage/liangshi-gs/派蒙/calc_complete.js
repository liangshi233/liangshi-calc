import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    title: '圣遗物输出结果',
    dmg: ({ artis, attr, calc, talent }) => {
      return {
        avg: artis,
        type: 'text'
      }
    }
  }, {
    title: '武器输出结果',
    dmg: ({ artis, attr, calc, talent, weapon }) => {
      return {
        avg: weapon.name,
        type: 'text'
      }
    }
  }, {
    title: '命之座等级输出结果',
    dmg: ({ artis, attr, calc, talent, weapon, cons }) => {
      return {
        avg: cons,
        type: 'text'
      }
    }
  }, {
    title: '100%攻击力伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击加100%攻击',
    params: { atkPct: true, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击力减10%抗性',
    params: { atkPct: false, kx: true, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击力加100%伤害',
    params: { atkPct: false, kx: false, dmg: true, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击力加100%爆伤',
    params: { atkPct: false, kx: false, dmg: false, cdmg: true, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击加100伤害值',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: true, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击降低10%防御',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: true, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击加10%倍率',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: true, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
  }, {
    title: '100%攻击力伤害蒸发',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击加100%攻击蒸发',
    params: { atkPct: true, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击减10%抗性蒸发',
    params: { atkPct: false, kx: true, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击加100%伤害蒸发',
    params: { atkPct: false, kx: false, dmg: true, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击加100%爆伤蒸发',
    params: { atkPct: false, kx: false, dmg: false, cdmg: true, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击加100伤害值蒸发',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: true, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击减10%防御蒸发',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: true, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击加10%倍率蒸发',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: true, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击加100点精通蒸发',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
  }, {
    title: '100%攻击力伤害融化',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击加100%攻击融化',
    params: { atkPct: true, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击减10%抗性融化',
    params: { atkPct: false, kx: true, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击加100%伤害融化',
    params: { atkPct: false, kx: false, dmg: true, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击加100%爆伤融化',
    params: { atkPct: false, kx: false, dmg: false, cdmg: true, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击加100伤害值融化',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: true, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击减10%防御融化',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: true, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击加10%倍率融化',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: true, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%攻击加100点精通融化',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
  }, {
    title: '100%防御力伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: true, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.e['技能伤害防御力'] * calc(attr.def) / 100 + (attr.e.plus || 0)
      return basic(ret, 'e')
    }
  }, {
    title: '100%生命值伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: true, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害生命值'] / 100, 'e')
  }, {
    title: '超激化伤害提升',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['超激化伤害提升'], 'e', 'aggravate')
  }, {
    title: '超激化伤害提升加100精通',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['超激化伤害提升'], 'e', 'aggravate')
  }, {
    title: '蔓激化伤害提升',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['蔓激化伤害提升'], 'e', 'spread')
  }, {
    title: '蔓激化伤害提升加100精通',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['蔓激化伤害提升'], 'e', 'spread')
  }, {
    title: '100%生命值护盾吸收量',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent, calc, attr }, { shield }) =>
      shield((talent.q['护盾吸收量1'] * calc(attr.hp) / 100 + talent.q['护盾吸收量2'] * 1) * 1)
  }, {
    title: '护盾吸收量加10%护盾强效',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: true, heal: false },
    dmg: ({ talent, calc, attr }, { shield }) =>
      shield((talent.q['护盾吸收量1'] * calc(attr.hp) / 100 + talent.q['护盾吸收量2'] * 1) * 1)
  }, {
    title: '100%生命值治疗量',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ talent, attr, calc }, { heal }) =>
      heal(talent.q['治疗量1'] * calc(attr.hp) / 100 + talent.q['治疗量2'] * 1)
  }, {
    title: '治疗量加加10%治疗加成',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: true },
    dmg: ({ talent, attr, calc }, { heal }) =>
      heal(talent.q['治疗量1'] * calc(attr.hp) / 100 + talent.q['治疗量2'] * 1)
  }, {
    title: '扩散反应伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('swirl')
  }, {
    title: '扩散反应加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('swirl')
  }, {
    title: '燃烧反应伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('burning')
  }, {
    title: '燃烧反应加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('burning')
  }, {
    title: '超导反应伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('superConduct')
  }, {
    title: '超导反应加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('superConduct')
  }, {
    title: '感电反应伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('electroCharged')
  }, {
    title: '感电反应加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('electroCharged')
  }, {
    title: '超载反应伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('overloaded')
  }, {
    title: '超载反应加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('overloaded')
  }, {
    title: '碎冰反应伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('shatter')
  }, {
    title: '碎冰反应加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({}, { reaction }) => reaction('shatter')
  }, {
    title: '草原核伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ calc, attr }, { reaction }) => { return reaction('bloom') }
  }, {
    title: '草原核加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ calc, attr }, { reaction }) => { return reaction('bloom') }
  }, {
    title: '超绽放伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ calc, attr }, { reaction }) => { return reaction('hyperBloom') }
  }, {
    title: '超绽放加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ calc, attr }, { reaction }) => { return reaction('hyperBloom') }
  }, {
    title: '烈绽放伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: false, shield: false, heal: false },
    dmg: ({ calc, attr }, { reaction }) => { return reaction('burgeon') }
  }, {
    title: '烈绽放加100点精通伤害',
    params: { atkPct: false, kx: false, dmg: false, cdmg: false, plus: false, enemyDef: false, pct: false, mastery: true, shield: false, heal: false },
    dmg: ({ calc, attr }, { reaction }) => { return reaction('burgeon') }
  }]

export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '攻击提升：攻击力提升100%',
    data: {
      atkPct: ({ params }) => params.atkPct ? 100 : 0
    }
  }, {
    title: '抗性降低：全元素抗性降低10%',
    data: {
      kx: ({ params }) => params.kx ? 10 : 0
    }
  }, {
    title: '伤害提升：造成的伤害提升100%',
    data: {
      dmg: ({ params }) => params.dmg ? 100 : 0
    }
  }, {
    title: '暴伤提升：造成的暴击伤害提升100%',
    data: {
      cdmg: ({ params }) => params.cdmg ? 100 : 0
    }
  }, {
    title: '伤害值提升：造成的伤害值提升100',
    data: {
      ePlus: ({ params }) => params.plus ? 100 : 0,
      qPlus: ({ params }) => params.plus ? 100 : 0
    }
  }, {
    title: '降低防御：敌人防御力降低10%',
    data: {
      enemyDef: ({ params }) => params.enemyDef ? 10 : 0
    }
  }, {
    title: '倍率提升：天赋倍率提升10%',
    data: {
      ePct: ({ params }) => params.pct ? 10 : 0,
      qPct: ({ params }) => params.pct ? 10 : 0
    }
  }, {
    title: '元素精通提升：元素精通提升100点',
    data: {
      mastery: ({ params }) => params.mastery ? 100 : 0
    }
  }, {
    title: '护盾强效提升：护盾强效提升10%',
    data: {
      shield: ({ params }) => params.shield ? 10 : 0
    }
  }, {
    title: '治疗加成提升：治疗加成提升10%',
    data: {
      heal: ({ params }) => params.heal ? 10 : 0
    }
  }
]
