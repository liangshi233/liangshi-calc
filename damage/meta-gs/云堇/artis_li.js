export default function ({ attr, artis, weapon, cons, rule, def }) {
  let cpct = 0
  if (weapon.name == '西风长枪') cpct = 80

  // 纯辅
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('云堇-辅助', { def: 100, cpct, recharge: 90 })
  }

  // 暴力
  if (artis.is('phy', '4')) {
    return rule('云堇-输出', { atk: 75, def: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 55 })
  }

  // 喵喵默认
  if (cpct < 50) cpct = 50

  return def({ def: 100, cpct, cdmg: 50, recharge: 90 })
}
