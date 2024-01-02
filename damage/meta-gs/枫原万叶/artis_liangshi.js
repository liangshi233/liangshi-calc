export default function ({ attr, artis, rule, def }) {
  if (artis.is('乐园4')) {
    return rule('万叶-绽放', { atk: 35, cpct: 75, cdmg: 75, dmg: 35, mastery: 100 , recharge: 100 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('万叶-输出', { hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30})
  }
  return def({ hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, phy: 0, recharge: 55 })
}
