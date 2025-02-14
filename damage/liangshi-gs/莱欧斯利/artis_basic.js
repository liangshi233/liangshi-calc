export default function ({ attr, weapon, artis, rule, def }) {
  if (artis.is('冰套4')) {
    return rule('驻场-冻结', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('生存-治疗', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, recharge: 100, heal: 100 })
  }
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (attr.mastery < 120 ) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
}
