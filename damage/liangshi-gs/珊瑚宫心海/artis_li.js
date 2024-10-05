export default function ({ artis, rule, def }) {
  if (artis.is('hp', '3,4,5')) {
    return rule('心海-生命', { hp: 100, atk: 45.66, recharge: 45.66 })
  }

  if (artis.is('hp', '3,4') && artis.is('heal', '5')) {
    return rule('心海-纯奶', { hp: 100, atk: 45.66, recharge: 45.66, heal: 100 })
  }

  return def({ hp: 100, atk: 45.66, dmg: 100, recharge: 45.66, heal: 100 })

  // 45.66是为了对齐大攻击与小生命（其余词条权重不能超过于此）
}
