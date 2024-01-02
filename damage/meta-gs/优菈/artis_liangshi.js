export default function ({ attr, rule, def }) {
  // 优菈核爆
  if (attr.cpct < 15 && attr.cdmg > 200) {
    return rule('优菈-核爆', { atk: 100, cdmg: 100, phy: 100 })
  }
  if (attr.phy < 1 && attr.mastery < 120) {
    return rule('优菈-直伤', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 35 , dmg: 100 })
  }
  if (attr.phy < 1 && attr.mastery < 120) {
    return rule('优菈-融化', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 100 , recharge: 35 , dmg: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
}
