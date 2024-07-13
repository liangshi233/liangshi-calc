export default function ({ attr, weapon, artis, rule, def }) {
  if (attr.phy > 35) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery < 120 && artis.is('dmg', 4)) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 120 & artis.is('dmg', 4)) {
    return rule('驻场-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-绽放', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  return def({ atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
}
