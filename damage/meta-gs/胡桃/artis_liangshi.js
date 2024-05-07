export default function ({ attr, rule, def }) {
  // 核爆胡桃
  if (attr.cpct < 15 && attr.cdmg > 280) {
    return rule('胡桃-核爆', { hp: 90, atk: 50, cdmg: 100, mastery: 90, dmg: 100 })
  }
  if (attr.mastery >= 120) {
    return rule('胡桃-蒸发', { hp: 75, atk: 40, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('胡桃-直伤', { hp: 100, atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
  }
  return def({ hp: 80, atk: 50, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 })
}
