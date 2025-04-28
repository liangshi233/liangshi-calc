import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  params: { zp: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  params: { zp: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '转魄 战技主目标',
  params: { zp: true },
  dmg: ({ talent }, dmg) => dmg(talent.e2['目标伤害'], 'e')
}, {
  title: '转魄 战技相邻目标',
  params: { zp: true },
  dmg: ({ talent }, dmg) => dmg(talent.e2['相邻目标伤害'], 'e')
}, {
  check: ({ cons }) => cons >= 2,
  title: 'Q后强化战技主目标',
  params: { c2: true, zp: true },
  dmg: ({ talent }, dmg) => dmg(talent.e2['目标伤害'], 'e')
}, {
  title: '终结技 主目标',
  params: { zp: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['目标伤害'], 'q')
}, {
  title: '终结技 相邻目标',
  params: { zp: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['相邻目标伤害'], 'q')
}, {
  title: '转魄 终结技主目标',
  params: { zp: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['目标伤害'], 'q')
}, {
  title: '转魄 终结技相邻目标',
  params: { zp: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['相邻目标伤害'], 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'hp,atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '镜流秘技：[古镜照神] 处于特殊领域内的敌人进入战斗后，立即为自身恢复[_energyevery]%点能量、获得1层【朔望】并有100%的基础概率使敌方目标陷入冻结状态。',
    data: {
      _energyevery: 15
    }
  }, {
    title: '澹月转魄：转魄提升暴击率[xq1]%，消耗队友生命提升至多[xq2]%攻击力',
    data: {
      cpct: ({ params, talent }) => params.zp ? (talent.t['暴击率提高'] * 100) : 0,
      atkPct: ({ params, talent }) => params.zp ? (talent.t['攻击力提高上限'] * 100) : 0,
      xq1: ({ talent }) => talent.t['暴击率提高'] * 100,
      xq2: ({ talent }) => talent.t['攻击力提高上限'] * 100
    }
  }, {
    title: '行迹-霜魄：转魄状态下，终结技造成的伤害提高20%',
    tree: 3,
    data: {
      qDmg: ({ params }) => params.zp ? 20 : 0
    }
  }, {
    title: '镜流1命：释放终结技或强化战技时，暴击伤害提高24%',
    cons: 1,
    data: {
      cdmg: ({ params }) => params.zp ? 24 : 0
    }
  }, {
    title: '镜流2命：释放终结技下一次强化战技伤害提高80%',
    cons: 2,
    data: {
      eDmg: ({ params }) => params.c2 ? 80 : 0
    }
  }, {
    title: '镜流4命：转魄状态下，消耗队友生命获得的攻击力额外提高30%',
    cons: 4,
    data: {
      atkPct: ({ params, talent }) => params.zp ? 30 : 0
    }
  }, {
    title: '镜流6命：转魄状态下，暴击伤害提高50%',
    cons: 6,
    data: {
      cdmg: ({ params }) => params.zp ? 50 : 0
    }
  }
]
