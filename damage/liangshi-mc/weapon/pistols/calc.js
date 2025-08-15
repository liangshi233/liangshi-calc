export default function (step, staticStep) {
  return {

    //星
    "教学配枪": false,

    //星星
    "原初佩枪·穿林": false,

    //星星星
    "暗夜佩枪·暗星": {
      title: '[无归] 释放变奏技能时，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(8)
      }
    },
    "源能佩枪·测叁": false,
    "远行者佩枪·洞察": {
      title: '[远涉] 施放共鸣技能时，回复[_energyevery]点共鸣能量',
      refine: {
        _energyevery: step(8, 1)
      }
    },
    "戍关佩枪·平云": {
      title: '[同心] 共鸣技能伤害加成提升[eDmg]%',
      refine: {
        eDmg: step(12)
      }
    },

    //星星星星
    "华彩乐段": {
      title: '[咏叹之音] 施放共鸣技能时，回复[_concerto]点协奏能量',
      refine: {
        _concerto: step(8)
      }
    },
    "穿击枪-26型": {
      title: '[穷理洞彻] 角色没有受到伤害[buff]秒，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => params["前台时间"] || 6,
        atkPct: ({ params, refine }) => Math.floor((params["前台时间"] || 6) / 5) * step(6)[refine]
      }
    },
    "无眠烈火": {
      title: '[赤胆忠心] 释放变奏技能时，共鸣技能伤害加成[eDmg]%',
      refine: {
        eDmg: step(20)
      }
    },
    "飞逝": {
      title: '[一息万变] 角色冲刺或闪避3.0次，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(4 * 3, 1 * 3)
      }
    },
    "奔雷": {
      title: '[锐不可当] 造成普攻或重击伤害[buff]次，共鸣技能伤害加成提升[eDmg]%',
      data: {
        buff: ({ params }) => (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0),
        eDmg: ({ params, refine }) => Math.min(((params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0)), 3) * step(7, 4)[refine]
      }
    },
    "悖论喷流": {
      title: '[彼岸眼瞳] 施放共鸣技能时，获得[_energyevery]点共鸣能量，且攻击提升[atkPct]%',
      refine: {
        _energyevery: step(6, 1),
        atkPct: step(10)
      }
    },
    "叙别的罗曼史": {
      check: ({ params }) => ((params["风蚀效应"] || 0) + (params["电磁效应"] || 0) + (params["光噪效应"] || 0) + (params["聚爆效应"] || 0) + (params["霜渐效应"] || 0) + (params["虚湮效应"] || 0)) > 0,
      title: '[修辞] 对带有异常效应的怪物造成[buff]次伤害，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => (params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0),
        atkPct: ({ params, refine }) => Math.min(((params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0)), 4) * step(4)[refine]
      }
    },

    //星星星星星
    "停驻之烟": staticStep('recharge', 12.8),
    "死与舞": [staticStep('atkPct', 12), {
      title: '[缄默悼词] 施放变奏技能或共鸣解放[buff]次，自身共鸣技能伤害加成提升[eDmg]%',
      data: {
        buff: ({ params }) => (params["变奏技能使用次数"] || 1) + (params["共鸣解放使用次数"] || 0),
        eDmg: ({ params, refine }) => Math.min(((params["变奏技能使用次数"] || 1) + (params["共鸣解放使用次数"] || 0)), 1) * step(48)[refine]
      }
    }],
    "林间的咏叹调": [staticStep('atkPct', 12), {
      check: ({ element }) => element === "气动",
      title: '[长夏咏颂] 为目标添加风蚀效应后，伤害加成提升[dmg]%，命中带有风蚀效应的敌人抗性降低[kx]%',
      data: {
        dmg: ({ params, refine }) => params["风蚀效应能力"] === true ? step(24)[refine] : 0,
        kx: ({ params, refine }) => (params["风蚀效应"] || 0) > 0 ? step(10, 1.5)[refine] : 0
      }
    }],
    "阳焰": {
      title: '[狩潮之誓] 造成普攻或重击伤害[buff]次，攻击和重击伤害加成提升[atkPct]%',
      data: {
        buff: ({ params }) => (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0),
        atkPct: ({ params, refine }) => Math.min((params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0), 4) * step(2.25, 1.23)[refine],
        a2Dmg: ({ params, refine }) => Math.min((params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0), 4) * step(2.25, 1.23)[refine]
      }
    }
  }
}

