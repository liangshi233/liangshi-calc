export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('乐园4')) {
    return rule('驻场-绽放', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, mastery: 100, recharge: 80 })
  }
  if (artis.is('dmg', 4)) {
    return rule('输出-直伤', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 540) {
    return rule('辅助-增伤', { atk: 35, cpct: 40, cdmg: 40, mastery: 100, dmg: 40, recharge: 80 })
  }
  return def({ atk: 35, cpct: 40, cdmg: 40, mastery: 100, dmg: 40, recharge: 80 })
}
