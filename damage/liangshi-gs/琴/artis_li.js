export default function ({ attr, artis, rule, def }) {
  if (artis.is('atk', '3,4,5')) {
    return rule('琴-攻击', { atk: 100, cpct: 100, cdmg: 100, dmg: 30, recharge: 50 })
  }

  if (artis.is('atk,recharge', '3') && artis.is('atk', '4') && artis.is('heal', '5')) {
    return rule('琴-纯奶', { atk: 100, recharge: 100, heal: 100 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 100, recharge: 55, heal: 100 })
}
