export default function ({ attr, artis, rule, def }) {
  if (artis.is('hp', '3,4,5') && attr.hp > 40000 && attr.cpct * 2 + attr.cdmg < 160) {
    return rule('钟离-盾辅', { hp: 100, atk: 30, cpct: 41, cdmg: 41, recharge: 30 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('钟离-输出', { hp: 50, atk: 75, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 30, heal: 0 })
  }
  return def({ hp: 80, atk: 75, cpct: 100, cdmg: 100, dmg: 80, phy: 80, recharge: 55 })
}
