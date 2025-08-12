export default function (step, staticStep) {
  return {

    //星
    "教学迅刀": false,

    //星星
    "原初迅刀·鸣雨": false,

    //星星星
    "暗夜迅刀·黑闪": {
      title: '[无归] 释放变奏技能时，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(8)
      }
    },
    "源能迅刀·测贰": false,
    "远行者迅刀·旅迹": {
      title: '[远涉] 施放共鸣技能时，回复[_energyevery]点共鸣能量',
      refine: {
        _energyevery: step(8, 1)
      }
    },
    "戍关迅刀·镇海": {
      title: '[共济] 共鸣技能伤害加成提升[eDmg]%',
      refine: {
        eDmg: step(12)
      }
    },

    //星星星星
    "心之锚": {
      title: '[喵呜！] 在场造成伤害时[buff]次，攻击提升[atkPct]%，暴击提升[cpct]%',
      data: {
        buff: ({ params }) => Math.min(((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 10),
        atkPct: ({ params, refine }) => Math.min(((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 10) * step(4)[refine],
        cpct: ({ params, refine }) => Math.min(((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 10) >= 10 ? step(6)[refine] : 0
      }
    },
    "行进序曲": {
      title: '[咏叹之音] 施放共鸣技能时，回复[_concerto]点协奏能量',
      refine: {
        _concerto: step(8)
      }
    },
    "瞬斩刀-18型": {
      title: '[踔时之进] 当前生命值[buff]%，重击伤害加成提升[a2Dmg]%',
      data: {
        buff: ({ params }) => params.OwnHp || 100,
        a2Dmg: ({ params, refine }) => (params.OwnHp || 100) < 80 ? step(18)[refine] : 0
      }
    },
    "不归孤军": {
      check: ({ params }) => (params.IntroUse || 1) > 0,
      title: '[一往无前] 施放变奏技能时，自身攻击提升[atkPct]%',
      refine: {
        atkPct: step(15)
      }
    },
    "西升": {
      title: '[天时引动] 角色登场[buff]秒，击败[buffC]名目标，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => params.FightTime || 6,
        buffC: ({ params }) => (params.IntroKill || 1) + (params.OutroKill || 0) + (params.CoordinatedKill || 0) + (params.NormalKill || 1) + (params.ChargedKill || 0) + (params.PlungingKill || 0) + (params.SkillsKill || 1) + (params.BurstKill || 0),
        atkPct: ({ params, refine }) => Math.min(((((params.FightTime || 6) > 0 ? 6 : 0) - ((params.FightTime || 6) / 2)) + (((params.IntroKill || 1) + (params.OutroKill || 0) + (params.CoordinatedKill || 0) + (params.NormalKill || 1) + (params.ChargedKill || 0) + (params.PlungingKill || 0) + (params.SkillsKill || 1) + (params.BurstKill || 0)) * 6)), 6) * step(2)[refine]
      }
    },
    "飞景": {
      check: ({ params }) => (params.SkillsUse || 1) > 0,
      title: '[白刃疾风] 施放共鸣技能时，自身普攻和重击伤害加成提升[aDmg]%',
      refine: {
        aDmg: step(20, 11),
        a2Dmg: step(20, 11)
      }
    },
    "永续坍缩": {
      check: ({ params }) => (params.SkillsUse || 1) > 0,
      title: '[彼岸眼瞳] 施放共鸣技能时，获得[_energyevery]点共鸣能量，攻击力提升[atkPct]%',
      refine: {
        _energyevery: step(6, 1),
        atkPct: step(10)
      }
    },
    "风流的寓言诗": {
      check: ({ params }) => ((params.Aero_Erosion || 0) + (params.Electro_Flare || 0) + (params.Spectro_Frazzle || 0) + (params.Fusion_Burst || 0) + (params.Glacio_Chafe || 0) + (params.Havoc_Bane || 0)) > 0,
      title: '[修辞] 对带有异常效应的怪物造成[buff]次伤害，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => (params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0),
        atkPct: ({ params, refine }) => Math.min(((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 4) * step(4)[refine]
      }
    },

    //星星星星星
    "千古洑流": [staticStep('recharge', 12.8), {
      title: '[流涡无垠] 释放[buff]次共鸣技能，攻击力提升[atkPct]%',
      data: {
        buff: ({ params }) => params.SkillsUse || 1,
        atkPct: ({ params, refine }) => Math.min((params.SkillsUse || 1), 2) * step(6)[refine]
      }
    }],
    "赫奕流明": [staticStep('atkPct', 12), {
      title: '[丹煌灼羽] [buff]层【灼羽】，共鸣技能伤害加成提升[eDmg]%',
      data: {
        buff: ({ params }) => Math.min(((params.SkillsUse || 1) * 5 + (params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) +  (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 14),
        eDmg: ({ params, refine }) => Math.min(((params.SkillsUse || 1) * 5 + (params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) +  (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 14) * step(4)[refine]
      }
    }],
    "裁春": [staticStep('atkPct', 12), {
      title: '[终始之外] 造成普攻伤害[buff]次，自身的协奏能量消耗[buffC]次，普攻伤害加成提升[aDmg]%',
      data: {
        buff: ({ params }) => params.NormalDmg || 1,
        buffC: ({ params }) => params.ConcertoUse || 0,
        aDmg: ({ params, refine }) => Math.min((params.NormalDmg || 1), 3) * step(10)[refine] + ((params.ConcertoUse || 0) >= 0 ? step(40)[refine] : 0)
      }
    }],
    "不灭航路": [staticStep('cpct', 8), {
      title: '[欢笑海] 造成普攻伤害[buff]次，施放共鸣解放[buffC]次，普攻伤害加成提升[aDmg]%',
      data: {
        buff: ({ params }) => params.NormalDmg || 1,
        buffC: ({ params }) => params.BurstUse || 0,
        aDmg: ({ params, refine }) => ((params.NormalDmg || 1) >= 0 ? step(24)[refine] : 0) + ((params.BurstUse || 0) >= 0 ? step(24)[refine] : 0)
      }
    }],
    "血誓盟约": [{
      check: ({ params }) => params.HealDetermine === true,
      title: '[和鸣谐振] 造成治疗时，自身共鸣技能伤害提升[eDmg]%',
      refine: {
        eDmg: step(10, 4)
      }
    }, {
      check: ({ characterName, params }) => characterName === "漂泊者·气动" && (params.SkillsUse || 1) > 0,
      title: '[和鸣谐振] 释放共鸣技能时，伤害提升[dmg]%',
      refine: {
        dmg: step(10, 4)
      }
    }],
    "不屈命定之冠": [staticStep('hpPct', 12), {
      check: ({ params }) => ((params.IntroUse || 1) + (params.NormalUse || 1)) > 0,
      title: '[自由骑士之舞] 释放变奏技能或普攻后，无视目标[ignore]%防御力，造成的伤害加深[dmg]%',
      data: {
        ignore: ({ refine }) => step(8)[refine],
        dmg: ({ params, refine }) => (params.Aero_Erosion || 0) >= 1 ? step(20)[refine] : 0
      }
    }],
    "翼锋": {
      check: ({ params }) => (params["共鸣解放使用次数"] || 0) > 0,
      title: '[狩潮之誓] 施放共鸣解放时，攻击提升[atkPct]%，共鸣解放伤害加成提升[qDmg]%',
      refine: {
        atkPct: step(7.2, 3.96),
        qDmg: step(10.8, 5.94)
      }
    },
    "万物持存的注释": [staticStep('atkPct', 12), {
      title: '[昼月缀界] 施放变奏技能或共鸣解放时,共鸣解放伤害提升[qDmg]%，自身获得护盾[buff]次,共鸣解放伤害无视目标[qIgnore]%防御',
      data: {
        qDmg: ({ params, refine }) => ((params["共鸣解放使用次数"] || 0) + (params["变奏技能使用次数"] || 1)) > 0 ? step(20)[refine] : 0,
        buff: ({ params }) => params["获得护盾次数"] || 0,
        qIgnore: ({ params, refine }) => Math.min((params["获得护盾次数"] || 0), 5) * step(7.2, 1.2)[refine]
      }
    }]

  }
}

