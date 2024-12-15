import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '烈烧佑命之侍护伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '烈烧佑命之侍护蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
}, {
  title: '烈烧佑命之侍护融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
}, {
  title: 'E基础护盾量',
  dmg: ({ attr, calc, talent }, { shield }) =>
    shield(talent.e['护盾吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量2'][1] * 1)
}, {
  title: 'E最大护盾量',
  params: { e: true },
  dmg: ({ attr, calc, talent }, { shield }) =>
    shield(talent.e['护盾吸收量上限2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量上限2'][1] * 1)
}, {
  title: '真红炽火之大铠每段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['炽火崩破伤害'], 'q')
}, {
  title: '真红炽火之大铠每段蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.q['炽火崩破伤害'], 'q', 'vaporize')
}, {
  title: '真红炽火之大铠每段融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['炽火崩破伤害'], 'q', 'melt')
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    title: '托马天赋1：5层Buff提高护盾强效25%',
    data: {
      shieldPlus: ({ params }) => params.e ? 25 : 0
    }
  }, {
    title: '托马天赋2：Q每段伤害提高[qPlus]',
    data: {
      qPlus: ({ calc, attr }) => calc(attr.hp) * 0.022
    }
  },
  { title: '8.2最后修改：如有问题请输入 #伤害计算反馈' }
]
