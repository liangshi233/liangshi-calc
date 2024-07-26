export default function ({ attr, artis, rule, def }) {
  if (artis.is('宗室4')) {
    return rule('输出-宗室', { atk: 55, def: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 80 })
  }
  if (attr.phy > 42) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery >= 420) {
    return rule('辅助-结晶', { def: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (attr.mastery < 420) {
    return rule('输出-直伤', { atk: 55, def: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 40 })
  }
  return def({ atk: 55, def: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 40 })
}