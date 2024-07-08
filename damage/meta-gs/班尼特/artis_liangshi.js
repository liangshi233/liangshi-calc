export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (attr.mastery >= 540) {
    return rule('驻场-烈绽', { atk: 30, cpct: 60, cdmg: 60, mastery: 100, dmg: 35, recharge: 80 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 160) {
    return rule('驻场-直伤', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 45, heal: 35 })
  }
  if (artis.is('dmg', 4) && artis.is('mastery', 3)) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 45 })
  }
  if (artis.is('dmg', 4) && attr.mastery >= 160 && attr.mastery < 540) {
    return rule('驻场-蒸发', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (attr.heal > 5) {
    return rule('生存-治疗', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 45, heal: 100 })
}
