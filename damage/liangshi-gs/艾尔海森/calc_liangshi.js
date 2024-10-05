export const details = [{
  title: '附魔普攻一段蔓激化伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'spread')
}, {
  title: '理式摹写突进伤害',
  params: { e: true, q: false, team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['突进攻击伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e')
  }
}, {
  title: '理式摹写突进蔓激化伤害',
  params: { e: true, q: false, team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['突进攻击伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e', 'spread')
  }
}, {
  title: '光幕单段伤害',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['1枚光幕攻击伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * 0.5558 * atk / 100 + td[1] * 0.5558 * em / 100, 'e')
  }
}, {
  title: '光幕单段蔓激化伤害',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['1枚光幕攻击伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * 0.5558 * atk / 100 + td[1] * 0.5558 * em / 100, 'e', 'spread')
  }
}, {
  title: '显象缚结蔓激化-4段',
  params: { e: false, q: true, team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.q['单次伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    let q = basic(td[0] * atk / 100 + td[1] * em / 100, 'q', 'spread')
    let q_spread = basic(td[0] * atk / 100 + td[1] * em / 100, 'q')
    return {
      dmg: q.dmg * 2 + q_spread.dmg * 2,
      avg: q.avg * 2 + q_spread.avg * 2
    }
  }
}, {
  title: '显象缚结蔓激化-10段',
  params: { e: false, q: true, team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.q['单次伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    let q_spread = basic(td[0] * atk / 100 + td[1] * em / 100, 'q', 'spread')
    let q = basic(td[0] * atk / 100 + td[1] * em / 100, 'q')
    return {
      dmg: q.dmg * 6 + q_spread.dmg * 4,
      avg: q.avg * 6 + q_spread.avg * 4
    }
  }
}, {
  title: '艾妲皇久 光幕蔓激化',
  params: { team: true },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['1枚光幕攻击伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * 0.5558 * atk / 100 + td[1] * 0.5558 * em / 100, 'e', 'spread')
  }
}, {
  title: '艾妲皇久E蔓激化伤害',
  params: { e: true, q: false, team: true },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['突进攻击伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e', 'spread')
  }
}, {
  title: '艾妲皇久Q蔓激化10段',
  params: { e: false, q: true, team: true },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.q['单次伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    let q_spread = basic(td[0] * atk / 100 + td[1] * em / 100, 'q', 'spread')
    let q = basic(td[0] * atk / 100 + td[1] * em / 100, 'q')
    return {
      dmg: q.dmg * 6 + q_spread.dmg * 4,
      avg: q.avg * 6 + q_spread.avg * 4
    }
  }
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
  q: false,
  e: true,
  team: true
}

export const buffs = [
  {
    title: '艾尔海森天赋2：基于元素精通提升光幕与显象缚结伤害[eDmg]%',
    sort: 9,
    data: {
      eDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery)) * 0.1),
      qDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery)) * 0.1)
    }
  }, {
    title: '艾尔海森二命：每1枚产生的琢光镜将使元素精通提升50点，默认3层',
    cons: 2,
    data: { mastery: 150 }
  }, {
    check: ({ params }) => params.q === false,
    title: '艾尔海森四命：每1枚产生的琢光镜将使草元素伤害提升10%，默认3层',
    cons: 4,
    data: { dmg: 30 }
  }, {
    check: ({ params }) => params.q === false,
    title: '艾尔海森六命：暴击率提升10%，暴击伤害提升70%',
    cons: 6,
    data: {
      cpct: 10,
      cdmg: 70
    }
  }, {
    check: ({ cons, params }) => (cons >= 4 && params.team === true),
    title: '精5千夜4命4深林纳西妲：增加精通[mastery],减防[enemyDef]%，降低[kx]%草元素抗性',
    data: {
      mastery: 418,
      enemyDef: 30,
      kx: 30
    }
  }, {
    check: ({ cons, params }) => ((cons < 4 && cons >= 2) && params.team === true),
    title: '精1千夜2命4深林纳西妲：增加精通[mastery],减防[enemyDef]%，降低[kx]%草元素抗性',
    data: {
      mastery: 290,
      enemyDef: 30,
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
    check: ({ cons, params }) => (cons >= 6 && params.team === true),
    title: '教官精5终末菲谢尔：元素精通提升[mastery]攻击力提升[atkPct]%',
    data: {
      mastery: 420,
      atkPct: 40
    }
  }, {
    check: ({ cons, params }) => (cons < 6 && params.team === true),
    title: '教官精1终末菲谢尔：元素精通提升[mastery]攻击力提升[atkPct]%',
    data: {
      mastery: 220,
      atkPct: 20
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.team === true,
    title: '千岩久歧忍：获得[atkPct]%攻击',
    sort: 9,
    data: { atkPct: 20 }
  }, {
    check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
    title: '精1圣显之钥千岩久歧忍：获得[atkPct]%攻击，提升[mastery]元素精通',
    sort: 9,
    data: {
      atkPct: 20,
      mastery: 110
    }
  }, {
    check: ({ cons, params }) => (cons >= 6 && params.team === true),
    title: '精5圣显之钥千岩久歧忍：获得[atkPct]%攻击，提升[mastery]元素精通',
    sort: 9,
    data: {
      atkPct: 20,
      mastery: 235
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 蔓生之草(激化/激绽/烈绽队)：触发激化或超绽放烈绽放反应后，提升元素精通[mastery]点',
    data: {
      mastery: 100
    }
  },
  { title: '12.30最后修改：修复天赋加成异常' }
]
