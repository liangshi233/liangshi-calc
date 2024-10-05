export default function ({ attr, rule, def }) {
  if (attr.phy > 70) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery >= 240 && attr.mastery < 540) {
    return rule('输出-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 40 })
  }
  if (attr.mastery >= 540) {
    return rule('输出-绽放', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.mastery < 240 ) {
    return rule('输出-燃烧', { atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100, recharge: 40 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100, recharge: 40 })
}
