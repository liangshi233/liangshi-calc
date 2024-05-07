export default function ({ artis, rule, def }) {
  if (artis.is('atk', '3,5') && artis.is('dmg', '4')) {
    return rule('神子-攻击', { atk: 100, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
}
