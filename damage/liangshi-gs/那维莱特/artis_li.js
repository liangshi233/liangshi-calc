export default function ({ attr, artis, rule, def }) {
  if (artis.is('hp', 4)) {
    return rule('那维-生命', { hp: 100, cpct: 100, cdmg: 100, recharge: 75, mastery: 75 })
  }

  return def({ hp: 100, cpct: 100, cdmg: 100, dmg: 100, recharge: 75, mastery: 75 })
}
