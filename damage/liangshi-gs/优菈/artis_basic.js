export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 35) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 55, phy: 100 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, recharge: 55, dmg: 100 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, recharge: 55, dmg: 100 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, recharge: 55, phy: 100 })
}