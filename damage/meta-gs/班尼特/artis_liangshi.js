export default function ({ attr, artis, rule, def }) {
  if (attr.mastery >= 540) {
    return rule('班尼特-烈绽', { hp: 45, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 55 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('班尼特-输出', { hp: 35, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 45, heal: 35 })
  }
  if (attr.heal > 5) {
    return rule('班尼特-治疗', { hp: 100, atk: 20, cpct: 25, cdmg: 25, mastery: 0, dmg: 25, recharge: 85, heal: 100 })
  }
  return def({ hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 80, recharge: 55, heal: 100 })
}
