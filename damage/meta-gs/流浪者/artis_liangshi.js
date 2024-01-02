export default function ({ attr, weapon, rule, def }) {
  if (attr.mastery >= 320) {
    return rule('流浪者-扩散', { atk: 50, cpct: 100, cdmg: 100, mastery: 100, dmg: 80, recharge: 55 })
  }
    if (attr.mastery < 320 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('流浪者-直伤', { atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100 , recharge: 35})
  }
  if (weapon.name === '试作金珀' && attr.heal > 1 ) {
    return rule('流浪者-治疗', {  hp: 100, atk: 50, cpct: 50, cdmg: 30, dmg: 40, recharge: 100 , heal: 100 })
  }
  if (weapon.name === '昭心' && attr.phy > 10 ) {
    return rule('流浪者-物理', {  hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10 ) {
    return rule('流浪者-物理', {  hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  return def({ atk: 80, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 35 })
}
