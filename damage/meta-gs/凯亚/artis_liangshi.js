export default function ({ attr, artis, rule, def }) {
  if (attr.phy >= 41.4 ) {
    return rule('凯亚-物理', { atk: 85 , cpct: 100 , cdmg: 100 , recharge: 30 , phy: 100 })
  }
  if (artis.is('冰套4')) {
    return rule('凯亚-冰风4', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 ) {
    return rule('凯亚-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 30 })
  }
  if (attr.mastery >= 120 ) {
	  return rule('凯亚-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 , recharge: 55 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 , recharge: 30})
}
