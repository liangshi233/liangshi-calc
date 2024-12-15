import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '拟造阳华基础伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '刹那之花伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.def) * talent.e['刹那之花伤害'] / 100, 'e')
}, {
  title: '刹那之花(命中生命值低于50%的敌人)',
  params: {
    team: false,
    TargetHp: 49
  },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.def) * talent.e['刹那之花伤害'] / 100, 'e')
}, {
  title: '大地之潮与生灭之花总伤害',
  check: ({ cons }) => cons < 2,
  params: { buff: 0, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'] + talent.q['生灭之花伤害'] * 7, 'q')
}, {
  title: '4层生灭计数大地之潮与生灭之花总伤害',
  cons: 2,
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'] + talent.q['生灭之花伤害'] * 7, 'q')
}, {
  title: '阿五钟 刹那之花',
  params: { team: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.def) * talent.e['刹那之花伤害'] / 100, 'e')
}, {
  title: '阿五钟 刹那之花(命中生命值低于50%的敌人)',
  params: {
    team: true,
    TargetHp: 49
  },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.def) * talent.e['刹那之花伤害'] / 100, 'e')
}]

export const defDmgIdx = 1
export const mainAttr = 'def,atk,cpct,cdmg'

export const defParams = { team: true }

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    check: ({ params }) => params.TargetHp  50,
    title: '阿贝多固有天赋1：刹那之花对生命值低于50%的敌人造成的伤害提高25%',
    data: {
      eDmg: 25
    }
  }, {
    title: '阿贝多2命：4每层Buff提高Q [qPlus]伤害',
    cons: 2,
    data: {
      qPlus: ({ params, attr, calc }) => params.buff === 0 ? 0 : calc(attr.def) * 1.2
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
    data: { kx: 20 }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 坚定之岩：护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
    data: {
      shield: 25,
      dmg: 15,
      kx: 20
    }
  },
  { title: '11.13最后修改：如有问题请输入 #伤害计算反馈' }
]
