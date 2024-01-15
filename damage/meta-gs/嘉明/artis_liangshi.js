export default function ({ attr, rule, def }) {
  if (attr.mastery < 120 ) {
    return rule('嘉明-直伤', { atk: 85 , cpct: 100, cdmg: 100, dmg: 100 , recharge: 35 })
  }
  if ( attr.mastery >= 120 && attr.mastery < 540 ) {
    return rule('嘉明-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 35 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('嘉明-烈绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 30 , recharge: 100 })
  }
  if (attr.phy >= 41.4 ) {
    return rule('嘉明-物理', { atk: 85 , cpct: 100 , cdmg: 100, recharge: 15 , phy: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100 , recharge: 35 })
}
