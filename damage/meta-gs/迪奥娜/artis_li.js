export default function ({ attr, artis, cons, rule, def }) {
  let heal = 80
  let recharge = 80

  if (artis.is('heal', 5)) heal = 100

  if (cons === 6) recharge = 90

  // 输出
  if (attr.dmg > 24) {
    return rule('迪奥娜-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 55, recharge: 55 })
  }

  // 通用
  return def({ hp: 100, recharge, heal })
}
