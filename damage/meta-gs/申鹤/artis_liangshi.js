export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45 ) {
    return rule('申鹤-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 15 , phy: 100})
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4) && attr.mastery < 120 ) {
    return rule('申鹤-直伤', { atk: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 30})
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4) && attr.mastery >= 120) {
    return rule('申鹤-融化', { atk: 85, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30})
  }
  return def({ atk: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 55 })
}
