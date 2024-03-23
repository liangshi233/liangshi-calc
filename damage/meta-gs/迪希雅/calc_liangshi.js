export const details = [{
  title: '领域伤害',
  params: {team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['领域伤害'], 'e')
}, {
  title: '领域伤害蒸发',
  params: { team: false ,e2: true},
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e', 'vaporize')
  }
}, {
  title: '炽鬃拳伤害',
  params: { team: false },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
}, {
  title: '迪甘莫妲 E协同伤害',
  params: { team: true ,e2: true},
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e')
  }
}, {
  title: '迪甘莫妲 炽鬃拳伤害',
  params: { team: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
}, {
  title: '迪甘莫妲 炽鬃拳蒸发',
  params: { team: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', '蒸发')
  }
}]

export const defDmgIdx = 5
export const mainAttr = 'hp,atk,cpct,cdmg'
export const defParams = {
    team:true,e2: true , soda: 1
}

export const buffs = [{
  title: '迪希雅1命：生命值上限提升20%，e伤害提高[ePlus]，q伤害提高[qPlus]',
  cons: 1,
  data: {
    hpPct: 20,
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.036,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 0.06
  }
}, {
  check: ({ params }) => params.e2 === true,
  title: '迪希雅2命：净焰剑狱下次协同攻击造成的伤害提升50%',
  cons: 2,
  data: {
    eDmg:50
  }
}, {
  title: '迪希雅6命：暴击率增加10%，暴击伤害增加60%（默认叠满）',
  cons: 6,
  data: {
    cpct: 10,
    cdmg: 60
  }
}, {check: ({ cons,params }) =>  (cons >= 4&& params.team === true),
    title: '4命甘雨：敌人受到伤害增加[dmg]%',
    data: {
      dmg: 25,
   }
  }, {check: ({ cons,params }) =>  (cons >= 2&& params.team === true),
    title: '千岩讨龙4命莫娜：获得[dmg]%增伤，增加[atkPct]%攻击,暴击15%',
    data: {
      dmg: 60,
      cpct: 15,
      atkPct:68,
   }
  }, {check: ({ cons,params }) =>  (cons < 2&& params.team === true),
    title: '千岩讨龙0命莫娜：获得[dmg]%增伤，增加[atkPct]%攻击',
    data: {
      dmg: 60,
      atkPct:68,
   }
  }, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '精5千夜4命纳西妲：增加精通[mastery],减防[enemyDef]%',
  data: {
    mastery: 418,
    enemyDef: 30,
  }
}, {
  check: ({ cons, params }) => ((cons < 4 &&cons >= 2) && params.team === true),
  title: '精1千夜2命纳西妲：增加精通[mastery],减防[enemyDef]%',
  data: {
    mastery: 290,
    enemyDef: 30,
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true),
  title: '精1千夜0命纳西妲：增加精通[mastery]',
  data: {
    mastery: 290,
  }
}, 'vaporize',
{title: '3.1最后修改：如有问题请输入 #伤害计算反馈'}
]
