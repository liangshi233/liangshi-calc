export default function ({ attr, weapon, rule, def }) {
  if (attr.mastery >= 320) {
    return rule('魈-扩散', { atk: 50, cpct: 100, cdmg: 100, mastery: 100, dmg: 80, recharge: 55 })
  }
  if (attr.mastery < 320 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('魈-直伤', { atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100 , recharge: 35})
  }
  return def({ atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
}
