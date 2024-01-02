export default function ({ attr, rule, def }) {
  if (attr.recharge > 240) {
    return rule('温迪-辅助', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 100 })
  }
    if (attr.mastery > 320) {
    return rule('温迪-扩散', { atk: 50, cpct: 90, cdmg: 90, mastery: 100, dmg: 75, recharge: 90 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 75 })
}
