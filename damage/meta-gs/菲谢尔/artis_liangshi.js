export default function ({ attr, weapon, rule, def }) {
  if (attr.phy > 10 ) {
    return rule('菲谢尔-物理', { hp: 0, atk: 80, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 0, heal: 0 })
}
