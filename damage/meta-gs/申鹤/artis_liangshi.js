export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 42) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('冰套4')) {
    return rule('驻场-冻结', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 && artis.is('dmg', 4)) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 120 && artis.is('dmg', 4)) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  if (artis.is('atk', '4,5')) {
    return rule('辅助-增伤', { atk: 100, cpct: 70, cdmg: 70, dmg: 60, recharge: 80 })
  }
  return def({ atk: 100, cpct: 70, cdmg: 70, dmg: 60, recharge: 80 })
}
