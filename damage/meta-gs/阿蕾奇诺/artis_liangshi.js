export default function ({ attr, artis, rule, def }) {
  if (attr.phy >= 44) {
    return rule('仆人-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery < 120) {
    return rule('仆人-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  if (attr.mastery >= 120 && attr.mastery < 540) {
    return rule('仆人-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('仆人-烈绽', { atk: 30, cpct: 60, cdmg: 60, mastery: 100, dmg: 35, recharge: 75 })
  }
  if (artis.is('乐园4')) {
    return rule('仆人-烈绽', { atk: 30, cpct: 60, cdmg: 60, mastery: 100, dmg: 35, recharge: 75 })
  }
  return def({ hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 0, recharge: 55 })
}
