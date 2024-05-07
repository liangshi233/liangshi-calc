export default function ({ attr, rule, def }) {
  if (attr.mastery >= 120) {
    return rule('柯莱-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
  }
  if (attr.mastery < 120) {
    return rule('柯莱-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
}
