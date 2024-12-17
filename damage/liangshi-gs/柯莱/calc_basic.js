import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: 'E单次伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: 'E单次蔓激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
}, {
  title: 'Q爆发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
}, {
  title: 'Q每跳伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['跃动伤害'], 'q')
}, {
  title: 'Q每跳蔓激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['跃动伤害'], 'q', 'spread')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  { title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }
]
