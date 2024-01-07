export default function ({ attr, weapon, rule, def }) {
  if ( attr.mastery >= 180 && attr.mastery < 540 ) {
    return rule('莫娜-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 80, recharge: 90 })
  }
  if ( attr.mastery < 180 && attr.cpct * 2 + attr.cdmg > 150 && attr.mastery < 540 ) {
    return rule('莫娜-直伤', { hp: 0, atk: 85 , cpct: 100, cdmg: 100, dmg: 100 , recharge: 65 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('莫娜-妮绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 60 , recharge: 100 })
  }
  if ( weapon.name === '试作金珀' && attr.heal > 1 ) {
    return rule('莫娜-治疗', { hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 40, recharge: 100 , heal: 100 })
  }
  if ( weapon.name === '昭心' && attr.phy > 10 ) {
    return rule('莫娜-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if ( weapon.name === '天空之卷' && attr.phy > 10 ) {
    return rule('莫娜-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 75, heal: 0 })
}
