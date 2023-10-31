export const details = [{
  title: '霜华矢总伤害',
  params: {
    team: false,
    alter: false,
    q: 0
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['霜华矢·霜华绽发伤害'] + talent.a['霜华矢命中伤害'], 'a2')
}, {
  title: '霜华矢融化',
  params: {
    team: false,
    alter: false,
    q: 0
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['霜华矢·霜华绽发伤害'] + talent.a['霜华矢命中伤害'], 'a2', 'melt')
}, {
  title: '山泽麟迹伤害',
  params: {
    team: false,
    alter: false,
    q: 0
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: '甘鹤万班蓄力融化',
  params: {
    team: true,
    alter: true,
    q: 0
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['霜华矢·霜华绽发伤害'] + talent.a['霜华矢命中伤害'], 'a2', 'melt')
}, {
  title: '甘纳万班蓄力融化',
  params: {
    team: true,
    alter: false,
    q: 0
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['霜华矢·霜华绽发伤害'] + talent.a['霜华矢命中伤害'], 'a2', 'melt')
}, {
  title: '降众天华冰凌伤害',
  params: {
    team: false,
    alter: false,
    q: 1
  },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰棱伤害'], 'q')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
  q: 1,
  team: true,
  alter: true
}

export const buffs = [{
  cons: 0,
  title: '甘雨天赋1：霜华矢发射后的5秒内霜华矢暴击率提高20%',
  data: {
    a2Cpct: 20
  }
}, {
  cons: 1,
  title: '甘雨1命：霜华矢命中减少敌人15%冰抗',
  data: {
    kx: ({ params }) => params.q ? 0 : 15
  }
}, {
  cons: 4,
  title: '甘雨4命：大招领域内敌人受到的伤害提升25%',
  data: {
    dmg: ({ params }) => params.q ? 25 : 0
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
  check: ({ cons, params }) => (cons >= 6 && params.team === true && params.alter === true),
  title: '精5息灾申鹤：获得[dmg]%增伤,减抗[kx]%,爆伤15%,提升冰伤害5700',
  sort: 9,
  data: {
    dmg: 30,
    kx: 15,
    cdmg: 15,
    a2Plus: 5700 * 2,
    ePlus: 5700,
    qPlus: 5700
  }
}, {
  check: ({ cons, params }) => (cons < 6 && params.team === true && params.alter === true),
  title: '精1息灾申鹤：获得[dmg]%增伤,减抗[kx]%,提升冰伤害4300',
  sort: 9,
  data: {
    dmg: 30,
    kx: 15,
    a2Plus: 4300 * 2,
    ePlus: 4300,
    qPlus: 4300
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true && params.alter === false),
  title: '精5千夜4命4深林纳西妲：增加精通[mastery]',
  data: {
    mastery: 418
  }
}, {
  check: ({ cons, params }) => ((cons < 4 &&cons >= 2) && params.team === true && params.alter === false),
  title: '精1千夜2命4深林纳西妲：增加精通[mastery]',
  data: {
    mastery: 290
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true && params.alter === false),
  title: '精1千夜0命4深林纳西妲：增加精通[mastery]',
  data: {
    mastery: 290
  }
}, {
  check: ({ params }) => params.team === true,
  title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 20,
    atkPlus: 1202.35
  }
}, 'melt',
 {title: '2.11最后修改：如有问题可联系1142607614反馈'}
 ]