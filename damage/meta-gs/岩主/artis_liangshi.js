export default function ({ attr, weapon, rule, def }) {
  if (attr.phy >= 41.4) {
    return rule('岩主-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  if (attr.mastery >= 420) {
    return rule('岩主-盾辅', { atk: 75, cpct: 90, cdmg: 90, mastery: 100, dmg: 75, recharge: 100 })
  }
  if (attr.mastery < 420) {
    return rule('岩主-直伤', { atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
  }
  return def({ atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 35, heal: 0 })
}
