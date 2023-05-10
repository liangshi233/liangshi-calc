export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},{
  title: '长按E总伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['猫爪伤害'] * 5, 'e')
}, {
  title: '长按E护盾量',
  dmg: ({ talent, attr, calc }, { shield }) =>
    shield(talent.e['护盾基础吸收量2'][0] * calc(attr.hp) / 100 + talent.e['护盾基础吸收量2'][1] * 1)
}, ({ cons }) => {
  return {
    title: `${cons === 6 ? '半血' : ''}最烈特调每跳治疗`,
    dmg: ({ talent, calc, attr }, { heal }) =>
      heal(talent.q['持续治疗量2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗量2'][1] * 1)
  }
}, {
  title: '最烈特调伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '冰气酒雾领域伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['领域持续伤害'], 'q')
}]

export const mainAttr = 'atk,hp,cpct,cdmg'
export const defDmgIdx = 2

export const buffs = [{
  title: '迪奥娜天赋：长按E获得75%护盾吸收量加成',
  data: {
    shield: 75
  }
}, {
  title: '迪奥娜2命：猫爪冻冻造成的伤害提高15%，护盾吸收量提高15%',
  cons: 2,
  data: {
    eDmg: 15,
    shield: 15
  }
}, {
  title: '迪奥娜6命：生命值低于50%时受治疗加成提升30%，生命高于50%时元素精通提升200',
  cons: 6,
  data: {
    heal: 30,
	mastery: 200
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
 ]
