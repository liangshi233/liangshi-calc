export default function ({ attr, rule, def }) {
  if (attr.mastery >= 80 && attr.mastery < 540 ) {
    return rule('提纳里-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 90, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 240) {
    return rule('提纳里-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100 , recharge: 30})
  }
  if ( attr.mastery >= 540 ) {
    return rule('提纳里-妮绽', { atk: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 35 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 90, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
