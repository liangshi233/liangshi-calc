export default function ({ attr, rule, def }) {
  if (attr.phy >= 1 ) {
    return rule('雷泽-物理', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 55 , dmg: 0 , phy: 100 })
  }
  if ( attr.mastery < 120) {
    return rule('雷泽-直伤', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 55 , dmg: 100 })
  }
  if ( attr.mastery >= 120 && attr.mastery < 540 ) {
    return rule('雷泽-激绽', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 100 , recharge: 55 , dmg: 100 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('雷泽-超绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 30 , recharge: 80 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
}
