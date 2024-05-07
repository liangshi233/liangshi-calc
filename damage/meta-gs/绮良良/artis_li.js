export default function ({ attr, artis, cons, weapon, rule, def }) {
  // 直伤
  if (artis.is('dmg', '4') || attr.dmg > 36) {
    return rule('绮良良-输出', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 35 })
  }

  // 物伤（不推荐）
  if (artis.is('phy', '4') || attr.phy > 24) {
    return rule('绮良良-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  // 待定（燃烧？）
  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    return rule('绮良良-蔓激化', { mastery: 100, recharge: 35 })
  }

  // 通用
  return def({ hp: 100, recharge: 35 })
}
