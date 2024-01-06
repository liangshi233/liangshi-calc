export default function ({ attr, artis, rule, def }) {
  if (attr.heal > 5 ) {
    return rule('班尼特-治疗', { hp: 100 , atk: 25 , cpct: 0 , cdmg: 0 , mastery: 0 , dmg: 0 , recharge: 85 , heal: 100 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('班尼特-输出', { hp: 50, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30, heal: 50 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('班尼特-烈绽', { hp: 45 , cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 55 })
  }
  return def({ hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 80, recharge: 55, heal: 100 })
}
