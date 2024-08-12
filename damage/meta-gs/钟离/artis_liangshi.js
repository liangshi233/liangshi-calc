export default function ({ attr, artis, rule, def }) {
  if (attr.phy >= 44) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('hp', '4,5')) {
    return rule('生存-护盾', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 420) {
    return rule('辅助-结晶', { hp: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 420) {
    if (artis.is('绝缘4')) {
      return rule('输出-直伤', { hp: 45, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 75 })
    }
    return rule('输出-直伤', { hp: 45, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
}
