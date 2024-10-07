export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy >= 44) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('hp', 5)) {
    return rule('生存-护盾', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { hp: 20, atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 50 })
  }
  if (artis.is('dmg', 4) && artis.is('mastery', 3)) {
    return rule('驻场-融化', { hp: 20, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 120 && attr.mastery < 540) {
    return rule('驻场-蒸发', { hp: 20, atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
}
