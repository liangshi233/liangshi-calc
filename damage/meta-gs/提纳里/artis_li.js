export default function ({ attr, rule, def }) {
  if (attr.mastery < 120) {
    return rule('提纳里-攻击', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 75, recharge: 30 })
  }

  if (attr.mastery > 450) {
    return rule('提纳里-精通', { atk: 75, cpct: 100, cdmg: 100, dmg: 80, mastery: 100, recharge: 30 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 90, dmg: 100, recharge: 30 })
}
