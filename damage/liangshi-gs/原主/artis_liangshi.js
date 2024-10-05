export default function ({ attr, rule, def }) {
  if (attr.phy >= 1) {
    return rule('驻场-物理', { atk: 100, cpct: 100, cdmg: 100, phy: 100 })
  }
  if (attr.phy < 1) {
    return rule('驻场-输出', { atk: 100, cpct: 100, cdmg: 100, phy: 100 })
  }
  return def({ atk: 100, cpct: 100, cdmg: 100, phy: 100 })
}
