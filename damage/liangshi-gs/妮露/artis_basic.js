export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('hp', '3,4,5')) {
    return rule('功能-特化', { hp: 100, cpct: 40, cdmg: 40, mastery: 60, dmg: 40, recharge: 80 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-绽放', { hp: 100, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 80) {
    return rule('驻场-直伤', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 50 })
  }
  if (artis.is('dmg', 4) && attr.mastery > 80) {
    return rule('驻场-蒸发', { hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 50 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, mastery: 60, dmg: 40, recharge: 80 })
}
