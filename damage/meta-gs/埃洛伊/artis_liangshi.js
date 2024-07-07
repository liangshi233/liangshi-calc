export default function ({ attr, artis, rule, def }) {
  if (artis.is('冰套4')) {
    return rule('驻场-冻结', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  if (artis.is('剧团4')) {
    return rule('输出-直伤', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 ) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 35 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 35 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 35 })
}
