/*
* q: 1 - Q状态，a伤害
* q: 2 - Q状态，E伤害
* q: 3 - Q状态，冥祭
* q: 4 - Q状态，炮弹
* */

export const details = [{
  title: '秘仪·律渊渡魂',
  params: { q: 0 , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '秘仪·律渊渡魂超激化',
  params: { q: 0 , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', '超激化')
}, {
  title: 'Q状态普攻首段',
  params: { q: 1 , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['一段伤害'], 'a')
}, {
  title: 'Q状态 E伤害',
  params: { q: 2 , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['冥祭伤害'], 'e')
}, {
  title: 'Q+末途真眼 E伤害',
  params: { q: 3 , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['冥祭伤害'], 'e')
}, {
  title: 'Q后强化E·超激化',
  params: { q: 3 , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['冥祭伤害'], 'e', '超激化')
}, {
  title: 'Q+末途真眼 渡荒之雷',
  params: { q: 4 , team: false },
  dmg: ({ talent }, dmg) => dmg(100, 'e')
}, {
  title: '渡荒之雷超激化伤害',
  params: { q: 4 , team: true },
  dmg: ({ talent }, dmg) => dmg(100, 'e', '超激化')
}, {
  title: '赛皇妲钟 强化E激化',
  params: { q: 3 , team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['冥祭伤害'], 'e', '超激化')
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,mastery'
export const defParams = { q: 3 , team: true}

export const buffs = [{
  title: '赛诺Q：Q状态下提升元素精通100点',
  data: {
    mastery: ({ params }) => params.q ? 100 : 0
  }
}, {
  // 普攻提升雷伤
  title: '赛诺2命：普攻提高雷伤，5层增加50%',
  cons: 2,
  data: {
    dmg: 50
  }
}, {
  title: '赛诺天赋1：末途真眼状态提升E 35%伤害，发射渡荒之雷造成100%攻击力伤害',
  data: {
    eDmg: ({ params }) => [3, 4].includes(params.q) ? 35 : 0
  }
}, {
  title: '赛诺天赋2：基于元素精通提升普攻[_aPlus]点伤害值，渡荒之雷提升[_ePlus]伤害值',
  data: {
    aPlus: ({ attr, calc, params }) => params.q === 1 ? calc(attr.mastery) * 1.5 : 0,
    _aPlus: ({ attr, calc, params }) => calc(attr.mastery) * 1.5,
    ePlus: ({ attr, calc, params }) => params.q === 4 ? calc(attr.mastery) / 2.5 : 0,
    _ePlus: ({ attr, calc, params }) => calc(attr.mastery) / 2.5
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
  check: ({ cons, params }) => ((cons < 4 &&cons >= 2) && params.team === true),
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
    check: ({ params }) => params.team === true,
    title: '宗室钟离：降低敌人[kx]%抗性，攻击力提升[atkPct]%',
    data: {
      kx: 20,
      atkPct: 20
    }
  }, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 蔓生之草(激化/激绽/烈绽队)：触发激化或超绽放烈绽放反应后，提升元素精通[mastery]点',
  data: {
    mastery: 100
  }
}, 'aggravate',
{title: '2.16最后修改：如有问题可联系1142607614反馈'}
]
