export const details = [{
  title: '魔王武装状态重击',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.e['重击伤害'], 'a2')
}, {
  title: '万达开E后重击',
  params: { team: true , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.e['重击伤害'], 'a2')
}, {
  title: '魔弹一闪伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·远程'], 'q')
}, {
  title: '尽灭水光伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·近战'], 'q')
}, {
  title: '万达开E后Q蒸发',
  params: { team: true , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·近战'], 'q', 'vaporize')
}, {
  title: '断流·闪 伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['断流·闪 伤害'], 'a')
}, {
  title: '断流·斩 伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.e['断流·斩 伤害'], 'e')
}, {
  title: '断流·爆 伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['断流·爆 伤害'], 'q')
}, {
  title: '断流·破 伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['断流·破 伤害'], 'a')
}, {
  title: '深渊7-3 Q蒸发核爆',
  params: { team: false , hb: true},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害·近战'], 'q', 'vaporize')
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
  team: true,
  hb: true
}

export const buffs = [{
  check: ({ params }) => params.team === true,
  title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 20,
    atkPlus: 1202.35
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
  sort: 9,
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
  sort: 9,
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
  sort: 9,
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
  check: ({ params }) => params.team === true,
  title: '元素共鸣 热诚之火：攻击力提高[dmg]%',
  data: {
    dmg: 25
  }
}, {
  check: ({ params }) => (params.team === false && params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 120,
    dmg: 115,
    mastery: 370,
    kx: 40,
    defPct: -15,
    hpPct: 25,
    atkPct: 128,
    atkPlus: 1202.35
  }
}, 'vaporize',
{title: '2.28最后修改：如有问题可联系1142607614反馈'}
]
