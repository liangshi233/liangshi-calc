export default function ({ attr, rule, def }) {
  if (attr.dmg > 46.6) {
    return rule('妮露-直伤', { hp: 80, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }

  return def({ hp: 100, mastery: 80, dmg: 30, recharge: 30 })
}
