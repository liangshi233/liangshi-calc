export default function ({ attr, artis, weapon, rule, def }) {
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('冰套4')) {
    return rule('驻场-冻结', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.heal > 15) {
    return rule('生存-治疗', { atk: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 120) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  return def({ atk: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
}
