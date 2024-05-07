export default function ({ attr, artis, rule, def }) {
  // 精通沙
  if (attr.mastery > 120) {
    return rule('神里-精通', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }

  // 攻击沙
  if (artis.is('atk', '5') || attr.cpct * 2 + attr.cdmg > 324) {
    return rule('神里-攻击', { atk: 100, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, phy: 0, recharge: 30 })
}
