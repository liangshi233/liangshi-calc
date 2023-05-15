export const details = [{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '寒病鬼差每跳治疗',
  params: { team: false },
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1)
},{
  title: '寒病鬼差每跳伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: 'E每跳融化伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
}, {
  title: '度厄真符每次治疗',
  params: { team: false },
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1)
},{
  title: '救苦度厄伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q')
},{
  title: '救苦度厄融化伤害',
  params: { team: false },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
  title: '七丽辛班 普攻五伤害',
  params: { team: true },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
}, {
  title: '七丽辛班 重击伤害',
  params: { team: true },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'
export const enemyName = '魔偶/女士/雷神'

export const defParams = {
  team: true
}

export const buffs = [{
  title: '七七天赋1：触发元素反应，受到的治疗提高20%',
  isStatic: true,
  data: {
    heal: 20
  }
},{
  title: '七七二命：对受冰元素影响的敌人普攻及重击伤害提升15%',
  cons: 2,
  data: {
    a2: 15
  }
}, {
  check: ({ params }) => params.team === true,
  title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 20,
    atkPlus: 1202.35
  }
}, {
  check: ({ params }) => params.team === true,
  title: '讨龙丽莎：增加[atkPct]%攻击力降低敌人15%防御力',
  sort: 9,
  data: {
    atkPct: 48,
    enemyDef: 15
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '千岩辛焱：增加[atkPct]%攻击力降低敌人15%物理抗性提升15%物理伤害',
  sort: 9,
  data: {
    atkPct: 20,
    phyKx: 15,
	phy: 15
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '狼末千岩辛焱：增加[atkPct]%攻击力降低敌人15%物理抗性提升15%物理伤害',
  sort: 9,
  data: {
    atkPct: 60,
    phyKx: 15,
	phy: 15
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true),
  title: '精5狼末千岩辛焱：增加[atkPct]%攻击力降低敌人15%物理抗性提升15%物理伤害',
  sort: 9,
  data: {
    atkPct: 100,
    phyKx: 15,
	phy: 15
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 热诚之火：攻击力提高[atkPct]%',
  data: {
    atkPct: 25
  }
}, {
  check: ({ params }) => params.team === true,
  title: '超导：降低敌人25%物理抗性',
  sort: 9,
  data: {
    phyKx: 25
  }
},
 {title: '5.16最后修改：如有问题可联系1142607614反馈'}
]
