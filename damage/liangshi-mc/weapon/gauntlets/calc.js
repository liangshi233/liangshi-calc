export default function (step, staticStep) {
  return {

    // 星
    "教学臂铠": false,

    //星星
    "原初臂铠·磐岩": false,

    //星星星
    "暗夜臂铠·夜芒": {
      title: '[无归] 释放变奏技能时，攻击力提升[atkPct]%',
      refine: {
        atkPct: step(8)
      }
    },
    "源能臂铠·测肆": false,
    "远行者臂铠·破障": {
      title: '[远涉] 施放共鸣技能时，回复[_energyevery]点共鸣能量',
      refine: {
        _energyevery: step(8, 1)
      }
    },
    "戍关臂铠·拔山": {
      title: '[众力] 共鸣解放伤害加成提升[qDmg]%',
      refine: {
        qDmg: step(12)
      }
    },


    //星星星星
    "呼啸重音": {
      title: '[咏叹之音] 施放共鸣技能时，回复[_concerto]点协奏能量',
      refine: {
        _concerto: step(8)
      }
    },
    "钢影拳-21丁型": {
      title: '[谋定入微] 冲刺或闪避后攻击力提升[atkPct]%,闪避反击造成的伤害提升[a4Dmg]%',
      refine: {
        atkPct: step(8),
        a4Dmg: step(50)
      }
    },
    "袍泽之固": {
      title: '[无衣长歌] 释放变奏技能时，共鸣解放伤害加成[qDmg]%',
      refine: {
        qDmg: step(20)
      }
    },
    "骇行": {
      check: ({ params }) => params["共鸣解放使用次数"] > 0,
      title: '[旋星相佑] 施放共鸣解放后，受到[buff]次伤害，攻击和防御提升[atkPct]%',
      data: {
        buff: ({ params }) => params["受到伤害次数"] || 1,
        atkPct: ({ params, refine }) => Math.max((3 - (params["受到伤害次数"] || 1)), 0) * step(3, 0.5)[refine],
        defPct: ({ params, refine }) => Math.max((3 - (params["受到伤害次数"] || 1)), 0) * step(3, 0.5)[refine]
      }
    },
    "金掌": {
      title: '[破壁攻坚] 施放共鸣技能时，共鸣解放伤害加成提升[qDmg]%',
      refine: {
        qDmg: step(18, 9)
      }
    },
    "尘云旋臂": {
      title: '[彼岸眼瞳] 施放共鸣技能时，获得[_energyevery]点共鸣能量，且攻击提升[atkPct]%',
      refine: {
        _energyevery: step(6, 1),
        atkPct: step(10)
      }
    },
    "酩酊的英雄志": {
      check: ({ params }) => ((params["风蚀效应"] || 0) + (params["电磁效应"] || 0) + (params["光噪效应"] || 0) + (params["聚爆效应"] || 0) + (params["霜渐效应"] || 0) + (params["虚湮效应"] || 0)) > 0,
      title: '[修辞] 对带有异常效应的怪物造成[buff]次伤害，攻击提升[atkPct]%',
      data: {
        buff: ({ params }) => (params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0),
        atkPct: ({ params, refine }) => Math.min(((params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0)), 4) * step(4)[refine]
      }
    },

    //星星星星星
    "擎渊怒涛": [staticStep('recharge', 12.8), {
      title: '[噬渊沦亡] 造成共鸣技能伤害，普攻伤害加成提升[aDmg]%；造成普攻伤害，共鸣技能伤害加成提升[eDmg]%',
      data: {
        aDmg: ({ params, refine }) => (params["共鸣技能造成伤害次数"] || 1) > 0 ? step(10)[refine] : 0,
        eDmg: ({ params, refine }) => (params["常态攻击造成伤害次数"] || 1) > 0 ? step(10)[refine] : 0
      }
    }],
    "诸方玄枢": [staticStep('dmg', 12), {
      check: ({ params }) => params["共鸣解放使用次数"] > 0,
      title: '[探源逐本] 释放共鸣解放后，共鸣解放伤害加成提升[qDmg]%',
      refine: {
        qDmg: step(48)
      }
    }],
    "悲喜剧": [staticStep('atkPct', 12), {
      check: ({ params }) => ((params["常态攻击使用次数"] || 1) + (params["变奏技能使用次数"] || 1)) > 0,
      title: '[愚人欢歌] 施放普攻或变奏技能，重击伤害加成提升[a2Dmg]%',
      refine: {
        a2Dmg: step(48)
      }
    }],
    "焰光裁定": [staticStep('atkPct', 12), {
      check: ({ params }) => (params["常态攻击使用次数"] || 1) > 0,
      title: '[破暗者] 施放普攻时，无视目标[ignore]%防御力，造成的光噪效应伤害提升[Spectro]%',
      refine: {
        ignore: step(8),
        Spectro: step(50)
      }
    }],
    "凌空": {
      check: ({ params }) => (params["共鸣解放使用次数"] || 0) > 0,
      title: '[狩潮之誓] 施放共鸣解放时，攻击提升[atkPct]%，共鸣解放伤害加成提升[qDmg]%',
      refine: {
        atkPct: step(7.2, 3.96),
        qDmg: step(10.8, 5.94)
      }
    },
    "万物持存的注释": [staticStep('atkPct', 12), {
      title: '[昼月缀界] 施放变奏技能或共鸣解放时，共鸣解放伤害提升[qDmg]%，自身获得护盾[buff]次,共鸣解放伤害无视目标[Spectro]%防御',
      data: {
        qDmg: ({ params, refine }) => ((params["共鸣解放使用次数"] || 0) + (params["变奏技能使用次数"] || 1)) > 0 ? step(20)[refine] : 0,
        buff: ({ params }) => params["获得护盾次数"] || 0,
        qIgnore: ({ params, refine }) => Math.min((params["获得护盾次数"] || 0), 5) * step(7.2, 1.2)[refine]
      }
    }]
  }
}

