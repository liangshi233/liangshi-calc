export default function ({ attr, weapon, rule, def, artis }) {
  if (weapon.name === '昭心' && attr.phy > 10) {
    return rule('闲云-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10) {
    return rule('闲云-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (attr.mastery < 320 && artis.is('dmg', 4) && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('闲云-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 320 && artis.is('atk', '3,4,5')) {
    return rule('闲云-辅助', { atk: 100, cpct: 100, cdmg: 100, dmg: 85, recharge: 55 })
  }
  if (attr.mastery >= 320) {
    return rule('闲云-扩散', { atk: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 80, recharge: 100 })
  }
  if (attr.heal > 5) {
    return rule('闲云-治疗', { hp: 0, atk: 100, cpct: 35, cdmg: 35, dmg: 35, recharge: 85, heal: 100 })
  }
  return def({ atk: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 55 })
}
