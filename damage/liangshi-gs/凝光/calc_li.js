import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '璇玑屏伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: 'Q单颗宝石伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['宝石伤害'], 'q')
}, {
  title: '璇玑屏下Q总伤害',
  check: ({ cons }) => cons < 6,
  dmg: ({ talent }, dmg) => dmg(talent.q['宝石伤害'] * 12, 'q')
}, {
  title: '璇玑屏下Q后重击伤害',
  cons: 6,
  dmg: ({ talent }, dmg) => {
    let qed = dmg(talent.q['宝石伤害'], 'q')
    let abd = dmg(talent.a['重击伤害'], 'a2')
    let xxd = dmg(talent.a['星旋伤害'], 'a')
    return {
      dmg: qed.dmg * 12 + abd.dmg + xxd.dmg * 7,
      avg: qed.avg * 12 + abd.avg + xxd.avg * 7
    }
  }
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '凝光被动：穿过璇玑屏获得12%岩伤加成',
    data: {
      dmg: 12
    }
  }, {
    title: '凝光6命：释放天权崩玉后，生成7枚星旋',
    cons: 6,
    data: {}
  }
]
