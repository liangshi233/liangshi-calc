export default function ({ attr, artis, rule, def }) {
  if (weapon.name === '试作金珀' && attr.heal > 1 ) {
    return rule('砂糖-治疗', { hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 40, recharge: 100 , heal: 100 })
  }
  if (weapon.name === '昭心' && attr.phy > 10 ) {
    return rule('砂糖-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10 ) {
    return rule('砂糖-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if (artis.is('乐园4')) {
    return rule('砂糖-绽放', { atk: 35, cpct: 75, cdmg: 75, dmg: 35, mastery: 100 , recharge: 100 })
  }
  if ( attr.mastery >= 540 ) {
    return rule('砂糖-辅助', { atk: 50, cpct: 75, cdmg: 75, mastery: 100, dmg: 50 , recharge: 90 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('砂糖-输出', { hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30})
  }
  return def({ hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, phy: 0, recharge: 55 })
}
