export default function ({ attr, artis, rule, def }) {
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('香菱-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 120 && attr.mastery < 540) {
    return rule('香菱-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('香菱-烈绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 55 })
  }
  if (attr.phy > 45) {
    return rule('香菱-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 15, phy: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 })
}
