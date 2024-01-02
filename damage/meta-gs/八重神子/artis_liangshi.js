export default function ({ artis, attr, rule, def , cons }) {
  if (artis.is('乐园4')) {
    return rule('八重-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 45 })
  }
  if (artis.is('剧团4')) {
    return rule('八重-速切', { atk: 70, cpct: 100, cdmg: 100, mastery: 60, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 80) {
    return rule('八重-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 55, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200 ) {
    return rule('八重-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , mastery: 25, recharge: 45 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
}

