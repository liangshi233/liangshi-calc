export default function ({ attr, rule, def }) {
  // 速射流（优先判定）
  if (attr.phy > 24) {
    return rule('安柏-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  // 重击流
  if (attr.cpct < 15 || attr.cdmg / attr.cpct > 10) {
    return rule('安柏-核爆', { atk: 75, cdmg: 100, dmg: 100, mastery: 75 })
  }

  // 通用
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, mastery: 75 })
}
