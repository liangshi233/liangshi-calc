export default function ({ attr, artis, weapon, rule, def , cons }) {
  if (attr.phy > 45 ) {
    if ( cons < 6 ) {
     return rule('辛焱-物理', { atk: 85 , def: 25, cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 55 , phy: 100 })
    }
    if ( cons >= 6 ) {
     return rule('辛焱-物理', { atk: 85 , def: 75, cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 55 , phy: 100 })
    }
  }
  if (artis.is('def', '3,4,5') && attr.cpct * 2 + attr.cdmg < 160) {
    return rule('辛焱-盾辅', { atk: 45, def: 100, cpct: 80, cdmg: 80, dmg: 75, recharge: 80 })
  }
  if (attr.mastery < 120 && artis.is('dmg', 4)) {
    return rule('辛焱-直伤', { atk: 85 , def: 25, cpct: 100, cdmg: 100, dmg: 100 , recharge: 35 })
  }
  if ( attr.mastery >= 120 && attr.mastery < 540 && artis.is('dmg', 4)) {
    return rule('辛焱-蒸发', { atk: 75, def: 25, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 35 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('辛焱-烈绽', { atk: 20, def: 15, cpct: 60, cdmg: 60, mastery: 100, dmg: 30 , recharge: 100 })
  }
  return def({ hp: 0, atk: 50, def: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
