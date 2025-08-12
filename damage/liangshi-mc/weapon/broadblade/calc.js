export default function (step, staticStep) {
  return {

    //星
    "教学长刃": false,

    //星星
    "原初长刃·朴石": false,

    //星星星
    "暗夜长刃·玄明": {
      title: '[无归] 释放变奏技能时，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(8)
      }
    },
    "源能长刃·测壹": false,
    "远行者长刃·辟路": {
      title: '[远涉] 施放共鸣技能时，回复[_energyevery]点共鸣能量',
      refine: {
        _energyevery: step(8, 1)
      }
    },
    "戍关长刃·定军": {
      title: '[合意] 普攻和重击伤害加成提升[aDmg]%',
      refine: {
        aDmg: step(12),
        a2Dmg: step(12)
      }
    },
    "钧天正音": {
      title: '[轻拢慢捻] 施放变奏技能时，回复[_concerto]点协奏能量；施放延奏技能时，回复[_energyevery]点共鸣能量。',
      refine: {
        _concerto: step(4),
        _energyevery: step(4)
      }
    },

    //星星星星
    "异响空灵": {
      title: '[咏叹之音] 施放共鸣技能时，回复[_concerto]点协奏能量',
      refine: {
        _concerto: step(8)
      }
    },
    "重破刃-41型": {
      title: '[兼收并蓄] 当前生命值[buff]%，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => params.OwnHp || 100,
        atkPct: ({ params, refine }) => (params.OwnHp || 100) > 80 ? step(12)[refine] : 0
      }
    },
    "永夜长明": {
      check: ({ params }) => (params.IntroUse || 1) > 0,
      title: '[枕戈待旦] 施放变奏技能时，自身攻击提升[atkPct]%,防御力提升[defPct]%',
      refine: {
        atkPct: step(8),
        defPct: step(15)
      }
    },
    "东落": {
      title: '[潜能蕴蓄] 施放共鸣技能后攻击力提升[atkPct]%',
      refine: {
        atkPct: step(12)
      }
    },
    "纹秋": {
      title: '[锋芒所向] 造成普攻或重击伤害[buff]次，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.NormalDmg || 1) + (params.ChargedDmg || 0),
        atkPct: ({ params, refine }) => Math.min(((params.NormalDmg || 1) + (params.ChargedDmg || 0)), 5) * step(4, 2.2)[refine]
      }
    },
    "凋亡频移": {
      title: '[彼岸眼瞳] 施放共鸣技能时，获得[_energyevery]点共鸣能量，且攻击提升[atkPct]%',
      refine: {
        _energyevery: step(6, 1),
        atkPct: step(10)
      }
    },
    "容赦的沉思录": {
      check: ({ params }) => ((params.Aero_Erosion || 0) + (params.Electro_Flare || 0) + (params.Spectro_Frazzle || 0) + (params.Fusion_Burst || 0) + (params.Glacio_Chafe || 0) + (params.Havoc_Bane || 0)) > 0,
      title: '[修辞] 对带有异常效应的怪物造成[buff]次伤害，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0),
        atkPct: ({ params, refine }) => Math.min(((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 4) * step(4)[refine]
      }
    },

    //星星星星星
    "浩境粼光": [staticStep('recharge', 12.8), {
      title: '[扬波无止] 释放[buff]次共鸣技能，共鸣解放伤害加成提升[qDmg]%',
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        qDmg: ({ params, refine }) => Math.min((params.SkillsUse || 1), 3) * step(7)[refine]
      }
    }],
    "苍鳞千嶂": [staticStep('dmg', 12), {
      title: '[金戈铁马] 施放变奏技能或共鸣解放[buff]次，重击伤害加成提升提升[a2Dmg]%',
      data: {
        buff: ({ params }) => (params.IntroUse || 1) + (params.BurstUse || 0),
        a2Dmg: ({ params, refine }) => Math.min(((params.IntroUse || 1) + (params.BurstUse || 0)), 2) *  step(24)[refine]
      }
    }],
    "时和岁稔": [staticStep('dmg', 12), {
      title: '[承天之祐] 施放变奏技能和共鸣技能时共鸣技能伤害加成提升[eDmg]%',
      data: {
        eDmg: ({ params, refine }) => ((params.IntroUse || 1) > 0 ? step(24)[refine] : 0) + ((params.SkillsUse || 1) > 0 ? step(24)[refine] : 0)
      }
    }],
    "焰痕": [staticStep('atkPct', 12), {
      title: '[闪耀星火] 施放变奏技能或共鸣解放时共鸣解放伤害提升[qDmg]%，造成重击伤害时伤害加成提升[dmg]%',
      data: {
        qDmg: ({ params, refine }) => ((params.IntroUse || 1) + (params.BurstUse || 0)) > 0 ? step(24)[refine] : 0,
        dmg: ({ params, refine }) => ((params.IntroUse || 1) + (params.BurstUse || 0)) > 0 ? ((params.ChargedDmg || 0) > 0 ? (element === "热熔" ? step(24)[refine] : 0) : 0) : 0
      }
    }],
    "金穹": {
      check: ({ params }) => (params["共鸣解放使用次数"] || 0) > 0,
      title: '[狩潮之誓] 施放共鸣解放时，攻击提升[atkPct]%，共鸣解放伤害加成提升[qDmg]%',
      refine: {
        atkPct: step(7.2, 3.96),
        qDmg: step(10.8, 5.94)
      }
    },
    "驭冕铸雷之权": [staticStep('atkPct', 12), {
      title: '[炽烈权霆] 施放变奏技能或共鸣技能时，重击伤害提升[a2Dmg]%，自身获得护盾[buff]次,共鸣解放伤害无视目标[a2Ignore]%防御',
      data: {
        a2Dmg: ({ params, refine }) => ((params["共鸣技能使用次数"] || 1) + (params["变奏技能使用次数"] || 1)) > 0 ? step(20)[refine] : 0,
        buff: ({ params }) => params["获得护盾次数"] || 0,
        a2Ignore: ({ params, refine }) => Math.min((params["获得护盾次数"] || 0), 5) * step(7.2, 1.2)[refine]
      }
    }]
  }
}

