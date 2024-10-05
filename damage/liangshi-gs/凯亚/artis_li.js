export default function ({ attr, artis, cons, rule, def }) {
  if (attr.phy > 24) {
    return rule('凯亚-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 55 })
}
