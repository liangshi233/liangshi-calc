export default function ({ attr, rule, def }) {
  if (attr.phy >= 41.4) {
    return rule('草主-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  if (attr.mastery >= 120) {
    return rule('草主-激化', { atk: 70, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120) {
    return rule('草主-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100, recharge: 55 })
  }
  return def({ atk: 70, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 55 })
}
