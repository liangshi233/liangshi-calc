export default function ({ attr, artis, cons, weapon, rule, def }) {
  // 外观专武
  if (weapon.name == '猎人之径') {
    return rule('柯莱-重击', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 75, recharge: 55 })
  }

  // 物伤（不推荐）
  if (artis.is('phy', '4') || attr.phy > 24) {
    return rule('柯莱-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  // 超绽放
  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    return rule('柯莱-超绽放', { mastery: 100, recharge: 90 })
  }

  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 55, recharge: 75 })
}
