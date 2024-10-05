export default function ({ attr, artis, weapon, cons, rule, def }) {
  let cpct = 0
  if (weapon.name == '西风猎弓') cpct = 80

  let heal = 0
  let _def = 75

  if (cons >= 4) {
    heal = 80
    _def = 80
  }

  let recharge = 100
  if (attr.recharge > 280) recharge = 80

  // 纯辅
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('五郎-纯辅', { def: 90, cpct, recharge, mastery: 35, heal })
  }

  // 暴力（不推荐）
  if (artis.is('phy', '4')) {
    return rule('五郎-输出', { atk: 75, def: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
  }

  // 通用
  if (cpct < 50) cpct = 50

  return def({ atk: 50, def: _def, cpct, cdmg: 50, dmg: 50, recharge, mastery: 35, heal })
}
