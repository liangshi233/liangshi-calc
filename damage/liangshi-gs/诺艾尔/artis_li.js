export default function ({ attr, artis, rule, def }) {
  let dmg = 100
  let isdef = false

  if (artis.is('def', '4')) {
    isdef = true
    dmg = 90
  }

  if (artis.is('def', '5')) isdef = true

  if (isdef) {
    return rule('诺艾尔-防御', { atk: 50, def: 100, cpct: 100, cdmg: 100, dmg, recharge: 70 })
  }

  return def({ atk: 50, def: 90, cpct: 100, cdmg: 100, dmg: 100, recharge: 70 })
}
