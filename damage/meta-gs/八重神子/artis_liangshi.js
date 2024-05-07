export default function ({ artis, weapon, attr, rule, def, cons }) {
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('八重-治疗', { hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 40, recharge: 100, heal: 100 })
  }
  if (weapon.name === '昭心' && attr.phy > 10) {
    return rule('八重-物理', { atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10) {
    return rule('八重-物理', { atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (artis.is('乐园4')) {
    return rule('八重-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 75 })
  }
  if (artis.is('剧团4')) {
    return rule('八重-速切', { atk: 80, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
  }
  if (attr.mastery >= 540) {
    return rule('八重-超绽', { atk: 35, cpct: 85, cdmg: 85, dmg: 35, mastery: 100, recharge: 75 })
  }
  if (attr.mastery < 540 && attr.mastery >= 80) {
    return rule('八重-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 70, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 80 && attr.cpct * 2 + attr.cdmg > 200) {
    return rule('八重-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, mastery: 25, recharge: 55 })
  }
  return def({ atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 55 })
}
