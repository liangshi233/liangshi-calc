export default function ({ attr, artis, rule, def }) {
  if ( attr.mastery >= 540 ) {
    return rule('心海-妮绽', { hp: 80 , atk: 0, cpct: 0, cdmg: 0, mastery: 100, dmg: 80 , recharge: 75, heal: 100 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 80 ) {
    return rule('心海-直伤', { hp: 100, atk: 75 , cpct: 0 , cdmg: 0 , mastery: 0 , dmg: 100 , recharge: 35 , heal: 100 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 80  && attr.mastery < 540 ) {
    return rule('心海-蒸发', { hp: 100 , atk: 55 , cpct: 0 , cdmg: 0 , mastery: 75 , dmg: 100 , recharge: 55 , heal: 100 })
  }
  if (attr.cpct > 1 ) {
    return rule('心海-双爆', { hp: 100 , atk: 50 , cpct: 100 , cdmg: 100 , mastery: 75 , dmg: 100 , recharge: 35 , heal: 100 })
  }
  if (attr.heal > 30 ) {
    return rule('心海-治疗', { hp: 100 , atk: 20 , cpct: 0 , cdmg: 0 , mastery: 20 , dmg: 25 , recharge: 85 , heal: 100 })
  }
  return def({ hp: 100, atk: 50, def: 0, cpct: 0, cdmg: 0, mastery: 0, dmg: 100, phy: 0, recharge: 55, heal: 100 })
}
