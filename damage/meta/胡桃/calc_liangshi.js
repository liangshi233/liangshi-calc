export const details = [{
  title: '半血开E普攻一段',
  params: {team: false , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a')
},{
  title: '半血开E重击',
  params: {team: false , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '半血开E普攻一段蒸发',
  params: {team: false , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
}, {
  title: '半血开E重击蒸发',
  params: {team: false , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}, {
  title: '血梅香伤害',
  params: {team: false , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e')
}, {
  title: '半血开E后Q',
  params: {team: false , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q')
}, {
  title: '胡行夜钟 重击蒸发',
  params: {team: true , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}, {
  title: '胡行夜钟 Q蒸发',
  params: {team: true , hb: false},
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
}, {
  title: '深渊7-2 Q融化核爆',
  params: {team: false , hb: true},
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q', 'melt')
}, {
  title: '胡行夜钟 21轴 对单',
  params: { team: true , hb: false },
  dmg: ({ talent }, dmg) => {
    let pg = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let zj = dmg(talent.a['重击伤害'], 'a2', 'vaporize')
    let xmx = dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
    let q = dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
    return {
      dmg: 10 * pg.dmg +  9 * zj.dmg  +  5 * xmx.dmg  + 1 * q.dmg,
      avg: 10 * pg.avg +  9 * zj.avg  +  5 * xmx.avg  + 1 * q.avg
    }
  }
}]

export const defDmgIdx = 3
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const defParams = {
  team: true,
  hb: true
}


export const buffs = [{
  title: '蝶引来生：开E获得[atkPlus]点攻击力加成',
  data: {
    atkPlus: ({ talent, attr, calc }) => {
      return Math.min(talent.e['攻击力提高'] * calc(attr.hp) / 100, attr.atk.base * 4)
    }
  }
}, {
  title: '胡桃天赋2：半血获得33%火伤加成',
  data: {
    dmg: 33
  }
}, {
    title: '胡桃2命：血梅香造成的伤害提高[ePlus]',
    data: {
      ePlus: ({ attr, calc }) => calc(attr.hp) * 0.1
    }
  }, {
  check: ({ cons, params }) => cons <= 3 && params.team === true,
  title: '0命夜兰：获得[dmg]%增伤',
  data: {
    dmg: 35
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '4命夜兰：获得[dmg]%增伤,增加40%生命值',
  data: {
    dmg: 50,
	hpPct: 25
  }
}, {
  check: ({ params }) => params.team === true,
  title: '钟离：降低敌人20%抗性',
  data: {
    kx: 20
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
}, {
  check: ({ params }) => (params.team === false && params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 120,
    dmg: 100,
    mastery: 370,
    kx: 40,
    atkPct: 93,
    atkPlus: 1202.35
  }
}
, 'vaporize',
{title: '2.7最后修改：如有问题可联系1142607614反馈'}
]
