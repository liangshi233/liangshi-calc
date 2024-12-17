import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '重击蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}, {
  title: '演唱开始水珠伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['水珠伤害'], 'e')
}, {
  title: '演唱开始命中治疗',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['命中治疗量2'][0] * calc(attr.hp) / 100 + talent.e['命中治疗量2'][1] * 1)
}, {
  title: '演唱开始每跳治疗',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.e['持续治疗量2'][1] * 1)
}, {
  title: '闪耀奇迹治疗量',
  dmgKey: 'qHeal',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.q['治疗量2'][0] * calc(attr.hp) / 100 + talent.q['治疗量2'][1] * 1)
}]

export const defParams = { soda: 1 }
export const defDmgIdx = 1
export const defDmgKey = 'qHeal'
export const mainAttr = 'atk,hp,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,{
  title: '芭芭拉2命：开E水环持续期间获得15%水伤加成',
  cons: 2,
  data: { dmg: 15 }
}, 'vaporize',
{ title: '8.30最后修改：如有问题请输入 #伤害计算反馈' }]
