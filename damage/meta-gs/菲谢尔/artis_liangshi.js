export default function ({ attr, weapon, rule, def }) {
  if (attr.phy > 10 ) {
    return rule('菲谢尔-物理', { atk: 80, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if (artis.is('剧团4')) {
    return rule('菲谢尔-速切', { atk: 80, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 35 })
  }
  if (artis.is('乐园4')) {
    return rule('菲谢尔-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 55 })
  }
  if (attr.mastery >= 80) {
    return rule('菲谢尔-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200 ) {
    return rule('菲谢尔-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , mastery: 0, recharge: 35 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 0, heal: 0 })
}
