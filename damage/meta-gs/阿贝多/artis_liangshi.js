export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 45) {
    return rule('阿贝多-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 15, phy: 100 })
  }
  if (artis.is('宗室4')) {
    return rule('阿贝多-宗室', { atk: 65, def: 55, cpct: 100, cdmg: 100, dmg: 100, recharge: 80 })
  }
  if (attr.mastery > 420) {
    return rule('阿贝多-盾辅', { atk: 0, def: 50, cpct: 90, cdmg: 90, mastery: 100, dmg: 50, recharge: 80 })
  }
  return def({ hp: 0, atk: 0, def: 100, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 35, heal: 0 })
}
