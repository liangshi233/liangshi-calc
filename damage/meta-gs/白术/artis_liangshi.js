export default function ({ attr, artis, weapon, rule, def }) {
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 10) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (attr.mastery >= 540) {
    return rule('输出-绽放', { hp: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.mastery >= 120 && attr.heal < 21 && attr.mastery < 540 && artis.is('dmg', 4)) {
    return rule('白术-激绽', { hp: 50, atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 && attr.heal < 21 && artis.is('dmg', 4)) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.heal > 21) {
    return rule('生存-治疗', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 85, heal: 100 })
  }
  if (attr.heal < 21) {
    return rule('辅助-增伤', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 85, heal: 60 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 85, heal: 100 })
}
