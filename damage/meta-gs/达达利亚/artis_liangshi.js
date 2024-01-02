export default function ({ attr, weapon, rule, def }) {
  if (attr.mastery > 540) {
    return rule('公子-妮绽', { atk: 65, cpct: 90, cdmg: 90, mastery: 100, dmg: 80, recharge: 80 })
  }
  if (attr.mastery >= 120) {
    return rule('公子-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('公子-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 30})
  }
  if (attr.cpct < 15 && attr.cdmg > 200) {
    return rule('公子-核爆', { atk: 100, cdmg: 100, mastery: 100, dmg: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
