export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy >= 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery < 180) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 180 && attr.mastery < 540) {
    return rule('驻场-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('输出-超绽', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
}
