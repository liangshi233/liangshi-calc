export default function ({ attr, artis, rule, def }) {
  if (attr.heal > 5 ) {
    return rule('芭芭拉-治疗', { hp: 100 , atk: 50 , cpct: 0 , cdmg: 0 , mastery: 0 , dmg: 0 , recharge: 85 , heal: 100 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 80) {
    return rule('芭芭拉-直伤', { hp: 25, atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 30, heal: 25 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 80) {
    return rule('芭芭拉-蒸发', { hp: 25, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30, heal: 25 })
  }
  return def({ hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 80, recharge: 55, heal: 100 })
}
