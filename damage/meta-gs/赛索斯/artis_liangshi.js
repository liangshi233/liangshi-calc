export default function ({ attr, rule, def }) {
  if (attr.mastery >= 80 && attr.mastery < 540) {
    return rule('赛索斯-激化', { atk: 75, cpct: 100, cdmg: 100, mastery: 85, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('赛索斯-超绽', { atk: 25, cpct: 60, cdmg: 60, mastery: 100, dmg: 30, recharge: 75 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('赛索斯-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
}
