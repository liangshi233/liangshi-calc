export default function ({ attr, artis, rule, def, cons }) {
  if (artis.is('hp', '3,4,5') && attr.hp > 40000 && (attr.cpct * 2 + attr.cdmg < 150)) {
    // 对齐小生命
    return rule('钟离-血牛', { hp: 100, atk: 30, cpct: 35.9, cdmg: 35.9, recharge: 30 })
  }

  if (artis.is('dmg', '4') && artis.is('cpct,cdmg', '5') && cons >= 2) {
    // 平衡攻击、生命与充能
    return rule('钟离-武神', { hp: 75, atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge: 75 })
  }

  if (attr.phy > 29 && artis.is('cpct,cdmg', '5')) {
    // Bug:这里不能采用artis.is('phy','4')来判断
    return rule('钟离-物理', { hp: 50, atk: 75, cpct: 100, cdmg: 100, phy: 100 })
  }

  // 盾辅通用
  return def({ hp: 100, atk: 75, cpct: 100, cdmg: 100, dmg: 80, phy: 80, recharge: 40 })
}
