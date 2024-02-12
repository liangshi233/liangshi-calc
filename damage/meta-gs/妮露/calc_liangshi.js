// 纳西妲、妮露、艾尔海森、心海
const team2 = createTeam('海妮心妲', ['纳西妲', '艾尔海森', '心海'])

export const details = [{
  title: '水月伤害',
  params: { sy: true , team: false },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e')
}, {
  title: '水月蒸发伤害',
  params: { sy: true , team: false },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e', 'vaporize')
}, {
  title: '剑舞步三段伤害',
  params: { team: false },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let pct = talent.e['剑舞步/旋舞步一段伤害2'][0] * 1 + talent.e['剑舞步/旋舞步二段伤害2'][0] * 1
    let ret1 = basic(calc(attr.hp) * pct / 100, 'e')
    if (cons >= 1) {
      attr.e.dmg += 65
    }
    let ret2 = basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e')
    return {
      dmg: ret1.dmg + ret2.dmg,
      avg: ret2.avg + ret2.avg
    }
  }
}, {
  title: 'Q两段总伤害',
   params: { team: false },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害'] + talent.q['永世流沔伤害']) / 100, 'q')
}, {
  title: '远梦聆泉首段蒸发伤害',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害']) / 100, 'q', 'vaporize')
}, {
  title: '丰穰之核伤害',
  params: { bloom: true , team: false },
  dmg: ({calc, attr}, { reaction }) => {
      return reaction('bloom')}
}, {
  title: '妮纳科心 丰穰之核',
  params: { bloom: true , team: true },
  dmg: ({calc, attr}, { reaction }) => {
      return reaction('bloom')}
}, {
   title: '海妮心妲²·丰穰之核',
   params: {team: true, bloom: true, ...team2.params},
   dmg: ({}, {reaction}) => {
     // 草神二命固定暴击率20%、暴击伤害100%
     const cpctNum = 20 / 100, cdmgNum = 100 / 100
     // 计算丰穰之核非暴击伤害
     const {avg} = reaction('bloom')
     return {
       // 暴击伤害
       dmg: avg * (1 + cdmgNum),
       // 平均伤害
       avg: avg * (1 + cpctNum * cdmgNum)
     }
   }
}]

export const defDmgIdx = 5
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const defParams = {
    team: true
}

export const buffs = [{
  title: '妮露天赋：丰穰之核增伤[bloom]%,元素精通提升100点',
  data: {
    bloom: ({ calc, attr }) => Math.min(400,(calc(attr.hp)-30000)/1000*9),
    mastery:({ params }) => params.bloom ? 100 : 0
  }
},{
  title: '妮露1命：水月造成的伤害提升65%',
  cons: 1,
  data: {
    eDmg: ({ params }) => params.sy ? 65 : 0
  }
}, {
  title: '妮露2命：金杯的丰馈下降低敌人35%水抗与草抗',
  cons: 2,
  data: {
    kx: 35
  }
}, {
  title: '妮露4命：第三段舞步命中敌人Q伤害提高50%',
  cons: 4,
  data: {
    qDmg: 50
  }
}, {
  title: '妮露6命：提高暴击[cpct]%，爆伤[cdmg]%',
  cons: 6,
  data: {
    cpct: ({ calc, attr }) => Math.min(30, calc(attr.hp) / 1000 * 0.6),
    cdmg: ({ calc, attr }) => Math.min(60, calc(attr.hp) / 1000 * 1.2)
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '精5千夜4命4深林纳西妲：增加精通[mastery]，降低[kx]%草元素抗性',
  data: {
    mastery: 418,
	kx: 30
  }
}, {
  check: ({ cons, params }) => ((cons < 4 &&cons >= 2) && params.team === true),
  title: '精1千夜2命4深林纳西妲：增加精通[mastery]，降低[kx]%草元素抗性',
  data: {
    mastery: 290,
	kx: 30
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true),
  title: '精1千夜0命4深林纳西妲：增加精通[mastery]，降低[kx]%草元素抗性',
  data: {
    mastery: 290,
	kx: 30
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true && team2.not(params)),
  title: '教官精5终末柯莱：元素精通提升[mastery]攻击力提升[atkPct]%',
  data: {
    mastery: 480,
    atkPct: 40
  }
}, {
  check: ({ cons, params }) => (cons < 6 && params.team === true && team2.not(params)),
  title: '教官精1终末柯莱：元素精通提升[mastery]攻击力提升[atkPct]%',
  data: {
    mastery: 280,
    atkPct: 20
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true),
  title: '千岩精5千夜珊瑚宫心海：元素精通提升[mastery]攻击力提升[atkPct]%',
  data: {
    mastery: 48,
    atkPct: 40
  }
}, {
  check: ({ cons, params }) => (cons < 6 && params.team === true),
  title: '千岩精1千夜珊瑚宫心海：元素精通提升[mastery]攻击力提升[atkPct]%',
  data: {
    mastery: 40,
    atkPct: 20
  }
},{
  check: ({ params }) => team2.is(params),
  title: '纳西妲2命：提供绽放反应固定20%暴击率和100%的暴击伤害',
  data: {}
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 蔓生之草(燃烧/普通绽放队)：触发燃烧或绽放反应后，提升元素精通[mastery]点',
  data: {
    mastery: 80
  }
},
 {title: '6.12最后修改：如有问题请输入 #伤害计算反馈'}
]

/**
 * 创建队伍
 * @param name 队伍名
 * @param members 队员
 * @return {{name, members, params, go, is, not}}
 */
function createTeam(name, members) {
  const team = {name, members}
  // 队伍出战
  team.go = () => {
    const params = {}
    team.members.forEach(k => params[name + '_' + k] = true);
    return params
  }
  team.params = team.go()
  // 是否是当前配队
  team.is = (params) => members.filter(k => params[name + '_' + k] === true).length === members.length
  // 是否不是当前配队
  team.not = (params) => !team.is(params)
  return team
}
