export default function ({ attr, artis, weapon, cons, rule, def }) {
  let heal = 75
  if (artis.is('heal', 5)) heal = 100

  let cpct = 0
  if (weapon.name == '西风长枪') cpct = 100

  // 纯辅
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('米卡-辅助', { hp: 100, cpct, recharge: 100, heal })
  }

  // 暴力
  if (artis.is('atk', '3')) {
    return rule('米卡-输出', { atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 35 })
  }

  // 喵喵默认
  return def({ atk: 55, hp: 75, cpct: 100, cdmg: 100, dmg: 75, phy: 75, recharge: 55, heal })
}
