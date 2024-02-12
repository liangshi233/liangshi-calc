export const details = [{
  params: { zai: false , team: false },
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  params: { zai: false , team: false },
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  params: { zai: false , team: false },
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  params: { zai: true , team: false },
  title: '再现 普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  params: { zai: true , team: false },
  title: '再现 战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  params: { zai: true , team: false },
  title: '再现 终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  params: { zai: true , team: true },
  title: '希银停罗 普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  params: { zai: true , team: true },
  title: '希银停罗 战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  params: { zai: true , team: true },
  title: '希银停罗 终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = 5

export const defParams = {
  team: true
}

export const buffs = [{
  title: '希儿天赋：击杀敌人增幅状态提高伤害[xq]%',
  data: {
   dmg: ({ params , talent }) => params.zai ?  talent.t['伤害提高'] * 100 : 0 ,
    xq: ({ talent }) => talent.t['伤害提高'] * 100
  }
},
{
  title: '希儿战技：释放战技后，速度提高25%',
  maxCons: 1,
  data: {
    speedPct: 25
  }
}, {
  title: '希儿1命：对生命小于80%的敌人造成伤害时，暴击率提高15%',
  cons: 1,
  data: {
    cpct: 15
  }
}, {
  title: '希儿2命：释放战技后，2层Buff速度提高50%',
  cons: 2,
  data: {
    speedPct: 50
  }
}, {
  title: '行迹-夜行：抗性穿透提高20',
  tree: 2,
  data: {
    kx: 20
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
},{title: '8.2最后修改：如有问题请输入 #伤害计算反馈'}
]
