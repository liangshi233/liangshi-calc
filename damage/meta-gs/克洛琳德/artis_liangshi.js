export default function ({ attr, rule, def }) {
  if (attr.phy >= 41.4) {
    return rule('琳德-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  if (attr.mastery >= 80 && attr.mastery < 540) {
    return rule('琳德-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 })
  }
  if (attr.mastery >= 540) {
    return rule('琳德-超绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 30, recharge: 75 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 150 && attr.phy < 41.4) {
    return rule('琳德-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 100 })
}
