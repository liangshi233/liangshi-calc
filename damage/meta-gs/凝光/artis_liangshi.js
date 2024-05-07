export default function ({ attr, weapon, rule, def }) {
  if (attr.mastery > 420) {
    return rule('凝光-盾辅', { atk: 75, cpct: 90, cdmg: 90, mastery: 100, dmg: 75, recharge: 100 })
  }
  if (weapon.name === '试作金珀' && attr.heal > 1) {
    return rule('凝光-治疗', { hp: 100, atk: 50, cpct: 50, cdmg: 50, dmg: 40, recharge: 100, heal: 100 })
  }
  if (weapon.name === '昭心' && attr.phy > 10) {
    return rule('凝光-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  if (weapon.name === '天空之卷' && attr.phy > 10) {
    return rule('凝光-物理', { hp: 0, atk: 75, cpct: 100, cdmg: 100, dmg: 0, phy: 100, recharge: 0, heal: 0 })
  }
  return def({ atk: 75, def: 0, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, phy: 0, recharge: 30, heal: 0 })
}
