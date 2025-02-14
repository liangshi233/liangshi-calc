export default function ({ artis, attr, weapon, rule, def }) {
  if (attr.phy > 52) {
    return rule('驻场-物理', { atk: 85, cpct: 100, cdmg: 100, phy: 100, recharge: 15 })
  }
  if (artis.is('乐园4') || attr.mastery >= 540) {
    return rule('驻场-超绽', { atk: 30, cpct: 60, cdmg: 60, dmg: 60, mastery: 100, recharge: 80 })
  }
  if (artis.is('剧团4') && attr.mastery >= 120) {
    return rule('输出-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (artis.is('剧团4') && attr.mastery < 120) {
    return rule('输出-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  if (attr.mastery >= 120) {
    return rule('驻场-激绽', { atk: 75, cpct: 100, cdmg: 100, mastery: 50, dmg: 100, recharge: 45 })
  }
  if (attr.mastery < 120) {
    return rule('驻场-直伤', { atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
  }
  return def({ atk: 85, cpct: 100, cdmg: 100, dmg: 100, recharge: 45 })
}
