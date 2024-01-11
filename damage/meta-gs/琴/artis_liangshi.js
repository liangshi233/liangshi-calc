export default function ({ attr, artis, rule, def }) {
  if (attr.mastery >= 320) {
    return rule('琴-扩散', { atk: 60, cpct: 100, cdmg: 100, mastery: 100, dmg: 80, recharge: 55 })
  }
    if (attr.mastery < 320 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('琴-直伤', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 100 , recharge: 45})
  }
  if (attr.phy >= 41.5) {
    return rule('琴-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 0 , phy: 100})
  }
  if (attr.heal > 37 && attr.phy < 41.4) {
    return rule('琴-治疗', { atk: 100 , cpct: 35 , cdmg: 35 , mastery: 0 , recharge: 85 , dmg: 35 , heal: 100 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 55, heal: 100 })
}
