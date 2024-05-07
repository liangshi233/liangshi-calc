export default function ({ attr, rule, def }) {
  if (attr.phy >= 41.4) {
    return rule('水主-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  if (attr.mastery >= 540) {
    return rule('水主-妮绽', { hp: 20, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 100 })
  }
  if (attr.mastery >= 160) {
    return rule('水主-蒸发', { hp: 30, atk: 75, cpct: 100, cdmg: 100, mastery: 60, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 160) {
    return rule('水主-直伤', { hp: 25, atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 55 })
  }
  return def({ hp: 30, atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 60, recharge: 55 })
}
