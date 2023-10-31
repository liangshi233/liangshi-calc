export const details = [{
  title: '重击伤害',
  params: { e: false, q: false , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '重击蔓激化伤害',
  params: { e: false, q: false , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'spread')
}, {
  title: '所闻遍计长按伤害',
  params: { e: false, q: false , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
}, {
  title: '所闻遍计长按蔓激化',
  params: { e: false, q: false , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e', 'spread')
}, {
  title: '灭净三业伤害',
  params: { e2: true, q: false , team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['灭净三业伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e')
  }
}, {
  title: '灭净三业蔓激化伤害',
  params: { e2: true, q: false , team: false },
  dmg: ({ talent, calc, attr }, { basic }) => {
    const td = talent.e['灭净三业伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e', 'spread')
  }
}, {
  title: '开Q灭净三业伤害',
  params: { e2: true , team: false },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['灭净三业伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e')
  }
}, {
  title: '开Q灭净三业·蔓激化',
  params: { e2: true , team: false },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['灭净三业伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e', 'spread')
  }
}, {
  title: '妲柯皇久 灭净三业',
  params: { e2: true , team: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['灭净三业伤害2']
    const em = calc(attr.mastery)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * em / 100, 'e', 'spread')
  }
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,mastery,cpct,cdmg'

export const defParams = {
    team: true
}

export const buffs = [{
  title: '纳西妲1命：火元素队友额外计入1位',
  cons: 1
}, {
  title: '纳西妲2命：激化相关反应降低敌人防御力30%',
  cons: 2,
  data: {
    enemyDef: 30
  }
}, {
  title: '纳西妲4命：E命中4个敌人提升精通160',
  cons: 4,
  data: {
    mastery: 160
  }
}, {
  title: '纳西妲天赋1：开Q元素精通提升[mastery]',
  data: {
    mastery: ({ calc, attr, params }) => (params.q === false ? 0 : 1) * Math.min(250, calc(attr.mastery) * 0.25)
  }
}, {
  title: '纳西妲天赋2：基于元素精通提升灭净三业伤害[eDmg]%，暴击率[eCpct]%',
  data: {
    eDmg: ({ calc, attr, params }) => (params.e ? 0 : 1) * Math.min(80, (calc(attr.mastery) - 200) * 0.1),
    eCpct: ({ calc, attr, params }) => (params.e ? 0 : 1) * Math.min(24, (calc(attr.mastery) - 200) * 0.03)
  }
}, {
  title: '纳西妲Q：开Q提升灭净三业伤害[eDmg]%',
  data: {
    eDmg: ({ cons, talent, params }) => (params.q === false ? 0 : 1) *
      (cons >= 1 ? talent.q['火2伤害提升'] : talent.q['火1伤害提升'])
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
  data: {
    atkPct: 20
  }
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
  title: '4命深林柯莱：元素精通提升[mastery]草元素抗性降低[kx]%',
  data: {
    mastery: 60,
    kx: 30
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 蔓生之草(激化/激绽/烈绽队)：触发激化或超绽放烈绽放反应后，提升元素精通[mastery]点',
  data: {
    mastery: 100
  }
},
 {title: '3.25最后修改：如有问题可联系1142607614反馈'}
]
