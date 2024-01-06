export default function ({ attr, artis, rule, def }) {
  if (artis.is('冰套4')) {
    return rule('甘雨-冰风4', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 120) {
    return rule('甘雨-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('甘雨-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 30})
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 })
}
