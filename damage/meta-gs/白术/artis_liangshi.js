export default function ({ attr, artis, rule, def }) {
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 240) {
    return rule('白术-直伤', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 100 , recharge: 55 , phy: 0})
  }
  if (attr.mastery >= 120 && attr.heal < 30 ) {
    return rule('白术-激绽', { hp: 50 ,  atk: 75 , cpct: 100 , cdmg: 100 , mastery: 75 , dmg: 100 , recharge: 35 , phy: 0})
  }
  if (attr.heal > 30 ) {
    return rule('白术-治疗', { hp: 100 , atk: 50 , cpct: 50 , cdmg: 50 , mastery: 0 , recharge: 90 , dmg: 75 , heal: 100 })
  }
  return def({ hp: 100 , atk: 50, def: 0, cpct: 50, cdmg: 50, mastery: 0, dmg: 75, recharge: 90, heal: 0 })
}
