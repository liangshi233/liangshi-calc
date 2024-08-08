export default function ({ attr, artis, rule, def }) {
  if (attr.phy >= 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (attr.mastery >= 120 && attr.mastery < 540) {
    return rule('驻场-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 55 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-绽放', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100, recharge: 55 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 55 })
}