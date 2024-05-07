export default function ({ attr, weapon, rule, def }) {
  if (attr.mastery < 210 && attr.cpct * 2 + attr.cdmg > 150 && attr.phy < 41.4) {
    return rule('雷神-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 100 })
  }
  if (attr.mastery >= 210 && attr.mastery < 540) {
    return rule('雷神-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 100 })
  }
  if (attr.mastery >= 540) {
    return rule('雷神-超绽', { atk: 50, cpct: 90, cdmg: 90, mastery: 100, dmg: 75, recharge: 100 })
  }
  if (weapon.name === '薙草之稻光' && weapon.affix >= 3) {
    return rule('雷神-高精', { atk: 90, cpct: 100, cdmg: 100, dmg: 90, recharge: 90 })
  }
  if (attr.phy >= 41.4) {
    return rule('雷神-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 0, dmg: 75, recharge: 90 })
}
