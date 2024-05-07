export default function ({ attr, artis, weapon, cons, rule, def }) {
  // 暴力（不推荐）
  if (artis.is('dmg', '4') || attr.dmg > 20) {
    return rule('瑶瑶-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 75 })
  }

  if (artis.is('phy', '4') || attr.phy > 24) {
    return rule('瑶瑶-输出', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  // 默认纯奶
  return def({ hp: 100, recharge: 100, heal: 100 })
}
