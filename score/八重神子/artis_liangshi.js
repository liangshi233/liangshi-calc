export default function ({ attr, rule, def }) {
  if (attr.mastery >= 80) {
    return rule('八重-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55  })
  }
     if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200 ) {
    return rule('八重-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , mastery: 25, recharge: 30 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
}
