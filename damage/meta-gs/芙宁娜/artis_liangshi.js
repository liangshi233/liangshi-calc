export default function ({ attr, artis, weapon, rule, def }) {
  if (attr.phy > 45) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, recharge: 15, phy: 100 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('输出-绽放', { hp: 30, cpct: 60, cdmg: 60, mastery: 100, dmg: 35, recharge: 80 })
  }
  if (attr.heal > 15) {
    return rule('生存-治疗', { hp: 100, cpct: 40, cdmg: 40, dmg: 40, recharge: 80, heal: 100 })
  }
  if (artis.is('剧团4') && attr.mastery < 540 && attr.mastery >= 120) {
    return rule('输出-蒸发', { hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (artis.is('剧团4') && attr.mastery < 120) {
    return rule('输出-直伤', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 540 && attr.mastery >= 120) {
    return rule('驻场-蒸发', { hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { hp: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  return def({ hp: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
}
