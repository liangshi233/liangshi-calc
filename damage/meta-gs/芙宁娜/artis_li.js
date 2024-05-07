export default function ({ attr, artis, cons, rule, def }) {
  // 充能与生命
  let hp = 80
  let recharge = 80

  if (cons >= 2) hp = 75

  if (cons >= 4) recharge = 75

  let title = '芙宁娜-通用'

  if (artis.is('猎人4')) {
    title = '芙宁娜-战场'
    recharge = 55
  }

  // 水伤与治疗

  let dmg = 100

  let heal = 0

  if (artis.is('hp', '4')) {
    dmg = 75
    if (artis.is('hp', '5')) {
      title = '芙宁娜-生命'
      hp = 100
    }
    if (artis.is('heal', '5')) {
      title = '芙宁娜-治疗'
      heal = 100
    }
  }

  return rule(title, { hp, cpct: 100, cdmg: 100, dmg, recharge, mastery: 35, heal })
}
