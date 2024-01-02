export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 45 ) {
    return rule('娜维娅-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 15 , phy: 100})
  }
  if (attr.mastery > 420) {
    return rule('娜维娅-盾辅', { atk: 50, def: 0, cpct: 90, cdmg: 90, mastery: 100, dmg: 50, recharge: 80 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 35, heal: 0 })
}
