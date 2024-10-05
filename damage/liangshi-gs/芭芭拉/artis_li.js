export default function ({ attr, artis, rule, def }) {
  let heal = 80

  if (artis.is('heal', 5)) heal = 100

  // 种门（优先判断）
  if (attr.mastery > 600) {
    return rule('芭芭拉-种门', { hp: 100, mastery: 100, recharge: 35 })
  }

  // 纯奶
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('芭芭拉-纯奶', { hp: 100, recharge: 100, heal })
  }

  // 暴力
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('芭芭拉-暴力', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35, mastery: 75 })
  }

  // 通用
  return def({ atk: 55, hp: 80, cpct: 100, cdmg: 100, dmg: 75, recharge: 75, heal })
}
