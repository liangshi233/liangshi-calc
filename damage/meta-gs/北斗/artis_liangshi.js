export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 20) {
    return rule('北斗-物理', { atk: 80, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 15, heal: 0 })
  }
  if (artis.is('乐园4')) {
    return rule('北斗-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 55 })
  }
  if (attr.mastery >= 80) {
    return rule('北斗-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200) {
    return rule('北斗-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, mastery: 0, recharge: 55 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 0, heal: 0 })
}
