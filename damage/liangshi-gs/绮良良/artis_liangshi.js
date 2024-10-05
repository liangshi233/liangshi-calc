export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 42) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-超绽', { hp: 55, atk: 45, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (artis.is('hp', 4)) {
    return rule('生存-护盾', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 60 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 60 })
}