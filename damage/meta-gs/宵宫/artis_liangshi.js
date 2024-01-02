export default function ({ attr, artis, rule, def }) {
  // 宵宫纯色流派
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('宵宫-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 30})
  }
  if (attr.mastery > 80  && attr.mastery < 540 ) {
    return rule('宵宫-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100 , recharge: 55})
  }
  if ( attr.mastery >= 540 ) {
    return rule('宵宫-烈绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 3 0 , recharge: 100})
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 })
}
