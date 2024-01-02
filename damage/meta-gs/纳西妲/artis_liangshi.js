export default function ({ attr, weapon, artis, rule, def }) {
  if (attr.mastery <= 200 ) {
    return rule('纳西妲-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100 , recharge: 50})
  }
  if (attr.mastery > 200 && attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('纳西妲-输出', { atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 30})
  }
  if (weapon.name === '试作金珀' && attr.heal > 1 ) {
    return rule('纳西妲-治疗', { hp: 100, atk: 50, cpct: 50, cdmg: 30, dmg: 40, recharge: 100 , heal: 100 })
  }
  if (weapon.name === '昭心' && attr.phy > 10 ) {
    return rule('纳西妲-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10 ) {
    return rule('纳西妲-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100 , recharge: 0 , heal: 0 })
  }
  return def({ atk: 55, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, recharge: 55 })
}
