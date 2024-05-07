export default function ({ attr, weapon, rule, def }) {
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('平藏-治疗', { hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 40, recharge: 100, heal: 100 })
  }
  if (weapon.name === '昭心' && attr.phy > 10) {
    return rule('平藏-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10) {
    return rule('平藏-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (attr.mastery >= 320) {
    return rule('平藏-扩散', { atk: 65, cpct: 90, cdmg: 90, mastery: 100, dmg: 80, recharge: 55 })
  }
  if (attr.mastery < 320) {
    return rule('平藏-直伤', { atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
  }
  return def({ atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
}
