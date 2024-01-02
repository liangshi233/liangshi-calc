export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 45 ) {
    return rule('芙宁娜-物理', { atk: 85 , cpct: 100 , cdmg: 100 , mastery: 0 , dmg: 0 , recharge: 15 , phy: 100})
  }
  if (attr.mastery >= 540) {
    return rule('芙宁娜-妮绽', { hp: 65, cpct: 90, cdmg: 90, mastery: 100, dmg: 80, recharge: 80 })
  }
  if (attr.mastery < 540 && attr.mastery >= 120) {
    return rule('芙宁娜-蒸发', { hp: 100, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 180) {
    return rule('芙宁娜-直伤', { hp: 100, cpct: 100, cdmg: 100, dmg: 100 , recharge: 30})
  }
  if (artis.is('剧团4')) {
    return rule('芙宁娜-速切', { hp: 100, cpct: 100, cdmg: 100, mastery: 750, dmg: 100, recharge: 55 })
  }
  return def({ hp: 100, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
