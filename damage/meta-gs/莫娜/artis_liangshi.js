export default function ({ attr, artis, weapon, rule, def }) {
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('生存-治疗', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, recharge: 100, heal: 100 })
  }
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-绽放', { hp: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (artis.is('冰套4')) {
    return rule('驻场-冻结', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 90 })
  }
  if (attr.mastery < 120) {
    if (artis.is('绝缘4')) {
      return rule('输出-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 100 })
    }
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 90 })
  }
  if (attr.mastery >= 120 && attr.mastery < 540) {
    if (artis.is('绝缘4')) {
      return rule('驻场-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 100 })
    }
    return rule('驻场-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 85 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 90 })
}
