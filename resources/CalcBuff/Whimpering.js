export const WhimperingBuff = [{
  check: ({ element }) => element === '冷凝',
  title: '信物：[冷凝-锈蚀古币] 伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ element }) => element === '衍射',
  title: '信物：[衍射-锈蚀古币] 伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ element }) => element === '热熔',
  title: '信物：[热熔-锈蚀古币] 伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ element }) => element === '导电',
  title: '信物：[导电-锈蚀古币] 伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ element }) => element === '气动',
  title: '信物：[气动-锈蚀古币] 伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ element }) => element === '湮灭',
  title: '信物：[湮灭-锈蚀古币] 伤害提升[dmg]%',
  data: {
    dmg: 20
  }
}, {
  check: ({ params }) => (params.IntroUse || 1) > 0,
  title: '信物：[审判-遗落令旗] 释放变奏技能后暴击伤害提升[cdmg]%',
  data: {
    cdmg: 40
  }
}, {
  title: '信物：[布道-遗落令旗] 角色造成[buff]次普攻伤害,下次普攻伤害加深[aDmg]%',
  data: {
    buff: ({ params }) => params.NormalDmg || 1,
    aDmg: ({ params }) => Math.min((params.NormalDmg || 1), 5) * 4
  }
}, {
  title: '信物：[游猎-遗落令旗] 角色造成[buff]次伤害,下次重击伤害加深[a2Dmg]%',
  data: {
    buff: ({ params }) => (params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0),
    a2Dmg: ({ params }) => Math.min(((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)), 5) * 4
  }
}, {
  check: ({ params }) => (params.BurstUse || 0) > 0,
  title: '信物：[赦免者—船长印章] 施放共鸣解放后，普攻暴击伤害提升[aCdmg]%,共鸣技能冷却时间减少[ecdPlus]秒',
  data: {
    aCdmg: 40,
    ecdPlus: 10
  }
}, {
  check: ({ params }) => (params.SkillsUse || 1) > 0,
  title: '信物：[朝圣者—船长印章] 施放共鸣技能时，共鸣解放冷却时间降低[qCdPct]%，共鸣能量提升[_energyeveryPct]%',
  data: {
    qcdPct: 20,
    _energyeveryPct: 20
  }
}, {
  check: ({ element }) => element === "热熔",
  title: '信物：[狂欢者—船长印章] 伤害加深[dmg]%',
  data: {
    dmg: 25
  }
}, {
  check: ({ params }) => (params.IntroUse || 1) > 0,
  title: '信物：[那赞颂交融的福音] 释放变奏技能后角色暴击率提升[cpct]%,暴击伤害提升[cdmg]%',
  data: {
    cpct: 40,
    cdmg: 80
  }
}, {
  check: ({ params }) => (params.BurstUse || 0) > 0,
  title: '信物：[那前赴后继的风帆] 施放共鸣解放后，共鸣技能伤害加深[eDmg]%',
  data: {
    eDmg: 90
  }
}, {
  check: ({ params }) => params.Spectro_Frazzle_Determine === true,
  title: '信物：[那隐而不发的野心] 对目标施加光噪效应[buff]层，伤害提升[dmg]%',
  data: {
    buff: ({ params }) => params.Spectro_Frazzle || 0,
    dmg: ({ element, params }) => Math.min((params.Spectro_Frazzle || 0), 10) * (element === '衍射' ? 12.5 : 0)
  }
}, {
  title: '信物：[那侵髓蚀骨的血盟] 造成伤害[buff]次，共鸣解放伤害提升[qDmg]%',
  data: {
    buff: ({ params }) => (params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0),
    qDmg: ({ params }) => ((params.IntroDmg || 1) + (params.OutroDmg || 0) + (params.CoordinatedDmg || 0) + (params.NormalDmg || 1) + (params.ChargedDmg || 0) + (params.PlungingDmg || 0) + (params.SkillsDmg || 1) + (params.BurstDmg || 0)) >= 10 ? 120 : 0
  }
}, {
  title: '信物：[那开云散雾的狂欢] 角色处于空中时，伤害加深[dmg]%',
  data: {
    dmg: 55
  }
}, {
  title: '信物：[那亘古不息的凝视] 造成[buff]次协同攻击伤害，普通攻击伤害提升[aDmg]%',
  data: {
    buff: ({ params }) => params.CoordinatedDmg || 0,
    aDmg: ({ params }) => Math.min((params.CoordinatedDmg || 0), 10) * 12
  }
}, {
  title: '信物：[那遗落之境的召唤] 施放共鸣解放[buff]次，共鸣技能伤害提升[eDmg]%',
  data: {
    buff: ({ params }) => params.BurstUse || 0,
    eDmg: ({ params }) => Math.min((params.BurstUse || 0), 2) * 62.5
  }
}, {
  check: ({ params }) => (params.BurstUse || 0) > 0,
  title: '信物：[那涤净尘世的浪潮] 施放共鸣解放后，伤害加深[dmg]%',
  data: {
    dmg: ({ element }) => element === '衍射' ? (36 * 4) : 0
  }
}, {
  title: '信物：[那未能传达的终局] 击杀[buff]名敌人，攻击力提升[atkPct]%',
  data: {
    buff: ({ params }) => (params.IntroKill || 1) + (params.OutroKill || 0) + (params.CoordinatedKill || 0) + (params.NormalKill || 1) + (params.ChargedKill || 0) + (params.PlungingKill || 0) + (params.SkillsKill || 1) + (params.BurstKill || 0),
    dmg: ({ params }) => Math.min(((params.IntroKill || 1) + (params.OutroKill || 0) + (params.CoordinatedKill || 0) + (params.NormalKill || 1) + (params.ChargedKill || 0) + (params.PlungingKill || 0) + (params.SkillsKill || 1) + (params.BurstKill || 0)), 10) * 9
  }
}, {
  check: ({ params }) => (params.IntroUse || 1) > 0,
  title: '信物：[那孤注一掷的决意] 释放变奏技能后共鸣解放伤害加成提升[qDmg]%',
  data: {
    qDmg: 150
  }
}, {
  check: ({ params }) => params.Sky === true,
  title: '信物：[那虚荣繁饰的烙印] 角色处于空中时，伤害加深[dmg]%',
  data: {
    dmg: 80
  }
}, {
  check: ({ params }) => params.Aero_Erosion_Determine === true,
  title: '信物：[那久远彼岸的微风] 对目标施加风蚀效应[buff]层，伤害加成提升[dmg]%',
  data: {
    buff: ({ params }) => params.Aero_Erosion || 0,
    dmg: ({ element, params }) => Math.min((params.Aero_Erosion || 0), 3) * (element === '气动' ? 40 : 0)
  }
}, {
  check: ({ element }) => element === "热熔",
  title: '信物：[那无光深渊的低吟] 伤害加成提升[dmg]%',
  data: {
    dmg: 25
  }
}, {
  title: '信物：[那致敬终焉的欢歌] 重击伤害加深[a2Dmg]%，伤害加深[dmg]%',
  data: {
    a2Dmg: 50,
    dmg: ({ element }) => element === "导电" ? 50 : 0
  }
}, {
  title: '信物：[那抗衡风暴的孤帆] 释放声骸技能2.0次，伤害提升[dmg]%',
  data: {
    dmg: ({ element }) => (element === "湮灭" ? 20 : 0) * 2
  }
}, {
  title: '信物：[那沉沦迷梦的远望] 伤害加成提升[dmg]%',
  data: {
    dmg: ({ element }) => (["湮灭", "气动"].includes(element) ? 20 : 0)
  }
}, {
  title: '信物：[那撕裂命运的坠星] 焚潮状态持续时间延长至无限，焚潮状态期间造成伤害提升[dmg]%',
  data: {
    dmg: 50
  }
}, {
  title: '信物：[那奢靡优雅的归宿] 伤害加成提升[dmg]%',
  data: {
    dmg: ({ element }) => element === "热熔" ? 30 : 0
  }
}]