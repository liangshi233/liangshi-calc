export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('冰套4')) {
    return rule('驻场-冻结', { hp: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 120 ) {
    return rule('输出-直伤', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 120) {
    return rule('输出-融化', { hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 35 })
  }
  if (artis.is('hp', '4,5')) {
    return rule('生存-护盾', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
}
