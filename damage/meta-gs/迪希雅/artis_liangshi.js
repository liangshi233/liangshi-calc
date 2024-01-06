export default function ({ attr, artis, rule, def }) {
  if (artis.is('hp', '3,4,5') && attr.hp > 40000 && attr.cpct * 2 + attr.cdmg < 100) {
    return rule('迪希雅-消解', { hp: 100, atk: 30, cpct: 41, cdmg: 41, recharge: 30 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 240) {
    return rule('迪希雅-直伤', { hp: 85, atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 30})
  }
  if (attr.mastery >= 80 ) {
    return rule('迪希雅-蒸发', { hp: 75, atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100 , recharge: 55 })
  }
  if (artis.is('乐园4')) {
    return rule('迪希雅-烈绽', { hp: 45, atk: 30, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 75 })
  }
  if (artis.is('海染4')) {
    return rule('迪希雅-挂机', { hp: 100 , def: 85, recharge: 30 , heal: 100 })
  }
  return def({ hp: 75, atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 0, recharge: 75 })
}
