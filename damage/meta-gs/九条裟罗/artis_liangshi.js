export default function ({ artis, weapon, attr, rule, def, cons }) {
  if (artis.is('乐园4')) {
    return rule('九条-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 75 })
  }
  if (artis.is('剧团4')) {
    return rule('九条-速切', { atk: 80, cpct: 100, cdmg: 100, mastery: 25, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('九条-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 75 })
  }
  if (attr.mastery < 540 && attr.mastery >= 120) {
    return rule('九条-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 65, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120) {
    return rule('九条-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, mastery: 25, recharge: 55 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
}
