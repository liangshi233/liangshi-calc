export default function ({ attr, artis, rule, def, weapon }) {
  if (weapon.name === '昭心' && attr.phy > 10) {
    return rule('夏洛蒂-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10) {
    return rule('夏洛蒂-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (artis.is('冰套4')) {
    return rule('夏洛蒂-冰风4', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55 })
  }
  if (attr.mastery < 120 && attr.cpct * 2 + attr.cdmg > 150) {
    return rule('夏洛蒂-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 30 })
  }
  if (attr.mastery > 120) {
    return rule('夏洛蒂-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 55 })
  }
  if (attr.heal > 5) {
    return rule('夏洛蒂-治疗', { atk: 100, cpct: 35, cdmg: 35, mastery: 0, recharge: 85, dmg: 35, heal: 100 })
  }
  return def({ atk: 100, cpct: 35, cdmg: 35, recharge: 85, dmg: 35, heal: 100 })
}
