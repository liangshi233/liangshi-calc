export default function ({ attr, artis, cons, weapon, rule, def }) {
  // 直伤流
  if (attr.cpct * 2 + attr.cdmg > 280) {
    return rule('卡维-直伤', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 55, recharge: 55 })
  }

  // 妮绽流
  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    return rule('卡维-原绽放', { mastery: 100, recharge: 100 })
  }

  // 喵喵默认
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 100, recharge: 75 })
}
