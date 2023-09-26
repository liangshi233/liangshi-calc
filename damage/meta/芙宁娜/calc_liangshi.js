export const details = [{
  check: ({ cons }) => cons >= 2,
  title: '普通攻击一段',
  dmg: ({ talent }, dmg) => dmg(talent.a['普通攻击伤害'], 'a')
}, {
  title: '溪流歌手治疗',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['溪流歌手治疗量2'][0] * calc(attr.hp) / 100 + talent.e['溪流歌手治疗量2'][1] * 1)
}, {
  title: '海薇玛夫人伤害',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100, 'e')
},{
  title: '海薇玛夫人蒸发',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100, 'e', '蒸发')
}, {
  title: '谢蕾贝妲小姐伤害',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢蕾贝妲小姐伤害'] / 100, 'e')
},{
  title: '谢蕾贝妲小姐蒸发',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢蕾贝妲小姐伤害'] / 100, 'e', '蒸发')
}, {
  title: '乌瑟勋爵伤害',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100, 'e')
},{
  title: '乌瑟勋爵蒸发',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100, 'e', '蒸发')
}, {
  title: '舞台展开伤害',
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
  }
}, {
  title: 'Q展开蒸发伤害',
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q', '蒸发')
  }
}, {
  title: '天赋生命恢复',
  dmg: ({ calc, attr, talent }, { heal }) => heal(calc(attr.hp) * 0.02)
}]


export const mainAttr = 'hp,cpct,cdmg'

export const buffs = [{
  title: '芙宁娜天赋：消耗队友生命值提升E[dmg]%伤',
  data: {
    eMulti: 40
  }
}, {
  title: '芙宁娜天赋：450层提升[dmg]%伤害与[heal]%治疗加成',
  data: {
    dmg: ({ talent }) => talent.q['伤害提高'] * 450 ,
    heal: ({ talent }) => talent.q['治疗加成提高'] * 450
  }
}, {
  title: '芙宁娜天赋2：基于生命值提升召唤物提升[eDmg]%伤害',
  data: {
    eDmg: ({ calc, attr }) => Math.min( 28 , ( calc(attr.hp) ) / 1000 * 0.7 )
  }
}, {
  title: '芙宁娜1命：层数上限提升150层',
  data: {
    dmg: ({ talent }) => talent.q['伤害提高'] * 150 ,
    heal: ({ talent }) => talent.q['治疗加成提高'] * 150
  }
}, {
  title: '芙宁娜2命：基于生命值的15%伤害值提升[aPct]点',
  data: {
    aPct: ({ calc, attr }) => calc(attr.hp) * 0.15,
    a2Pct: ({ calc, attr }) => calc(attr.hp) * 0.15
  }
}, {
  title: '芙宁娜6命：每层提升芙宁娜0.4%生命值上限，共提升[hpPct]%',
  data: {
    hpPct: ({ calc, attr }) =>  Math.min( 140 , ( calc(attr.hp) * 0.004 * 600 ) )
  }
}, 'vaporize',
{title: '9.26最后修改：如有问题可联系1142607614反馈'}
]
