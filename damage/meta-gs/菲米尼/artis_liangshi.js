export default function ({ attr, artis, rule, def }) {
  if (artis.is('冰套4')) {
    return rule('菲米尼-冰风4', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  if (attr.phy < 1 && attr.mastery < 120) {
    return rule('菲米尼-直伤', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 35 , dmg: 100 })
  }
  if (attr.phy < 1 && attr.mastery >= 120) {
    return rule('菲米尼-融化', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 75 , recharge: 35 , dmg: 100 })
  }
  if (attr.phy >= 1 ) {
    return rule('菲米尼-物理', { atk: 75 , cpct: 100 , cdmg: 100 , mastery: 0 , recharge: 35 , dmg: 0 , phy: 100 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
}
