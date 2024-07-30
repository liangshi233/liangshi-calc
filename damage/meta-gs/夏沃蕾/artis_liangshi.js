export default function ({ attr, artis, rule, def }) {
  if (attr.phy > 44) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('dmg', 4) && artis.is('mastery', 3) && attr.mastery < 540) {
    return rule('驻场-融化', { atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 35 })
  }
  if (artis.is('dmg', 4) && attr.mastery < 540) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (artis.is('hp', 5)) {
    return rule('辅助-增伤', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 60 })
  }
  if (attr.heal > 15) {
    return rule('生存-治疗', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
  }
  if (attr.mastery >= 540) {
    return rule('驻场-超载', { atk: 50, cpct: 60, cdmg: 60, mastery: 100, dmg: 50, recharge: 80 })
  }
  return def({ hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
}