export default function ({ attr, weapon, artis, rule, def }) {
  if (artis.is('hp', '3,4,5') ) {
    return rule('坎蒂丝-辅助', { hp: 100, cpct: 41, cdmg: 41 , recharge: 100 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('坎蒂丝-妮绽', { hp: 75, cpct: 41, cdmg: 41, mastery: 100, dmg: 60 , recharge: 100 })
  }
  if (attr.mastery < 540 && attr.mastery >= 120) {
    return rule('坎蒂丝-蒸发', { hp: 100, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 240) {
    return rule('坎蒂丝-直伤', { hp: 100, cpct: 100, cdmg: 100, dmg: 100 , recharge: 55 })
  }
  return def({ hp: 100, cpct: 100, cdmg: 100, mastery: 80, dmg: 100 , recharge: 30})
}
