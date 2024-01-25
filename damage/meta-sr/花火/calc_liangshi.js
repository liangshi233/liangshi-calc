import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [
{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, 
{
  title: 'Q满层普攻伤害',
  params: { migui: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, 
{
  title: '战技Buff爆伤提高',
  dmg: ({ attr, calc, talent, cons }) => {
    return {
      avg: Format.percent(calc(attr.cdmg) * talent.e['百分比暴伤'] / 100 + talent.e['固定暴伤'] + ( cons * 1 >= 6 ? 40 : 0 ) ),
      type: 'text'
    }
  }
},
{
  title: '消耗战技点每层Buff加伤',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['伤害提高'] + talent.t['伤害提高']),
      type: 'text'
    }
  }
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '花火技能：[一人千役] [buffCount]层【谜诡】,使我方所有角色造成伤害额外提高[dmg]%',
  data: {
    buffCount: ({ params }) => ( params.migui || 0 ),
    dmg: ({ params , talent }) => ( params.migui || 0 ) * talent.q['伤害提高']
  }
}, 
{
  title: '花火天赋：[叙述性诡计] [buffCount]层【谜诡】,使我方所有角色造成伤害提高[dmg]%',
  data: {
    buffCount: ({ params }) => ( params.migui || 0 ) ,
    dmg: ({ params , talent }) => ( params.migui || 0 ) * talent.t['伤害提高']
  }
}, 
{
  title: '花火行迹：[岁时记] 施放普攻时,额外恢复[_energyevery]点能量。',
  tree: 1,
  data: {
    _energyevery: 10
  }
}, 
{
  title: '花火行迹：[夜想曲] 我方全体暴击率提升[cpct]%,我方队伍中存在3名量子属性角色，量子属性伤害提升[dmg]%',
  tree: 3,
  data: {
    cpct: 5 ,
    dmg: 30
  }
}, 
{
  title: '花火1魂：[悬置怀疑] 持有【谜诡】的我方目标速度提高[speedPct]%',
  cons: 1,
  data: {
    speedPct: 12
 }
}, 
{
  title: '花火2魂：[虚构无端] 天赋造成的伤害提高效果的可叠加层数增加1层,使我方目标造成伤害时无视目标[ignore]%的防御力',
  cons: 2,
  data: {
    ignore: ({ params }) => ( params.migui || 0 ) * 3
 }
}, 
{
  title: '花火6魂：[多重解答] 战技的暴击伤害效果额外提升[_eCdmg]%',
  cons: 6,
  data: {
    _eCdmg: 40
 }
}, 
{
title: '12.29最后修改：[12.30重置]'}]