export default function ({ artis, attr, weapon, rule, def }) {
  if (artis.is('乐园4')) {
    return rule('多莉-超绽', { hp: 35, atk: 25, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('多莉-超绽', { hp: 35, atk: 25, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 55 })
  }
  if (attr.mastery < 540 && attr.mastery >= 80) {
    return rule('久多莉-激绽', { hp: 25, atk: 75, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200 && attr.heal < 35 ) {
    return rule('多莉-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 55 })
  }
  if (attr.heal > 5 ) {
    return rule('多莉-治疗', { hp: 100 , atk: 20 , cpct: 25 , cdmg: 25 , dmg: 25 , recharge: 85 , heal: 100 })
  }
  return def({ hp: 100, atk: 25, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 85, heal: 100 })
}
