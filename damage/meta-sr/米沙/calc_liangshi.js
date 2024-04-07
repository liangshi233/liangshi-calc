import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: '战技主目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
},
{
  title: '战技相邻目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
},
{
  title: '终结技单段伤害',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => dmg(talent.q['每段攻击伤害'] + ( cons * 1 >= 4 ? 0.06 : 0 ), 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  title: '米沙天赋：[擒纵机构] 消耗战技点，恢复[_energyevery]点能量',
  data: {
    _energyevery:  ({ talent }) => talent.t['能量恢复']
  }
},
{
  check: ({ params }) => params.q === true,
  title: '米沙行迹：[锁接] 施放终结技时,效果命中提高[effPct]%',
  tree: 2,
  data: {
    effPct: 60
  }
},
{
  title: '米沙行迹：[传冲] 对陷入冻结状态的敌方目标造成伤害时,暴击伤害提升[cdmg]%',
  tree: 3,
  data: {
    cdmg: 30
  }
},
{
  check: ({ params }) => params.q === true,
  title: '米沙2魂：[青春的怅望] 终结技每段攻击前使目标防御力降低[enemyDef]%',
  cons: 2,
  data: {
    enemyDef: 16
 }
},
{
  check: ({ params }) => params.q === true,
  title: '米沙6魂：[断业根] 施放终结技时，使自身造成的伤害提高[dmg]%',
  cons: 6,
  data: {
    dmg: 30
 }
},
{
title: '2.8最后修改：[12.28重置]'}]
