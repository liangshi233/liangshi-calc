export default function ({ attr, artis, rule, def }) {
  if (attr.mastery >= 320) {
    return rule('珐露珊-扩散', { atk: 65, cpct: 90, cdmg: 90, mastery: 100, dmg: 80, recharge: 55 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('珐露珊-输出', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
  }
  if (attr.phy < 1) {
    return rule('珐露珊-辅助', { atk: 75, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 75 })
  }
  return def({ hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, phy: 0, recharge: 55 })
}
