export default function ({ attr, artis, cons, rule, def }) {
  if (artis.is('dmg', '4') && attr.mastery > 120) {
    return rule('雷泽-激化', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 75 })
  }

  if (artis.is('mastery', '3,4,5') || attr.mastery > 240) {
    return rule('雷泽-精通', { mastery: 100, recharge: 80 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 100 })
}
