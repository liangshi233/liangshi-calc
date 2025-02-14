export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 70) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('宗室4')) {
    return rule('输出-宗室', { def: 80, cpct: 100, cdmg: 100, dmg: 100, recharge: 80 })
  }
  if (attr.mastery >= 420) {
    return rule('辅助-结晶', { def: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (attr.mastery < 420) {
    return rule('输出-直伤', { def: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 50 })
  }
  return def({ def: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 50 })
}
