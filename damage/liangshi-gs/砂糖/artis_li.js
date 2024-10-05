export default function ({ attr, artis, cons, rule, def }) {
  // 纯辅
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('砂糖-纯辅', { mastery: 100, recharge: 80 })
  }

  // 输出
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('砂糖-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 75 })
  }

  // 通用
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 75, recharge: 55, mastery: 100 })
}
