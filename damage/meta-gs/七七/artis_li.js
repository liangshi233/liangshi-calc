export default function ({ attr, artis, rule, def }) {
  if (artis.is('atk', '3,4,5')) {
    return rule('七七-攻击', { atk: 100, cpct: 100, cdmg: 100, recharge: 30 })
  }

  if (artis.is('recharge', '3') && artis.is('heal', '5')) {
    return rule('七七-纯奶', { atk: 100, recharge: 100, heal: 100 })
  }

  if (artis.is('atk', '3') && artis.is('heal', '5')) {
    // 对齐小攻击
    return rule('七七-纯奶', { atk: 100, recharge: 49.8, heal: 100 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 100, recharge: 55, heal: 100 })
}
