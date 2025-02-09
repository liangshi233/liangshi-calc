import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '护心铠启动伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['技能伤害'] * calc(attr.def) / 100
    return basic(ret, 'e')
  }
}, {
  title: '护心铠盾量',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['吸收量2'][0] * calc(attr.def) / 100 + talent.e['吸收量2'][1] * 1) * 1.5)
}, {
  title: '护心铠单次治疗',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.e['治疗量2'][0] * calc(attr.def) / 100 + talent.e['治疗量2'][1] * 1)
}, {
  title: '大扫除挥砍伤害',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '开Q尾刀',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
}, {
  title: '开Q重击',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
}, {
  title: '诺五钟Q尾刀',
  params: { q: true, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
}, {
  title: '诺五钟Q重击',
  params: { q: true, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
}, {
  title: '诺五钟护心铠盾量',
  params: { team: true },
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['吸收量2'][0] * calc(attr.def) / 100 + talent.e['吸收量2'][1] * 1) * 1.5)
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,def,cpct,cdmg'

export const defParams = { team: true, soda: 1 }

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '元素爆发：诺艾尔开Q基于防御力提高攻击力[atkPlus]',
    sort: 9,
    data: {
      atkPlus: ({ attr, calc, talent }) => talent.q['攻击力提高'] * calc(attr.def) / 100
    }
  }, {
    title: '诺艾尔2命：重击造成的伤害提升[a2Dmg]',
    cons: 2,
    data: {
      a2Dmg: 15
    }
  }, {
    title: '诺艾尔6命：诺艾尔开Q基于防御力提高攻击力[atkPlus]',
    sort: 9,
    cons: 6,
    data: {
      atkPlus: ({ attr, calc, talent }) => calc(attr.def) * 0.5
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '6命五郎：增加[defPlus]点防御力与[defPct]%防御力，增加[dmg]%岩伤与[cdmg]%暴击伤害',
    sort: 0,
    data: {
      cdmg: 40,
      defPct: 25,
      defPlus: 438,
      dmg: 15
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '钟离：降低敌人[kx]%全抗',
    data: {
      kx: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 坚定之岩：护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
    data: {
      shield: 25,
      dmg: 15,
      kx: 20
    }
  },
  { title: '5.31最后修改：修复攻击提升不正确的问题' }
]
