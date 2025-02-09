import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '普通攻击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['普通攻击伤害'], 'a')
}, {
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '星璇伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['星璇伤害'], 'a2')
}, {
  title: '璇玑屏伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: 'Q单颗宝石伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['宝石伤害'], 'q')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '凝光天赋2：穿过璇玑屏获得12%岩伤加成',
    data: {
      dmg: 12
    }
  },
  { title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }
]
