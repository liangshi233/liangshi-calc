export const buffs = {
  凝夜白霜: {
    2: attr('dmg', 10, '冷凝'),
    5: {
      check: ({ element }) => element === '冷凝',
      title: '使用普攻或重击[buff]次，伤害提升[dmg]%',
      data: {
        buff: ({ params }) => Math.min(((params["常态攻击使用次数"] || 1) + (params["重击使用次数"] || 0)), 3),
        dmg: ({ params }) => Math.min(((params["常态攻击使用次数"] || 1) + (params["重击使用次数"] || 0)), 3) * 10
      }
    }
  },
  熔山裂谷: {
    2: attr('dmg', 10, '热熔'),
    5: {
      check: ({ element, params }) => element === '热熔' && (params["共鸣技能使用次数"] || 1) > 0,
      title: '使用共鸣技能时，伤害提升[dmg]%',
      data: {
        dmg: 30
      }
    }
  },
  彻空冥雷: {
    2: attr('dmg', 10, '导电'),
    5: {
      check: ({ element }) => element === '导电',
      title: '使用重击或共鸣技能[buff]次，伤害提升[dmg]%',
      data: {
        buff: ({ params }) => Math.min(((params["共鸣技能使用次数"] || 1) + (params["重击使用次数"] || 0)), 2),
        dmg: ({ params }) => Math.min(((params["共鸣技能使用次数"] || 1) + (params["重击使用次数"] || 0)), 2) * 15
      }
    }
  },
  啸谷长风: {
    2: attr('dmg', 10, '气动'),
    5: {
      check: ({ element, params }) => element === '气动' && (params["变奏技能使用次数"] || 1) > 0,
      title: '变奏登场时，伤害提升[dmg]%',
      data: {
        dmg: 30
      }
    }
  },
  浮星祛暗: {
    2: attr('dmg', 10, '衍射'),
    5: {
      check: ({ element, params }) => element === '衍射' && (params["变奏技能使用次数"] || 1) > 0,
      title: '变奏登场时，伤害提升[dmg]%',
      data: {
        dmg: 30
      }
    }
  },
  沉日劫明: {
    2: attr('dmg', 10, '湮灭'),
    5: {
      check: ({ element }) => element === '湮灭',
      title: '使用普攻或重击[buff]次，伤害提升[dmg]%',
      data: {
        buff: ({ params }) => Math.min(((params["常态攻击使用次数"] || 1) + (params["重击使用次数"] || 0)), 4),
        dmg: ({ params }) => Math.min(((params["常态攻击使用次数"] || 1) + (params["重击使用次数"] || 0)), 4) * 7.5
      }
    }
  },
  隐世回光: {
    2: attr('heal', 10),
    5: {
      check: ({ params }) => params["队伍治疗能力"] === true,
      title: '为友方提供治疗时，全队攻击力提升[atkPct]%',
      data: {
        atkPct: 15
      }
    }
  },
  轻云出月: {
    2: attr('recharge', 10)
  },
  不绝余音: {
    2: attr('atkPct', 10),
    5: {
      title: '在场[buff]秒，攻击力提升[atkPct]%。延奏伤害提升[lDmg]%',
      data: {
        buff: ({ params }) => params["前台时间"] || 6,
        atkPct: ({ params }) => Math.min(((params["前台时间"] || 6) / 1.5 * 5), 20),
        lDmg: 60
      }
    }
  },
  凌冽决断之心: {
    2: {
      title: '共鸣技能伤害提升[eDmg]%',
      data: {
        eDmg: 12
      }
    },
    5: {
      title: '释放共鸣技能时，伤害提升[dmg]%，释放共鸣解放时，共鸣技能伤害提升[atkPct]%',
      data: {
        dmg: ({ params, element }) => (params["共鸣技能使用次数"] || 1) > 0 ? (element === "冷凝" ? 22.5 :0) : 0,
        eDmg: ({ params }) => (params["共鸣解放使用次数"] || 0) > 0 ? 18 : 0
      }
    }
  },
  此间永驻之光: {
    2: attr('dmg', 10, '衍射'),
    5: {
      title: '为角色添加光噪效应时，暴击提升[cpct]%，目标存在[buff]层光噪效应，伤害提升[dmg]%',
      data: {
        buff: ({ params }) => params["光噪效应"] || 0,
        cpct: ({ params }) => params["光噪效应能力"] === true ? 20 : 0,
        dmg: ({ params, element }) => element === '衍射' ? ((params["光噪效应"] || 0) >= 10 ? 15 : 0) : 0
      }
    }
  },
  幽夜隐匿之帷: {
    2: attr('dmg', 10, '湮灭')
  },
  高天共奏之曲: {
    2: attr('recharge', 10),
    5: {
      title: '协同攻击造成的伤害提升[xDmg]%，协同攻击命中且暴击时攻击力提升[atkPct]%',
      data: {
        xDmg: 80,
        atkPct: ({ params }) => params["协同攻击命中次数"] > 0 ? 20 : 0
      }
    }
  },
  无惧浪涛之勇: {
    2: attr('recharge', 10),
    5: {
      title: '攻击力提升[atkPct]%，伤害提升[dmg]%',
      sort: 9,
      data: {
        atkPct: 15,
        dmg: ({ attr }) => (attr.recharge.base + attr.recharge.plus) >= 250 ? 30 : 0
      }
    }
  },
  流云逝尽之空: {
    2: attr('dmg', 10, '气动'),
    5: {
      check: ({ params }) => params["风蚀效应能力"] === true,
      title: '为敌人添加风蚀效应时，伤害提升[dmg]%',
      data: {
        dmg: ({ element }) => element === '气动' ? 30 : 0
      }
    }
  },
  愿戴荣光之旅: {
    2: attr('dmg', 10, '气动'),
    5: {
      check: ({ params }) => (params["风蚀效应"] || 0) > 0,
      title: '攻击存在风蚀效应的敌人，暴击提升[cpct]%，伤害提升[dmg]%',
      data: {
        cpct: 10,
        dmg: ({ element }) => element === '气动' ? 30 : 0
      }
    }
  },
  奔狼燎原之焰: {
    2: attr('dmg', 10, '热熔'),
    5: {
      check: ({ element, params }) => element === '热熔' && (params["共鸣解放使用次数"] || 0) > 0,
      title: '使用共鸣解放时，伤害提升[dmg]%，共鸣解放伤害提升[qDmg]%',
      data: {
        dmg: ({ element }) => element === '热熔' ? 15 : 0,
        qDmg: 20
      }
    }
  },
  失序彼岸之梦: {
    3: {
      title: '当前共鸣能量[buff]%,暴击率提升[cpct]%，声骸技能伤害加成提升[rDmg]%',
      data: {
        buff: ({ params }) => params["共鸣能量"] || 100,
        cpct: ({ params }) => (params["共鸣能量"] || 100) === 0 ? 20 : 0,
        rDmg: ({ params }) => (params["共鸣能量"] || 100) === 0 ? 35 : 0
      }
    }
  },
  息界同调之律: {
    3: {
      title: '角色施放声骸技能[buff]次,声骸技能伤害加成提升[rDmg]%，重击伤害提升[a2Dmg]%',
      data: {
        buff: ({ params }) => params["声骸技能使用次数"] || 1,
        rDmg: ({ params }) => Math.min((params["声骸技能使用次数"] || 1), 4) * 8,
        a2Dmg: ({ params }) => Math.min((params["声骸技能使用次数"] || 1), 4) * 5
      }
    }
  },
  荣斗铸锋之冠: {
    3: {
      title: '角色获得护盾[buff]次,攻击提升[atkPct]%，暴击伤害提升[cdmg]%',
      data: {
        buff: ({ params }) => params["获得护盾次数"] || 0,
        atkPct: ({ params }) => Math.min((params["获得护盾次数"] || 0), 5) * 6,
        cdmg: ({ params }) => Math.min((params["获得护盾次数"] || 0), 5) * 4
      }
    }
  }
}
