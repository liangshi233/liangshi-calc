export const details = [{
  title: '捉浪伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'], 'e')
}, {
  title: '2层捉浪伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'] + talent.e['受击时伤害提升'] * 2, 'e')
}, {
  title: '2层捉浪超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['基础伤害'] + talent.e['受击时伤害提升'] * 2, 'e', '超激化')
}, {
  title: '捉浪护盾吸收量',
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['护盾吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾吸收量2'][1] * 1) * 1)
}, {
  title: '斫雷伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '闪雷伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['闪雷伤害'], 'q')
}, {
  title: '闪雷超激化伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['闪雷伤害'], 'q', '超激化')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 6

export const buffs = [{
  title: '北斗6命：Q持续期间，周围敌人的雷元素抗性降低15%',
  cons: 6,
  data: {
    kx: ({ params }) => params.q ? 15 : 0
  }
},
{ title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }]
