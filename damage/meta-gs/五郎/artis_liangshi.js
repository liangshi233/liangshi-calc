export default function ({ attr, rule, def }) {
  if (attr.phy >= 20) {
    return rule('五郎-宏', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 0, phy: 100 })
  }
  return def({ atk: 75, def: 100, cpct: 50, cdmg: 50, dmg: 100, recharge: 75 })
}
