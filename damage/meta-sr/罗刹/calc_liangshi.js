export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.atk) * talent.e['攻击力百分比'] + talent.e['固定生命值'])
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '天赋生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.atk) * talent.t['攻击力百分比'] + talent.t['固定生命值'])
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 1

export const buffs = [{
  title: '罗刹1命：结界生效后攻击力提高20%',
  cons: 1,
  data: {
    atkPct: 20
  }
}, {
  title: '罗刹6命：释放终结技降低敌方抗性20%',
  cons: 6,
  data: {
    kx: 20
  }
},
{title: '7.15最后修改：如有问题可联系1142607614反馈'}
]
