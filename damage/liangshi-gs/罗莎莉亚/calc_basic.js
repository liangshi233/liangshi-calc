import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '噬罪的告解伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '噬罪的告解融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
}, {
  title: '终命的圣礼伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '终命的圣礼融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
  title: '终命的圣礼每跳伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['冰枪持续伤害'], 'q')
}, {
  title: 'Q每跳融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['冰枪持续伤害'], 'q', 'melt')
}]

export const defDmgIdx = 6
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    title: '罗莎莉亚天赋1：从背后攻击时，暴击率提升12%',
    data: {
      cpct: 12
    }
  },
  { title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }
]
