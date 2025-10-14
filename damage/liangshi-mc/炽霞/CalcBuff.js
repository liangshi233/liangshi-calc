export const CalcBuff = [
  {
    check: ({ params }) => params["轰轰"],
    title: '炽霞固有1：[灼热弹匣] 共鸣技能轰轰伤害提升[eDmg]%',
    tree: 1,
    data: {
      eDmg: 50
    }
  },
  {
    check: ({ params }) => (params["共鸣技能命中次数"] || 1) > 0,
    title: '炽霞固有2：[加麻加辣] 共鸣技能持续期间，命中[buff]次中可使攻击提升[atkPct]%',
    tree: 2,
    data: {
      buff: ({ params }) => params["共鸣技能命中次数"] || 1,
      atkPct: ({ params }) => Math.min((params["共鸣技能命中次数"] || 1), 30)
    }
  },
  {
    check: ({ params }) => params["轰轰"],
    title: '炽霞1链：[剧院的英雄戏] 施放共鸣技能轰轰时，必定暴击。',
    cons: 1,
    data: {
      eCpct: 100
    }
  },
  {
    title: '炽霞2链：[跃动的火星] 施放共鸣解放期间，击败[buff]个目标，回复[_energyevery]点共鸣能量',
    cons: 2,
    data: {
      buff: ({ params }) => (params.IntroKill || 1) + (params.OutroKill || 0) + (params.CoordinatedKill || 0) + (params.NormalKill || 1) + (params.ChargedKill || 0) + (params.PlungingKill || 0) + (params.SkillsKill || 1) + (params.BurstKill || 0),
      _energyevery: ({ params }) => Math.min(((params.IntroKill || 1) + (params.OutroKill || 0) + (params.CoordinatedKill || 0) + (params.NormalKill || 1) + (params.ChargedKill || 0) + (params.PlungingKill || 0) + (params.SkillsKill || 1) + (params.BurstKill || 0)), 4) * 5,
    }
  },
  {
    title: '炽霞3链：[不灭的火把] 目标当前生命值[buff]%，共鸣解放伤害提升[qDmg]%',
    cons: 3,
    data: {
      buff: ({ params }) => params.TargetHp || 100,
      qDmg: ({ params }) => (params.TargetHp || 100) < 50 ? 40 : 0
    }
  },
  {
    title: '炽霞5链：[胜利的枪弹焰火] 固有技能叠加至满层时，攻击额外提升[atkPct]%',
    cons: 5,
    data: {
      atkPct: 30
    }
  },
  {
    check: ({ params }) => (params["共鸣技能使用次数"] || 1) > 0,
    title: '炽霞6链：[剧终的回归彩蛋] 触发共鸣技能后，队伍中的角色普攻伤害加成提升[aDmg]%',
    cons: 6,
    data: {
      aDmg: 25
    }
  }
]