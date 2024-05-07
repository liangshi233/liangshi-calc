export default function ({ attr, artis, rule, def }) {
  if (attr.dmg > 5) {
    return rule('菲米尼-冰伤', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 35 })
  }

  if (attr.phy > 5) {
    return rule('菲米尼-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 100, recharge: 55 })
}
