export const details = [{
  title: '破局矢伤害',
  params: { q: false, team: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')

},{
  title: '破局矢蒸发',
  params: { q: false, team: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2', '蒸发')

},{
  title: '萦络纵命索伤害',
  params: { q: false, team: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')

}, {
  title: '萦络纵命索蒸发',
  params: { q: false, team: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')

}, {

  title: 'Q协同单段伤害',
  params: { q: true, team: false },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
  }
}, {

  title: 'Q协同单段蒸发',
  params: { q: true, team: false },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q', '蒸发')
  }
}, {

  title: '渊图玲珑骰展开伤害',
  params: { q: true, team: false },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
  }
}, {
  check: ({ cons }) => cons < 6,
  dmgKey: 'q',
  title: '夜莫万EE双蒸7次连携',
  params: { q: true, team: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    return {
      dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
      avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  dmgKey: 'q',
  title: '夜莫万6命EaEaaaa双蒸',
  params: { q: true, team: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
    return {
      dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
      avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
    }
  }
}, {
  check: ({ cons }) => cons < 6 ,
  title: '胡行夜钟 21轴 对单',
  params: { q: false, team: false , hxyz: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    return {
      dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
      avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '胡行夜钟 21轴 对单',
  params: { q: false, team: false , hxyz: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
    return {
      dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
      avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
    }
  }
}]

export const defDmgIdx = 4
export const defDmgKey = 'q'
export const mainAttr = 'hp,cpct,cdmg'

export const defParams = {
  q: true,
  team: true
}


export const buffs = [{
  title: '夜兰天赋1：有4个不同元素类型角色时，夜兰生命值上限提高30%',
  data: {
    hpPct: 30
  }
}, {
  title: '夜兰4命：E络命丝爆发提高生命值，满Buff下提高40%',
  cons: 4,
  data: {
    hpPct: 40
  }
}, {
  title: '夜兰天赋2：Q持续过程中满层Buff下提高伤害50%',
  data: {
    dmg: ({ params }) => params.q ? 50 : 0
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16,
    dmg: 40,
    atkPct: 20,
    kx: 40
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16,
    dmg: 48,
    atkPct: 20,
    kx: 40,
    mastery: 200
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true),
  title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  data: {
    aDmg: 32,
    a2Dmg: 32,
    a3Dmg: 32,
    dmg: 48,
    atkPct: 40,
    kx: 40,
    mastery: 200
  }
}, {
  check: ({ cons, params }) => (cons >= 2 && params.team === true),
  title: '千夜教官满命莫娜：获得[dmg]%增伤,暴击[cpct]%,精通[mastery]',
  data: {
    dmg: 60,
    vaporize:15,
    cpct: 15,
    mastery: 168
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true),
  title: '千夜教官0命莫娜：获得[dmg]%增伤,精通[mastery]',
  data: {
    dmg: 60,
    mastery: 168
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
}, {
  check: ({ params }) => (params.team === false && params.hxyz === true),
  title: '胡行夜钟：生命值提升[hpPct]%,造成的伤害提升2.5%,水元素抗性降低35%',
  data: {
	hpPct: 25,
	eDmg: 2.5,	
	kx: 35 
  }
}, 'vaporize',
{title: '5.7最后修改：如有问题可联系1142607614反馈'}
]
