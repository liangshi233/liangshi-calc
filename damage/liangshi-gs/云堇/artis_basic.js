export default function ({ attr, artis, rule, def }) {
  if (attr.phy >= 44) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('def', '4,5')) {
    return rule('辅助-增伤', { def: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
  }
  if (attr.mastery < 420) {
    return rule('驻场-直伤', { def: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 420) {
    return rule('辅助-结晶', { def: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  return def({ def: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
}
