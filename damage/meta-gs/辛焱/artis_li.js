export default function ({ attr, artis, cons, rule, def }) {
  let _def = 55

  if (cons >= 6) _def = 75

  // 充能盾辅流（优先判断）
  if (artis.is('def', '4,5') || (attr.recharge > 200 && cons >= 2)) {
    if (cons >= 2) {
      return rule('辛焱-盾辅', { def: 100, recharge: 100 })
    }
    return rule('辛焱-盾辅', { def: 100 })
  }

  // 大招速切流
  if ((attr.cpct < 15 || attr.cdmg / attr.cpct > 8) && cons >= 2) {
    return rule('辛焱-速切', { atk: 75, def: _def, cdmg: 100, phy: 100, recharge: 55 })
  }

  // 驻场重击流（通用）
  return def({ atk: 75, def: _def, cpct: 100, cdmg: 100, phy: 100, recharge: 35 })
}
