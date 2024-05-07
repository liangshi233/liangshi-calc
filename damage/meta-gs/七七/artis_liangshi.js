export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45) {
    return rule('七七-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 15, phy: 100 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 240) {
    return rule('七七-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
  }
  if (attr.mastery >= 120) {
    return rule('七七-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }
  if (attr.heal > 50 && attr.phy < 1) {
    return rule('七七-治疗', { atk: 100, cpct: 50, cdmg: 50, mastery: 0, recharge: 85, heal: 100 })
  }
  return def({ hp: 0, atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 100, recharge: 55, heal: 100 })
}
