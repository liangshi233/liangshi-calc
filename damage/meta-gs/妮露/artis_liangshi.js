export default function ({ attr, weapon, artis, rule, def }) {
  if (artis.is('hp', '3,4,5') && attr.hp > 32000 && attr.cpct * 2 + attr.cdmg < 160) {
    return rule('妮露-绽放', { hp: 100, atk: 30, cpct: 41, cdmg: 41, mastery: 85 , recharge: 80 })
  }
  if (attr.mastery >= 120) {
    return rule('妮露-蒸发', { hp: 100, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 240) {
    return rule('妮露-直伤', { hp: 100, cpct: 100, cdmg: 100, dmg: 100 , recharge: 50})
  }
  return def({ hp: 100, cpct: 100, cdmg: 100, mastery: 80, dmg: 100 , recharge: 30})
}
