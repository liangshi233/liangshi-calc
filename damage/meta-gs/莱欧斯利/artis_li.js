export default function ({ attr, artis, rule, def }) {
  let atk = 75

  let mastery = 55

  let title = '莱欧斯利-通用'

  if (artis.is('mastery', '3')) {
    title = '莱欧斯利-精通'
    mastery = 75
  }

  if (artis.is('mastery', '4,5')) {
    title = '莱欧斯利-精通'
    mastery = 80
  }

  if (artis.is('atk', '4,5')) {
    title = '莱欧斯利-攻击'
    atk = 80
  }

  if (atk == 80 || mastery == 80) {
    return rule(title, { atk: 80, cpct: 80, cdmg: 80, recharge: 35, mastery: 80 })
  }

  return rule(title, { atk, cpct: 100, cdmg: 100, dmg: 100, recharge: 35, mastery })
}
