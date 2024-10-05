export default function ({ attr, artis, cons, rule, def }) {
  let heal = 80

  if (artis.is('heal', 5)) heal = 100

  // 纯辅
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('班尼特-纯辅', { hp: 100, recharge: 100, heal })
  }

  // 输出
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('班尼特-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 75, mastery: 55 })
  }

  // 通用/副C
  return def({ atk: 55, hp: 80, cpct: 100, cdmg: 100, dmg: 75, recharge: 80, mastery: 35, heal })
}
