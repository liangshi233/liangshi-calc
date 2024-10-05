export default function ({ attr, artis, rule, def }) {
  if (attr.cpct < 15 && attr.cdmg > 280) {
    return rule('胡桃-核爆', { hp: 90, atk: 50, cdmg: 100, mastery: 90, dmg: 100 })
  }

  if (artis.is('mastery', '3') || attr.mastery > 120) {
    return rule('胡桃-精通', { hp: 80, atk: 50, cpct: 100, cdmg: 100, mastery: 80, dmg: 100 })
  }

  return def({ hp: 80, atk: 50, cpct: 100, cdmg: 100, mastery: 75, dmg: 100 })
}
