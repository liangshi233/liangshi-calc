export default function ({ attr, artis, cons, weapon, rule, def }) {
  // 绽放流（优先判断）
  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    return rule('坎蒂丝-原绽放', { mastery: 100, recharge: 90 })
  }

  // 盾辅流
  if (attr.cpct * 2 + attr.cdmg < 120) {
    return rule('坎蒂丝-盾辅', { hp: 100, recharge: 100 })
  }

  // 蒸发流
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('坎蒂丝-站场', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35, mastery: 75 })
  }

  // 通用（喵喵默认）
  return def({ hp: 75, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 55 })
}
