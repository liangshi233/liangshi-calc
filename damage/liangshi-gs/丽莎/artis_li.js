export default function ({ attr, artis, cons, rule, def }) {
  if (artis.is('平雷4')) {
    return rule('丽莎-平雷', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }

  if (artis.is('mastery', '3,4,5')) {
    return rule('丽莎-精通', { mastery: 100, recharge: 80 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 75, recharge: 75 })
}
