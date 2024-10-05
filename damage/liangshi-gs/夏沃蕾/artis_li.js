export default function ({ attr, artis, cons, weapon, rule, def }) {
  // 纯辅
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('夏沃蕾-纯辅', { hp: 100, recharge: 35, heal: 100 })
  }

  // 输出
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('夏沃蕾-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 35 })
  }

  // 通用
  let hp = 90
  if (attr.hp > 40000) hp = 80

  let recharge = 70
  if (artis.is('宗室4')) recharge = 80

  return def({ hp, atk: 50, cpct: 80, cdmg: 80, recharge, mastery: 30, heal: 100 })
}
