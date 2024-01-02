export default function ({ attr, rule, def }) {
  if ( attr.cpct < 15 && attr.cdmg > 280 ) {
    return rule('林尼-核爆', { hp: 0, atk: 85, cdmg: 100, mastery: 75, dmg: 100 })
  }
  if (attr.mastery < 160 && attr.cpct * 2 + attr.cdmg > 150 && attr.mastery < 540 ) {
    return rule('林尼-直伤', { hp: 0, atk: 85 , cpct: 100, cdmg: 100, dmg: 100 , recharge: 30})
  }
  if ( attr.mastery >= 160 && attr.mastery < 540 ) {
    return rule('林尼-蒸发', { hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 30 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('林尼-烈绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 30 , recharge: 100})
  }
  if (attr.phy >= 41.4 ) {
    return rule('林尼-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 30 , phy: 100})
  }
  return def({ hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 0, dmg: 100 , recharge: 55})
}
