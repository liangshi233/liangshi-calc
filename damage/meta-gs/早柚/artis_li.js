export default function ({ attr, artis, cons, weapon, rule, def }) {
  let heal = 0
  if (artis.is('heal', '5')) heal = 100

  // 精通收益
  let mastery = 35
  if (cons >= 6) mastery = 100

  // 纯辅
  let title = '早柚-通用'
  if (attr.cpct * 2 + attr.cdmg < 120) {
    if (artis.is('heal', '5')) { title = '早柚-纯奶' }

    if (artis.is('atk', '3,4,5')) { title = '早柚-攻击' }

    if (artis.is('mastery', '3,4,5')) { title = '早柚-精通' }

    return rule(title, { atk: 100, mastery, recharge: 100, heal })
  }

  // 输出（不推荐）
  if (attr.cpct * 2 + attr.cdmg > 280) {
    if (artis.is('dmg', '4')) {
      return rule('早柚-直伤', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 55, mastery: 55 })
    }

    if (artis.is('phy', '4')) {
      return rule('早柚-物伤', { atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge: 35 })
    }
  }

  // 通用（喵喵改进）
  return def({ atk: 100, cpct: 80, cdmg: 80, mastery, recharge: 100, heal })
}
