let tmpDmg = false

export const details = [{
  title: '普攻首段伤害',
  params: { e: false , team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '普攻尾段2次伤害',
  params: { e: false , team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
}, {
  title: 'E0层长按伤害',
  params: { gj: false , team: false , hb: false },
  dmg: ({ talent }, dmg) => {
    tmpDmg = dmg(talent.e['长按伤害'], 'e')
    return tmpDmg
  }
}, {
  title: 'E2层长按伤害',
  params: { gj: true , team: false , hb: false },
  dmg: ({ talent }, dmg) => {
    let e = tmpDmg
    let g = dmg(talent.e['冰涡之剑伤害'], 'e')
    let j = dmg(talent.q['光降之剑基础伤害'], 'e', 'phy')
    return {
      dmg: e.dmg * 1 + g.dmg * 2 + j.dmg * 0.5,
      avg: e.avg * 1 + g.avg * 2 + j.avg * 0.5
    }
  }
}, ({ cons, weapon }) => {
  let buffCount = 12
  if (weapon.name === '松籁响起之时') {
    buffCount = 13
    if (weapon.affix_level >= 4) {
      buffCount = 14
    }
  }
  if (cons === 6) {
    buffCount = buffCount + 11
  }
  return {
    title: `光降之剑${buffCount}层伤害`,
    params: { gj: true , team: false , hb: false },
    dmg: ({ talent }, dmg) => dmg(talent.q['光降之剑基础伤害'] + talent.q['每层能量伤害'] * buffCount, 'q', 'phy')
  }
}, ({ cons, weapon }) => {
  let buffCount = 12
  if (weapon.name === '松籁响起之时') {
    buffCount = 13
    if (weapon.affix_level >= 4) {
      buffCount = 14
    }
  }
  if (cons === 6) {
    buffCount = buffCount + 11
  }
  return {
    title: `优丽辛班 光剑${buffCount}层伤害`,
    params: { gj: true , team: true , hb: false },
    dmg: ({ talent }, dmg) => dmg(talent.q['光降之剑基础伤害'] + talent.q['每层能量伤害'] * buffCount, 'q', 'phy')
  }
}, ({ cons, weapon }) => {
  let buffCount = 12
  if (weapon.name === '松籁响起之时') {
    buffCount = 13
    if (weapon.affix_level >= 4) {
      buffCount = 14
    }
  }
  if (cons === 6) {
    buffCount = buffCount + 11
  }
  return {
	  title: `深渊12-3 光剑${buffCount}层`,
    params: { gj: true , team: true , hb: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['光降之剑基础伤害'] + talent.q['每层能量伤害'] * buffCount, 'q', 'phy')
  }
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg'
export const enemyName = '魔偶/女士/雷神'

export const defParams = {
  team: true,
	hb: true 
}

export const buffs = [{
  title: '优菈天赋：E消耗冰涡之剑后降低抗性[kx]%',
  check: ({ params }) => params.gj !== false,
  data: {
    kx: ({ talent }) => talent.e['冰元素抗性降低']
  }
}, {
  title: '优菈1命：消耗冷酷之心后物理伤害提高30%',
  cons: 1,
  data: {
    phy: ({ params }) => params.gj ? 30 : 0
  }
}, {
  title: '优菈4命：对生命值低于50%的敌人，光降之剑造成的伤害提高25%',
  cons: 4,
  data: {
    qDmg: 25
  }
}, {
  title: '优菈6命：光降之剑额外获得5层Buff，普攻/E有50%概率额外获得1层',
  cons: 6
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
  title: '元素共鸣 热诚之火：攻击力提高[dmg]%',
  data: {
    dmg: 25
  }
}, {
  check: ({ params }) => params.team === true,
  title: '超导：降低敌人25%物理抗性',
  sort: 9,
  data: {
    phyKx: 25
  }
}, {
  check: ({ params }) => (params.team === true && params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 120,
    dmg: 45,
    defPct: -25,
    atkPct: 40
  }
},
 {title: '2.28最后修改：如有问题可联系1142607614反馈'}
]
