import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '甩尾飞踢伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['甩尾飞踢伤害'], 'e')
}, {
  title: '猫箱急件冲撞伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['猫箱急件冲撞伤害'], 'e')
}, {
  title: '翻正爪击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['翻正爪击伤害'], 'e')
}, {
  title: '安全运输护盾吸收量',
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['护盾吸收量上限2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量上限2'][1] * 1) * 1)
}, {
  title: '秘法·惊喜特派伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, ({ cons, calc, attr }) => {
  let n = 6
  if (cons >= 4) {
    n += Math.floor(Math.min(calc(attr.hp) / 8000, 4))
  }
  return {
    title: n + '枚猫草豆蔻总伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['猫草豆蔻爆炸伤害'] * n, 'q')
  }
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,hp,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '绮良良天赋2：呜喵町飞足造成的伤害提升[eDmg]%',
    data: {
      eDmg: ({ calc, attr }) => Math.min(calc(attr.hp) / 1000 * 0.4)
    }
  }, {
    title: '绮良良天赋2：秘法·惊喜特派造成的伤害提升[qDmg]%',
    data: {
      qDmg: ({ calc, attr }) => Math.min(calc(attr.hp) / 1000 * 0.3)
    }
  }, {
    cons: 6,
    title: '绮良良6命：绮良良释放元素爆发元素战技，元素伤害提升[dmg]%',
    data: {
      dmg: 12
    }
  }
]
