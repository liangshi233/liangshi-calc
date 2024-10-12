export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.cpct > 0) {
    if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
      return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
    }
    if (artis.is('dmg', 4) && attr.mastery < 80) {
      return rule('驻场-直伤', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 50 })
    }
    if (artis.is('dmg', 4) && attr.mastery > 80) {
      return rule('驻场-蒸发', { hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 50 })
    }
  }
  if ((weapon.name === '昭心' || weapon.name === '天空之卷') && attr.phy > 15) {
    return rule('驻场-物理', { atk: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 80) {
    return rule('驻场-直伤', { hp: 100, dmg: 100, recharge: 50 })
  }
  if (artis.is('dmg', 4) && attr.mastery > 80) {
    return rule('驻场-蒸发', { hp: 85, mastery: 75, dmg: 100, recharge: 50 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-绽放', { hp: 75, mastery: 100, dmg: 60, recharge: 80 })
  }
  if (attr.heal > 5) {
    return rule('生存-治疗', { hp: 100, dmg: 60, recharge: 80, heal: 100 })
  }
  return def({ hp: 100, dmg: 60, recharge: 85, heal: 100 })
}