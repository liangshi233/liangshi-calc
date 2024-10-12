export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 42) {
    return rule('驻场-物理', { atk: 85, def: 30, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery >= 420) {
    return rule('生存-结晶', { atk: 20, def: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (attr.mastery < 420) {
    return rule('输出-直伤', { atk: 60, def: 80, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  return def({ atk: 60, def: 80, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
}