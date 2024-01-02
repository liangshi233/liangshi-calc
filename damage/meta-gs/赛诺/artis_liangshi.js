export default function ({ attr, artis, rule, def }) {
  if (artis.is('乐园4')) {
    return rule('赛诺-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 80 })
  }
  if (attr.mastery >= 80) {
    return rule('赛诺-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
    if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('赛诺-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 25, dmg: 100 , recharge: 35})
  }
  return def({atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55})
}
