export default function ({ attr, rule, def }) {
  // 蒸发绫人，具体数值待定
  if (attr.mastery > 160) {
    return rule('绫人-蒸发', { hp: 45, atk: 75, cpct: 100, cdmg: 100, mastery: 60, dmg: 100, recharge: 30 })
  }
  if (attr.mastery < 160 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('绫人-直伤', { hp: 50, atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100 , recharge: 35})
  }
  if (attr.phy > 45 ) {
    return rule('绫人-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 15 , phy: 100})
  }
  return def({ hp: 50, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
}
