export default function ({ attr, weapon, artis, rule, def }) {
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('生存-治疗', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, recharge: 100, heal: 100 })
  }
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (attr.mastery >= 540) {
    return rule('辅助-增伤', { atk: 60, cpct: 80, cdmg: 80, mastery: 100, dmg: 80, recharge: 60 })
  }
  if (attr.mastery >= 120 && attr.mastery < 540) {
    return rule('输出-激化', { atk: 60, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 40 })
  }
  if (attr.mastery < 120) {
    return rule('输出-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 40 })
  }
  return def({ atk: 60, cpct: 80, cdmg: 80, mastery: 100, dmg: 80, recharge: 60 })
}
