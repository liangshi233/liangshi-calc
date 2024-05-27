export default function ({ attr, artis, rule, def }) {
  if (artis.is('dmg', 4) && attr.mastery < 80) {
    return rule('希格雯-直伤', { hp: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 55, heal: 25 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 80) {
    return rule('希格雯-蒸发', { hp: 100, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55, heal: 25 })
  }
  if (attr.heal > 5) {
    return rule('希格雯-治疗', { hp: 100, cpct: 25, cdmg: 25, mastery: 0, dmg: 25, recharge: 35, heal: 100 })
  }
  return def({ hp: 100, cpct: 50, cdmg: 50, dmg: 80, recharge: 55, heal: 100 })
}
