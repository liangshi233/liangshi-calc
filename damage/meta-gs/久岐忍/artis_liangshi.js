export default function ({ attr, weapon, rule, def }) {
  if (attr.heal > 5 ) {
    return rule('久岐忍-治疗', { hp: 100 , atk: 0 , cpct: 0 , cdmg: 0 , mastery: 75 , dmg: 0 , recharge: 55 , heal: 100 })
  }
  if (attr.phy > 45 ) {
    return rule('久岐忍-物理', { atk: 80, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if (artis.is('剧团4')) {
    return rule('久岐忍-速切', { hp: 25, atk: 80, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
  }
  if (artis.is('乐园4')) {
    return rule('久岐忍-超绽', { hp: 35, atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('久岐忍-超绽', { hp: 35, atk: 25, cpct: 85, cdmg: 85, dmg: 35, mastery: 100 , recharge: 55 })
  }
  if (attr.mastery < 540 && attr.mastery >= 80) {
    return rule('久岐忍-激绽', { hp: 25, atk: 75, cpct: 100, cdmg: 100, mastery: 80, dmg: 100, recharge: 35 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200 ) {
    return rule('久岐忍-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , mastery: 25, recharge: 35 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 0, heal: 0 })
}
