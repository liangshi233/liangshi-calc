export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 35) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (artis.is('dmg', 4) && artis.is('mastery', 3)) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 45 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 120 && attr.mastery < 540) {
    return rule('驻场-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-烈绽', { atk: 30, cpct: 60, cdmg: 60, mastery: 100, dmg: 35, recharge: 80 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 45 })
}

