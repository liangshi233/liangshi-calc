import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [
{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '奥迹基础伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['持续伤害'], '', 'skillDot')
},
{
  title: '奥迹每层伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['倍率提高'], '', 'skillDot')
},
{
  title: '奥迹基础伤害(大于7层)',
  params: { tDef: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['持续伤害'], '', 'skillDot')
},
{
  title: '奥迹每层伤害(大于7层)',
  params: { tDef: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['倍率提高'], '', 'skillDot')
},
{
  title: '奥迹相邻伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['相邻目标伤害'], '', 'skillDot')
},
{
  title: '奥迹50层伤害',
  params: { tDef: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.t['倍率提高'] + talent.t['倍率提高'] * 50 , '', 'skillDot')
}]

export const defDmgIdx = 8
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  check: ({ params }) => params.tDef === true,
  title: '黑天鹅技能：[失坠，伪神的黄昏] 奥迹大于7层时将无视目标[ignore]%防御力',
  data: {
    ignore: 20
  }
},
{
  check: ({ params }) => params.q === true,
  title: '黑天鹅技能：[失坠，伪神的黄昏] 敌方目标自身回合内受到伤害提高[enemydmg]%',
  data: {
    enemydmg: ({ talent }) => talent.q['伤害提高']
  }
},
{
  title: '黑天鹅天赋：[无端命运的机杼] 战技命中使目标防御力降低[enemyDef]%',
  data: {
    enemyDef: ({ talent }) => talent.e['防御降低']
  }
},
{
  title: '黑天鹅行迹：[烛影朕兆] 使自身造成的伤害提高[dmg]%',
  tree: 3,
  data: {
    dmg: ({ attr, calc }) => Math.min( 72 , calc(attr.eff) * 60 / 100 )
  }
},
{
  title: '黑天鹅1魂：[三磅石，七阶柱] 处于风化、裂伤、灼烧、触电状态下的敌方目标,抗性降低[kx]%',
  cons: 1,
  data: {
    kx: 25
 }
},
{
  title: '黑天鹅4魂：[泪水，亦是礼物] 敌方目标效果抵抗降低[_effDef]%,且每回合开始时或被消灭时使黑天鹅恢复[_energyevery]点能量。',
  cons: 4,
  data: {
    _effDef: 10 ,
    _energyevery: 8
  }
},
{
title: '2.8最后修改：[12.30重置]'}]
