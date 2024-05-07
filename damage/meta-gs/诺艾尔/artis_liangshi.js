export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 44) {
    return rule('诺艾尔-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 15, phy: 100 })
  }
  if (attr.mastery > 420) {
    return rule('诺艾尔-盾辅', { atk: 20, def: 75, cpct: 80, cdmg: 80, mastery: 100, dmg: 50, recharge: 80 })
  }
  if (artis.is('def', '3,4,5') && attr.cpct * 2 + attr.cdmg < 160) {
    return rule('诺艾尔-盾辅', { atk: 45, def: 100, cpct: 80, cdmg: 80, dmg: 75, recharge: 80 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('诺艾尔-输出', { atk: 75, def: 90, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  return def({ hp: 0, atk: 50, def: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
