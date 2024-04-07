import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '战技持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'dot', 'skillDot')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '虎克秘技：[嘿！记得虎克吗] 进入战斗后对敌方随机单体造成火属性伤害，同时有100%的基础概率使敌方每个单体目标陷入灼烧状态。'
},
{title: '2.19最后修改：如有问题请输入 #伤害计算反馈'}]
