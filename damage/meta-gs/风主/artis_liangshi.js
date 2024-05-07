export default function ({ attr, weapon, rule, def }) {
  if (attr.phy >= 41.4) {
    return rule('风主-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  if (attr.mastery >= 320) {
    return rule('风主-扩散', { atk: 65, cpct: 90, cdmg: 90, mastery: 100, dmg: 80, recharge: 55 })
  }
  if (attr.mastery < 320) {
    return rule('风主-直伤', { atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
  }
  return def({ atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
}
