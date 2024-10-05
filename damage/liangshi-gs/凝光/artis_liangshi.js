export default function ({ attr, artis, weapon, rule, def }) {
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('生存-治疗', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, recharge: 100, heal: 100 })
  }
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (attr.mastery < 420) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 420) {
    return rule('生存-结晶', { atk: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
}
