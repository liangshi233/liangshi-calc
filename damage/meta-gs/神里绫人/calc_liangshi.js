export const details = [{
  title: '神里流·镜花伤害',
  params: {
    q: 0,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['水影伤害'], 'e')
}, {
  title: '瞬水剑一段伤害',
  params: {
    q: 0,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['一段瞬水剑伤害'], 'a')
}, {
  title: '瞬水剑二段伤害',
  params: {
    q: 0,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['二段瞬水剑伤害'], 'a')
}, {
  title: '瞬水剑三段伤害',
  params: {
    q: 0,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段瞬水剑伤害'], 'a')
}, {
  title: '瞬水剑三段蒸发',
  params: {
    q: 1,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段瞬水剑伤害'], 'a', 'vaporize')
}, {
  title: '绫夜万班瞬水剑三段蒸发',
  params: {
    q: 1,
    team: true
  },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段瞬水剑伤害'], 'a', 'vaporize')
}, {
  title: '神里流·水囿每段伤害',
  params: {
    q: 1,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.q['水花剑伤害'], 'q')
}, {
  title: '神里流·水囿每段蒸发',
  params: {
    q: 1,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.q['水花剑伤害'], 'q', 'vaporize')
}]

export const defDmgIdx = 3
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const defParams = {
  q: 1,
  team: true
}

export const buffs = [{
  title: '神里绫人元素爆发：普通攻击伤害提升伤害提升[aDmg]%',
  data: {
    aDmg: ({ talent }) => talent.q['普通攻击伤害提升']
  }
}, {
  cons: 1,
  title: '神里绫人1命：对于生命值低于或等于50%的敌人，瞬水剑造成的伤害提升40%',
  data: {
    aDmg: 40
  }
}, {
  cons: 2,
  title: '神里绫人2命：3层浪闪以上时提高50%生命值',
  data: {
    hpPct: ({ params }) => params.q ? 0 : 50
  }
}, {
  check: ({ cons }) => cons < 2,
  title: '4层浪闪：提高瞬水剑伤害[aPlus]',
  data: {
    aPlus: ({ attr, calc, talent }) => calc(attr.hp) * talent.e['浪闪伤害值提高'] / 100 * 4
  }
}, {
  cons: 2,
  title: '神里绫人2命：5层浪闪提高瞬水剑伤害[aPlus]',
  data: {
    aPlus: ({ attr, calc, talent }) => calc(attr.hp) * talent.e['浪闪伤害值提高'] / 100 * 5
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
  check: ({ cons, params }) => cons <= 3 && params.team === true,
  title: '0命夜兰：获得[dmg]%增伤',
  data: {
    dmg: 50
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '4命夜兰：获得[dmg]%增伤,增加40%生命值',
  data: {
    dmg: 50,
    hpPct: 40
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
}, 'vaporize',
{title: '11.3最后修改：如有问题可联系1142607614反馈'}
]
