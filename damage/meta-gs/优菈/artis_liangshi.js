export default function ({ attr, rule, def }) {
  if (attr.cpct < 15 && attr.cdmg > 200) {
    return rule('优菈-核爆', { atk: 100, cdmg: 100, phy: 100 })
  }
  if (attr.phy < 1 && attr.mastery < 120) {
    return rule('优菈-直伤', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 55 , dmg: 100 })
  }
  if (attr.phy < 1 && attr.mastery >= 120) {
    return rule('优菈-融化', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 100 , recharge: 55 , dmg: 100 })
  }
  if (attr.phy >= 1 ) {
    return rule('优菈-物理', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 55 , dmg: 0 , phy: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
}
