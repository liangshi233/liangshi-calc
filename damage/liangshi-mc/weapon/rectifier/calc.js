export default function (step, staticStep) {
  return {

    //星
    "教学音感仪": false,

    //星星
    "原初音感仪·听浪": false,

    //星星星
    "暗夜矩阵·暝光": {
      title: '[无归] 释放变奏技能时，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(8)
      }
    },
    "源能音感仪·测五": false,
    "远行者矩阵·探幽": {
      title: '[远涉] 施放共鸣技能时，回复[_energyevery]点共鸣能量',
      refine: {
        _energyevery: step(8, 1)
      }
    },
    "戍关音感仪·留光": {
      title: '[相行] 普攻和重击伤害加成提升[eDmg]%',
      refine: {
        aDmg: step(12),
        a2Dmg: step(12)
      }
    },

    //星星星星
    "渊海回声": {
      check: ({ params }) => params["共鸣解放使用次数"] > 0,
      title: '[天星瞭望] 释放共鸣解放后，治疗加成提升[heal]%',
      refine: {
        heal: step(16)
      }
    },
    "奇幻变奏": {
      title: '[咏叹之音] 施放共鸣技能时，回复[_concerto]点协奏能量',
      refine: {
        _concerto: step(8)
      }
    },
    "大海的馈赠": {
      check: ({ params }) => params["光噪效应"] > 0,
      title: '[渔获] 带有【光噪效应】的敌人造成伤害时伤害提升[dmg]%',
      refine: {
        dmg: step(6 * 4, 1 * 4)
      }
    },
    "鸣动仪-25型": {
      title: '[创制开先] 施放共鸣技能时角色生命值为[buff]%，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => params["自身生命值"] || 100,
        atkPct: ({ params, refine }) => (params["自身生命值"] || 100) >= 60 ? step(12)[refine] : 0
      }
    },
    "今州守望": {
      title: '[忠诚卫士] 释放变奏技能时，攻击提升[atkPct]%,生命值提升[hpPct]%',
      refine: {
        atkPct: step(8),
        hpPct: step(10)
      }
    },
    "异度": {
      title: '[重光护持] 造成普攻或重击伤害[buff]次，治疗效果加成提升[heal]%',
      data: {
        buff: ({ params }) => (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0),
        heal: ({ params, refine }) => Math.min(((params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0)), 3) * step(3)[refine]
      }
    },
    "清音": {
      check: ({ params }) => params["共鸣解放使用次数"] > 0,
      title: '[刚柔并出] 释放共鸣解放后，攻击提升[atkPct]%',
      refine: {
        atkPct: step(15)
      }
    },
    "核熔星盘": {
      title: '[彼岸眼瞳] 施放共鸣技能时，获得[_energyevery]点共鸣能量，且攻击提升[atkPct]%',
      refine: {
        _energyevery: step(6, 1),
        atkPct: step(10)
      }
    },
    "虚饰的华尔兹": {
      check: ({ params }) => ((params["风蚀效应"] || 0) + (params["电磁效应"] || 0) + (params["光噪效应"] || 0) + (params["聚爆效应"] || 0) + (params["霜渐效应"] || 0) + (params["虚湮效应"] || 0)) > 0,
      title: '[修辞] 对带有异常效应的怪物造成[buff]次伤害，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => (params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0),
        atkPct: ({ params, refine }) => Math.min(((params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0)), 4) * step(4)[refine]
      }
    },

    //星星星星星
    "漪澜浮录": [staticStep('recharge', 12.8), {
      title: '[浮波万顷] 造成[buff]次普攻伤害，普攻伤害加成提升[aDmg]%',
      data: {
        buff: ({ params }) => params["常态攻击造成伤害次数"] || 1,
        aDmg: ({ params, refine }) => Math.min((params["常态攻击造成伤害次数"] || 1), 5) * step(3.2)[refine]
      }
    }],
    "掣傀之手": [staticStep('dmg', 12), {
      title: '[密电增幅] 造成[buff]次共鸣技能伤害，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params["共鸣技能造成伤害次数"] || 1,
        atkPct: ({ params, refine }) => Math.min((params["共鸣技能造成伤害次数"] || 1), 2) * step(12)[refine] + (params["后台时间"] > 0 ? step(12)[refine] : 0)
      }
    }],
    "琼枝冰绡": [staticStep('atkPct', 12), {
      title: '[景外之景] 施放[buff]次共鸣技能，普攻伤害加成提升[aDmg]%',
      data: {
        buff: ({ params }) => params["共鸣技能使用次数"] || 1,
        aDmg: ({ params, refine }) => params["共鸣技能使用次数"] >= 3 ? (params["后台时间"] > 0 ? (params["延奏技能使用次数"] > 0 ? step(52)[refine] : step(36)[refine]) : step(36)[refine]) : ((params["共鸣技能造成伤害次数"] || 1) * step(12)[refine])
      }
    }],
    "星序协响": [staticStep('hpPct', 12), {
      title: '[群星迭律] 施放共鸣解放时恢复[_energyevery]点协奏能量，共鸣技能造成治疗时攻击力提升[atkPct]%',
      data: {
        _energyevery: ({ refine }) => step(8)[refine],
        atkPct: ({ characterName, refine }) => ['白芷', '守岸人'].includes(characterName) ? step(14)[refine] : 0
      }
    }],
    "和光回唱": [staticStep('atkPct', 12), {
      title: '[衔枝者赞诗] 目标[buff]层【光噪效应】，普攻、重击伤害加成提升[aDmg]%,角色周围的目标受到【光噪效应】伤害加深[Spectro]%',
      data: {
        buff: ({ params }) => params["光噪效应"] || 0,
        aDmg: ({ params, refine }) => Math.min((params["光噪效应"] || 0), 3) * step(14)[refine],
        a2Dmg: ({ params, refine }) => Math.min((params["光噪效应"] || 0), 3) * step(14)[refine],
        Spectro: ({ refine }) => step(30)[refine]
      }
    }],
    "海的呢喃": [staticStep('atkPct', 12), {
      check: ({ params }) => !params["后台时间"],
      title: '[在海中] 施放变奏技能或普攻后施放[buff]次声骸技能，普攻伤害加成提升[aDmg]%，无视目标[kx]%抗性',
      data: {
        buff: ({ params }) => ((params["共鸣技能使用次数"] || 1) + (params["变奏技能使用次数"] || 1)) > 0 ? (params["声骸技能使用次数"] || 1) : 0,
        aDmg: ({ params, refine }) => ((params["共鸣技能使用次数"] || 1) + (params["变奏技能使用次数"] || 1)) > 0 ? step(40)[refine] : 0,
        kx: ({ element, params, refine }) => ((params["共鸣技能使用次数"] || 1) + (params["变奏技能使用次数"] || 1)) > 0 ? ((params["声骸技能使用次数"] || 1) > 1 ? (element === '湮灭' ? step(12)[refine] : 0) : 0) : 0
      }
    }],
    "幽冥的忘忧章": [staticStep('atkPct', 12), {
      title: '[安魂曲] 造成声骸伤害后，共鸣技能伤害提升[eDmg]%，声骸伤害提升[rDmg]%，攻击无视目标[ignore]%防御力',
      refine: {
        aDmg: step(32),
        rDmg: step(32),
        ignore: step(8)
      }
    }],
    "曜光": {
      check: ({ params }) => (params["共鸣技能使用次数"] || 1) > 0,
      title: '[狩潮之誓] 释放共鸣技能时，攻击和普攻伤害加成提升[atkPct]%',
      data: {
        atkPct: step(9, 4.95),
        aDmg: step(9, 4.95)
      }
    }
  }
}

