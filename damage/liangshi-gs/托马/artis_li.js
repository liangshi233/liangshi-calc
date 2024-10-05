export default function ({ attr, artis, cons, weapon, rule, def }) {
  let recharge = 100
  if (cons >= 4) recharge = 80

  if (attr.mastery > 720 || artis.is('mastery', '3,4,5')) {
    return rule('托马-烈绽放', { mastery: 100, recharge })
  }

  return def({ hp: 100, recharge })
}
