export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 52) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('冰套4')) {
    return rule('输出-冻结', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 120) {
    return rule('输出-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 120) {
    return rule('输出-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
}
