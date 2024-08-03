export default function ({ attr, weapon, artis, rule, def }) {
  if (attr.phy >= 52) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('冰套4')) {
    return rule('输出-冻结', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('输出-绽放', { hp: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.mastery < 180) {
    return rule('输出-直伤', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery > 180) {
    return rule('输出-蒸发', { hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  return def({ hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
}