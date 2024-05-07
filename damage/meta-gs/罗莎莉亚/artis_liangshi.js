export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45) {
    return rule('罗莎-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 15, phy: 100 })
  }
  if (artis.is('冰套4')) {
    return rule('罗莎-冰风4', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120) {
    return rule('罗莎-冻结', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery > 160) {
    return rule('罗莎-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
}
