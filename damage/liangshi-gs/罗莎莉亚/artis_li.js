export default function ({ attr, artis, cons, rule, def }) {
  // 充能判定
  let recharge = 55

  if (artis.is('dmg', '4') && artis.is('recharge', '3')) {
    recharge = 75
  }

  if (artis.is('phy', '4') && cons < 6) {
    recharge = 35
  }

  // 物伤流
  if (artis.is('phy', '4')) {
    return rule('罗莎莉亚-物理', { atk: 75, cpct: 100, cdmg: 100, phy: 100, recharge })
  }

  // 融化流
  if (artis.is('mastery', '3') || attr.mastery > 120) {
    return rule('罗莎莉亚-融化', { atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge, mastery: 75 })
  }

  // 通用（冰伤流）
  return def({ atk: 75, cpct: 100, cdmg: 100, dmg: 100, recharge, mastery: 35 })
}
