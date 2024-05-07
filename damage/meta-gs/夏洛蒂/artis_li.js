export default function ({ attr, artis, cons, rule, def }) {
  if (artis.is('dmg', '4') || attr.cpct + attr.cdmg >= 180) {
    return rule('夏洛蒂-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 35 })
  }

  let recharge = 100

  if (cons >= 4) {
    recharge = 80
  }

  if (artis.is('recharge', '3')) {
    recharge = 100
  }

  return def({ atk: 100, recharge, heal: 100 })
}
