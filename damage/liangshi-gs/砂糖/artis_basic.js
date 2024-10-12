export default function ({ attr, artis, weapon, rule, def }) {
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('乐园4')) {
    return rule('驻场-绽放', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, mastery: 100, recharge: 80 })
  }
  if (artis.is('dmg', 4)) {
    return rule('输出-直伤', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('辅助-增伤', { atk: 35, cpct: 40, cdmg: 40, mastery: 100, dmg: 40, recharge: 80 })
  }
  return def({ atk: 35, cpct: 40, cdmg: 40, mastery: 100, dmg: 40, recharge: 80 })
}