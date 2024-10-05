export default function ({ attr, artis, rule, def }) {
  if (artis.is('mastery', '3,4,5')) {
    return rule('万叶-精通', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 80, recharge: 55 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 55 })
}
