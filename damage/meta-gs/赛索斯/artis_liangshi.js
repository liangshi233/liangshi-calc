export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 52) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-超绽', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-激绽', { atk: 60, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 60 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 65, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 60 })
  }
  return def({ atk: 60, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 60 })
}