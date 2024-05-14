import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技单体伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '战技相邻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
}, {
  title: '触电持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['触电持续伤害'], 'dot', 'skillDot')
}, {
  title: '附加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'], 't')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 3

export const buffs = [
  {
    check: ({ params }) => params.technique >= 1,
    title: '希露瓦秘技：[晚安，贝洛伯格] 进入战斗后对敌方全体造成雷属性伤害，同时有100%的基础概率使敌方每个单体目标陷入触电状态。'
  }, {
    title: '希露瓦6命：对触电状态下的敌人伤害提升[dmg]%',
    cons: 6,
    data: {
      dmg: 30
    }
  }, {
    title: '行迹-狂热：消灭敌人攻击力提升[atk]%',
    tree: 3,
    data: {
      atk: 20
    }
  },
  { title: '2.19最后修改：如有问题请输入 #伤害计算反馈' }
]
