export default function ({ attr, artis, weapon, rule, def }) {
   if (attr.mastery > 420) {
     return rule('托马-燃绽', { atk: 55, cpct: 75, cdmg: 75, mastery: 100, dmg: 50, recharge: 100 })
   }
   if (attr.mastery < 50 && attr.cpct * 2 + attr.cdmg > 240) {
     return rule('托马-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
  }
    if (artis.is('hp', '3,4,5') && attr.hp > 32000 && attr.cpct * 2 + attr.cdmg < 120) {
    return rule('托马-盾辅', { hp: 100, atk: 30, cpct: 41, cdmg: 41, recharge: 100 })
  }
  return def({ hp: 90, atk: 55, def: 0, cpct: 90, cdmg: 90, mastery: 0, dmg: 90, phy: 0, recharge: 55, heal: 0 })
}
