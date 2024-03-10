export const details = [{
  title: '普攻伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['技能伤害'] * calc(attr.hp), 'a')
}, {
  title: '战技生命上限提升',
  dmgKey: 'e',
  dmg: ({ calc, attr, talent , cons }) => { return { avg: calc(attr.hp) * ( talent.e['生命提高·百分比生命'] + ( cons * 1 >= 6 ? 0.06 : 0 ) ) + talent.e['生命提高·固定值'] } }
}, {
  title: '战技生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.hp) * talent.e['治疗·百分比'] + talent.e['治疗·固定值'])
}, {
  title: '终结技生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.hp) * talent.q['治疗·百分比生命'] + talent.q['治疗·固定值'])
}, {
  title: '天赋生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.hp) * talent.t['治疗·百分比生命'] + talent.t['治疗·固定值'])
}, {
  title: '天赋额外生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.hp) * talent.t['额外治疗·百分比生命'] + talent.t['额外治疗·固定值'])
}, {
  check: ({ cons }) => cons >= 4,
  title: '4命目标攻击力提高',
  dmg: ({ calc, attr }) => { return { avg: calc(attr.hp) * 0.03 } }
}]

export const mainAttr = 'atk,cpct,cdmg,hp'
export const defDmgKey = 'e'

export const buffs = [{
  title: '玲可1命：对生命值低于50%的角色治疗提高20%',
  cons: 1,
  data: {
    heal: 20
  }
}]
