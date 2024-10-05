export default function ({ attr, artis, weapon, rule, def }) {
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 420) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 50 })
  }
  if (attr.mastery >= 420) {
    return rule('驻场-扩散', { atk: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (artis.is('atk', '4,5')) {
    return rule('辅助-增伤', { atk: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 60 })
  }
  if (attr.heal > 15) {
    return rule('生存-治疗', { atk: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
  }
  return def({ atk: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
}
