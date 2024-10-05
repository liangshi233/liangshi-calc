export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 24) {
    return rule('香菱-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 75, mastery: 75 })
}
