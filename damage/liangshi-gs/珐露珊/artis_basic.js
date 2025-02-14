export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 52) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('宗室4')) {
    return rule('输出-宗室', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 80 })
  }
  if (attr.mastery >= 420) {
    return rule('驻场-扩散', { atk: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (attr.mastery < 420) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
}