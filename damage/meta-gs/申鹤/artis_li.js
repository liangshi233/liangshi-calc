export default function ({ attr, artis, rule, def }) {
  if (attr.recharge > 150 && attr.cpct * 2 + attr.cdmg < 150) {
    return rule('申鹤-纯辅', { atk: 100, cpct: 30, cdmg: 30, recharge: 80 })
  }

  if ((artis.is('atk', '3') && artis.is('dmg', '4') && artis.is('cpct,cdmg', '5')) || artis.is('冰4')) {
    return rule('申鹤-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }

  return def({ atk: 100, cpct: 100, cdmg: 100, dmg: 80, recharge: 55 })
}
