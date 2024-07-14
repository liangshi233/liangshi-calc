export default function ({ attr, weapon, rule, def }) {
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-烈绽', { hp: 55, cpct: 60, cdmg: 60, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.mastery < 180) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery > 180) {
    return rule('驻场-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
}
