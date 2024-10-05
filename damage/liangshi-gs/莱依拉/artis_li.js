export default function ({ attr, artis, cons, weapon, rule, def }) {
  // 盾辅流
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('莱依拉-通用', { hp: 100, recharge: 35 })
  }

  // 输出流（真爱限定）
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('莱依拉-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 100 })
  }

  // （喵喵默认）
  return def({ hp: 100, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
}
