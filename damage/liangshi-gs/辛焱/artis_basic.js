export default function ({ attr, artis, weapon, rule, def, cons }) {
  if (attr.phy > 35) {
    if (cons < 6) {
      return rule('辛焱-物理', { atk: 85, def: 25, cpct: 100, cdmg: 100, recharge: 55, phy: 100 })
    }
    if (cons >= 6) {
      return rule('辛焱-物理', { atk: 75, def: 75, cpct: 100, cdmg: 100, recharge: 55, phy: 100 })
    }
  }
  if (artis.is('def', '4,5')) {
    return rule('生存-护盾', { def: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-烈绽', { def: 30, cpct: 60, cdmg: 60, mastery: 100, dmg: 35, recharge: 80 })
  }
  if (attr.mastery < 180 && artis.is('dmg', 4)) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (artis.is('mastery', 3) && attr.mastery < 540 && artis.is('dmg', 4)) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 180 && attr.mastery < 540 && artis.is('dmg', 4)) {
    return rule('驻场-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  return def({ def: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80 })
}
