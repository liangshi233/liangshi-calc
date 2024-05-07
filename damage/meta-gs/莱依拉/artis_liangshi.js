export default function ({ attr, artis, rule, def }) {
  if (artis.is('冰套4')) {
    return rule('莱依拉-冰风4', { hp: 25, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('莱依拉-输出', { hp: 25, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 45 })
  }
  if (artis.is('hp', '3,4,5')) {
    return rule('莱依拉-盾辅', { hp: 100, atk: 25, cpct: 41, cdmg: 41, recharge: 35 })
  }
  return def({ hp: 100, atk: 25, cpct: 41, cdmg: 41, recharge: 35 })
}
