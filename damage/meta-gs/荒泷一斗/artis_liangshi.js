export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 45 ) {
    return rule('一斗-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 0 , phy: 100})
  }
  if (attr.mastery > 420) {
    return rule('一斗-盾辅', { atk: 20, def: 45, cpct: 90, cdmg: 90, mastery: 100, dmg: 50, recharge: 80 })
  }
  return def({ hp: 0, atk: 50, def: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
