import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '霜流矢伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['霜流矢伤害'], 'e')
}, {
  title: '冰星信标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['冰星信标伤害'], 'e')
}, {
  title: '单个冰星破片伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['冰星破片伤害'], 'e')
}, {
  title: 'Q释放治疗量',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.q['施放治疗量2'][0] * calc(attr.hp) / 100 + talent.q['施放治疗量2'][1] * 1)
}, {
  title: '鹰翎治疗量',
  dmgKey: 'qHeal',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.q['鹰翎治疗量2'][0] * calc(attr.hp) / 100 + talent.q['鹰翎治疗量2'][1] * 1)
}]

export const defDmgIdx = 5

export const defDmgKey = 'qHeal'

export const mainAttr = 'hp,atk,cpct,cdmg'
