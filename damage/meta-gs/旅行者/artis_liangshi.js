export default function ({ attr, rule, def }) {
  if (attr.phy >= 1) {
    return rule('旅行者-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, phy: 100 })
}
