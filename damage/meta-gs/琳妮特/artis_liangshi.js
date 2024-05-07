export default function ({ attr, artis, rule, def }) {
  if (attr.phy >= 41.4) {
    return rule('琳妮特-物理', { atk: 85, cpct: 100, cdmg: 100, mastery: 0, dmg: 0, recharge: 30, phy: 100 })
  }
  if (artis.is('乐园4')) {
    return rule('琳妮特-绽放', { atk: 35, cpct: 75, cdmg: 75, dmg: 35, mastery: 100, recharge: 100 })
  }
  if (attr.mastery >= 540) {
    return rule('琳妮特-绽放', { atk: 35, cpct: 75, cdmg: 75, dmg: 35, mastery: 100, recharge: 100 })
  }
  if (attr.cpct * 2 + attr.cdmg >= 180 && artis.is('dmg', 4)) {
    return rule('琳妮特-输出', { hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 75, dmg: 100, recharge: 30 })
  }
  if (attr.phy < 1) {
    return rule('琳妮特-辅助', { atk: 75, cpct: 100, cdmg: 100, mastery: 0, dmg: 100, recharge: 75 })
  }
  return def({ hp: 0, atk: 75, cpct: 100, cdmg: 100, mastery: 100, dmg: 100, phy: 0, recharge: 55 })
}
