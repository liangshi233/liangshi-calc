export default function ({ attr, weapon, artis, rule, def }) {
  if (attr.mastery <= 180 && attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('卡维-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 55 })
  }
  if (attr.mastery > 180 && attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('卡维-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if ( attr.phy > 44 ) {
    return rule('卡维-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 , recharge: 15 })
  }
  if ( attr.mastery >= 180 ) {
    return rule('卡维-绽放', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 30 , recharge: 75 })
  }
  return def({ atk: 55, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 55 })
}
