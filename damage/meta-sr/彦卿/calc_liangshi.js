export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: 'Q后普攻伤害',
  params: { zhu: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: 'Q后战技伤害',
  params: { zhu: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '彦银停罗 普攻伤害',
  params: { zhu: true , team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '彦银停罗 战技伤害',
  params: { zhu: true , team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '彦银停罗 终结技',
  params: { zhu: true , team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 2

export const defParams = {
  team: true
}

export const buffs = [{
  title: '彦卿天赋：智剑连心提高[cpct]%暴击率和[cdmg]%爆伤',
  data: {
    cpct: ({ talent }) => talent.t['暴击率提高'] * 100,
    cdmg: ({ talent }) => talent.t['爆伤提高'] * 100
  }
}, {
  title: '快雨燕相逐：释放终结技提高60%暴击率，智剑连心提高爆伤[qCdmg]%',
  data: {
    qCpct: 60,
    qCdmg: ({ talent }) => talent.q['暴伤提高'] * 100
  }
}, {
  title: '快雨燕相逐：释放终结技本回合提高暴击率暴击伤害',
  data: {
    cpct: ({ params , talent }) => params.zhu ? 60 : 0,
    cdmg: ({ params , talent }) => params.zhu ? (talent.q['暴伤提高'] * 100) : 0
  }
}, {
  title: '彦卿4命：生命值大于80%时提高12%的冰抗穿透',
  cons: 4,
  data: {
    kx: 12
  }
}, {
  title: '行迹-轻吕：触发暴击时，速度提高10%',
  tree: 3,
  data: {
    speedPct: 10
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '停云 祥音和韵：攻击力提升[atk]%',
  data: {
    atk: 25
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '停云 云光覆仪祷：造成的伤害提升[dmg]%',
  data: {
    dmg: 50
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '停云光锥 镂月裁云之意⁵：暴击伤害提升[cdmg]%',
  data: {
    cdmg: 24
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '银狼 是否允许更改？：敌人元素抗性降低[kx]%',
  data: {
    kx: 10
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '银狼 |账号已封禁|：敌人防御力降低[enemyDef]%',
  data: {
    enemyDef: 43
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '银狼 等待程序相应...：敌人防御力降低[enemyDef]%',
  data: {
    enemyDef: 8
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '银狼 行迹-旁注：抗性额外降低[kx]%',
  data: {
    kx: 3
  }
}, {
  check: ({ cons, params }) => ((cons == 6) && params.team === true),
  title: '银狼光锥 雨一直下⁵：敌人受到的伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '银狼光锥 雨一直下³：敌人受到的伤害提升[dmg]%',
  data: {
    dmg: 16
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '银狼光锥 雨一直下¹：敌人受到的伤害提升[dmg]%',
  data: {
    dmg: 12
  }
}, {
  check: ({ cons, params }) => ((cons == 6) && params.team === true),
  title: '罗刹光锥 棺的回响⁵：速度提高[speedPct]%',
  data: {
    speedPct: 20
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '罗刹光锥 棺的回响³：速度提高[speedPct]%',
  data: {
    speedPct: 16
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '罗刹光锥 棺的回响¹：速度提高[speedPct]%',
  data: {
    speedPct: 12
  }
},
{title: '6.20最后修改：如有问题请输入 #伤害计算反馈'}
]
