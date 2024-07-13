export default function ({ artis, attr, weapon, rule, def }) {
  if (attr.phy > 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('输出-超绽', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, mastery: 100, recharge: 80 })
  }
  if (attr.heal > 5) {
    return rule('生存-治疗', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, mastery: 80, recharge: 80, heal: 100 })
  }
  if (attr.mastery >= 120) {
    return rule('输出-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 60, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 120) {
    return rule('输出-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, mastery: 25, recharge: 45 })
  }
  return def({ atk: 30, cpct: 60, cdmg: 60, dmg: 60, mastery: 100, recharge: 80 })
}
