export default function ({ attr, rule, def }) {
  if (attr.phy > 45 ) {
    return rule('海森-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 15 , phy: 100})
  }
  if (attr.mastery >= 120 && attr.mastery < 540 ) {
    return rule('海森-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 35 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('海森-妮绽', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 35 })
  }
    if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('海森-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100 , recharge: 30})
  }
  return def({atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 35})
}
