export default function ({ attr, artis, cons, rule, def }) {
  if (attr.phy > 24) {
    return rule('菲谢尔-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  if (artis.is('平雷4')) {
    return rule('菲谢尔-平雷', { atk: 75, cpct: 100, cdmg: 100, dmg: 100 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 75 })
}
