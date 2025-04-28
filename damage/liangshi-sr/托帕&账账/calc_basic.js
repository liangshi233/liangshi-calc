import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 't')
}, {
  title: 'E后普攻伤害',
  params: { fz: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 't')
}, {
  title: 'EQ后普攻伤害',
  params: { fz: true, zf: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'] + talent.q['伤害倍率提高'], 't')
}, {
  title: '战技伤害',
  params: { fz: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 't')
}, {
  title: 'Q后战技伤害',
  params: { fz: true, zf: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'] + talent.q['伤害倍率提高'], 't')
}, {
  title: '账账攻击伤害',
  params: { fz: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'], 't')
}, {
  title: 'Q后账账攻击伤害',
  params: { fz: true, zf: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'] + talent.q['伤害倍率提高'], 't')
}]

export const defDmgIdx = 6
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '托帕秘技：[明补] 战斗中账账施放首次攻击后，托帕恢复[_energyevery]点能量。',
    data: {
      _energyevery: 60
    }
  }, {
    title: '托帕天赋：追加攻击对处于负债证明的敌人伤害提高[xq]%',
    data: {
      tDmg: ({ params, talent }) => params.fz ? (talent.e['追加攻击伤害提高'] * 100) : 0,
      xq: ({ talent }) => talent.e['追加攻击伤害提高'] * 100
    }
  }, {
    title: '托帕天赋：暴击伤害提高[xq]%造成伤害倍率提高',
    data: {
      cdmg: ({ params, talent }) => params.zf ? (talent.q['暴击伤害提高'] * 100) : 0,
      xq: ({ talent }) => talent.q['暴击伤害提高'] * 100
    }
  }, {
    title: '行迹-****：对火弱点敌人造成的伤害提高[dmg]%',
    tree: 2,
    data: {
      dmg: 15
    }
  }, {
    title: '托帕1命：追加攻击暴击伤害提高50%',
    cons: 1,
    data: {
      cdmg: ({ params, talent }) => params.fz ? 50 : 0
    }
  }, {
    title: '托帕6命：火属性抗性穿透提高[kx]%',
    cons: 6,
    data: {
      kx: 10
    }
  }
]
