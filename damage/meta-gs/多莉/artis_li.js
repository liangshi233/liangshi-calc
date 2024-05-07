export default function ({ attr, artis, cons, weapon, rule, def }) {
  let recharge = 100

  if (cons >= 4) recharge = 90

  // 物伤（不推荐）
  if (artis.is('phy', '4') || attr.phy > 24) {
    return rule('多莉-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  // 超激化
  if (artis.is('dmg', '4') || attr.dmg > 36) {
    return rule('多莉-超激化', { atk: 35, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 100 })
  }

  // 超绽放
  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    return rule('多莉-超绽放', { mastery: 100, recharge })
  }

  // 通用（奶辅）
  return def({ hp: 100, recharge, heal: 100 })
}
