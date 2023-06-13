export const details = [{
  title: '水泡伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
},{
  title: '水泡蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
},{
  title: '幻形蛙鼠伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['纯水幻形 蛙 鼠'] / 100, 'e')
},{
  title: '幻形蟹鸭伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['纯水幻形 蟹 鸭'] / 100, 'e')
},{
  title: '水泡治疗量',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['治疗量2'][0] * calc(attr.hp) / 100 + talent.e['治疗量2'][1] * 1)
}, {
  title: '波翻浪涌伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害']) / 100, 'q')
}, {
  title: '波翻浪涌蒸发',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害']) / 100, 'q', 'vaporize')
}, {
  title: '草原核伤害',
  params: { bloom: true },
  dmg: ({calc, attr}, { reaction }) => {
      return reaction('bloom')}
}]

export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [{
  title: '旅行者1命：造成的伤害提升35%',
  cons: 1,
  data: {
    dmg: 35
  }
}, 'vaporize']
