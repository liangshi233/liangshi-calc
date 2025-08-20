export const TeamArtifact = {
  //1星

  初学者: false,

  //3星

  冒险家: false,
  幸运儿: false,
  游医: false,

  //4星

  流放者: {
    title: '队友圣遗物：[流放者] 释放元素爆发后,队伍中所有角色恢复[_energyevery]点元素能量',
    data: {
      _energyevery: 6
    }
  },
  学士: {
    check: ({ weaponTypeName }) => ['弓', '法器'].includes(weaponTypeName),
    title: '队友圣遗物：[学士] 获得元素微粒或元素晶球时,队伍中角色额外恢复[_energyevery]点元素能量',
    data: {
      _energyevery: 3
    }
  },
  教官: {
    check: ({ artis }) => artis['教官'] !== 4,
    title: '队友圣遗物：[教官] 触发元素反应后，队伍中所有角色的元素精通提高[mastery]点',
    data: {
      mastery: 120
    }
  },
  勇士之心: false,
  奇迹: false,
  守护之心: false,
  战狂: false,
  武人: false,
  行者之心: false,
  赌徒: false,

  //5星

  悠古的磐岩: {
    check: ({ element, artis, params }) => !['岩', '风', '草'].includes(element) && artis['悠古的磐岩'] !== 4 && params.ElementRockTeam >= 1,
    title: '队友圣遗物：[悠古的磐岩] 获得结晶反应形成的晶片时，队伍中所有角色获得[dmg]%对应元素伤害加成',
    data: {
      dmg: 35
    }
  },
  昔日宗室之仪: {
    check: ({ artis }) => artis['昔日宗室之仪'] !== 4,
    title: '队友圣遗物：[昔日宗室之仪] 施放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
    data: {
      atkPct: 20
    }
  },
  翠绿之影: {
    check: ({ element, artis, params }) => !['岩', '风', '草'].includes(element) && artis['翠绿之影'] !== 4 && params.ElementWindTeam >= 1,
    title: '队友圣遗物：[翠绿之影] 根据扩散的元素类型，降低受到影响的敌人[kx]%的元素抗性',
    data: {
      kx: 40
    }
  },
  被怜爱的少女: {
    check: ({ artis }) => artis['被怜爱的少女'] !== 4,
    title: '队友圣遗物：[被怜爱的少女] 施放元素战技或元素爆发后，队伍中所有角色受治疗效果加成提高[healInc]%',
    data: {
      healInc: 20
    }
  },
  千岩牢固: {
    check: ({ artis }) => artis['千岩牢固'] !== 4,
    title: '队友圣遗物：[千岩牢固] 元素战技命中敌人后，使队伍中附近的所有角色攻击力提升[atkPct]%，护盾强效提升[shield]%',
    data: {
      atkPct: 20,
      shield: 30
    }
  },
  深林的记忆: {
    check: ({ artis }) => artis['深林的记忆'] !== 4,
    title: '队友圣遗物：[深林的记忆] 元素战技或元素爆发命中敌人后，使命中目标的元素抗性降低[kx]%',
    data: {
      kx: ({ element }) => element === '草' ? 30 : 0
    }
  },
  昔时之歌: {
    check: ({ artis }) => artis['昔时之歌'] !== 4,
    title: '队友圣遗物：[昔时之歌] 队伍中当前场上角色的普通攻击、重击、下落攻击、元素战技与元素爆发造成的伤害提高[aPlus]',
    data: {
      aPlus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : 1200,
      a2Plus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : 1200,
      a3Plus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : 1200,
      ePlus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : 1200,
      qPlus: ({ params }) => (params.TruceTime || 0) > 0 ? 0 : 1200
    }
  },
  烬城勇者绘卷: {
    check: ({ artis }) => artis['烬城勇者绘卷'] !== 4,
    title: '队友圣遗物：[烬城勇者绘卷] 触发元素反应时，所有元素伤害加成与物理伤害加成提升[dmg]%',
    data: {
      dmg: 40
    }
  },
  穹境示现之夜: {
    check: ({ artis }) => artis['穹境示现之夜'] !== 4,
    title: '队友圣遗物：[穹境示现之夜] 依据队伍的月辉明光效果，月曜反应造成的伤害提升[lunarBloom]%',
    data: {
      lunarCharged: ({ params }) => (params["月辉明光"] || 1) * 10,
      lunarBloom: ({ params }) => (params["月辉明光"] || 1) * 10
    }
  },
  纺月的夜歌: {
    check: ({ artis }) => artis['纺月的夜歌'] !== 4,
    title: '队友圣遗物：[纺月的夜歌] 依据队伍的月兆与月辉明光效果，元素精通提升[mastery],月曜反应造成的伤害提升[lunarBloom]%',
    data: {
      mastery: ({ params }) => Math.min(((params.Moonsign || 0) * 60), 120),
      lunarCharged: ({ params }) => (params["月辉明光"] || 1) * 10,
      lunarBloom: ({ params }) => (params["月辉明光"] || 1) * 10
    }
  },
  如雷的盛怒: false,
  平息鸣雷的尊者: false,
  染血的骑士道: false,
  流浪大地的乐团: false,
  渡过烈火的贤人: false,
  炽烈的炎之魔女: false,
  角斗士的终幕礼: false,
  逆飞的流星: false,
  冰风迷途的勇士: false,
  沉沦之心: false,
  苍白之火: false,
  绝缘之旗印: false,
  追忆之注连: false,
  华馆梦醒形骸记: false,
  海染砗磲: false,
  来歆余响: false,
  辰砂往生录: false,
  饰金之梦: false,
  乐园遗落之花: false,
  沙上楼阁史话: false,
  水仙之梦: false,
  花海甘露之光: false,
  逐影猎人: false,
  黄金剧团: false,
  回声之林夜话: false,
  谐律异想断章: false,
  未竟的遐思: false,
  黑曜秘典: false,
  长夜之誓: false,
  深廊终曲: false
}
