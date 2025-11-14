export const CalcBuff = [
  {
    title: '卜灵固有1：[吉时已至，厄运退散] 当前生命值[buff]%，治疗效果加成提升[heal]%',
    tree: 1,
    data: {
      buff: ({ params }) => params["自身生命值"] || 100,
      heal: ({ params }) => (params["自身生命值"] || 100 >= 50) ? 0 : 25
    }
  },
  {
    title: '卜灵天赋：[雷炁化生] 队伍中登场的角色共鸣技能伤害加成提升[eDmg]%',
    data: {
      eDmg: 10
    }
  },
  {
    check: ({ params }) => params["飞雷诀·归一"] === true,
    title: '卜灵1链：[百般法宝，借物打力] 施放共鸣解放归一时，暴击提升[cpct]%',
    cons: 1,
    data: {
      cpct: 20
    }
  },
  {
    title: '卜灵2链：[符法通玄，神鬼咸听] 进入【阴阳相生】状态时，回复[_energyevery]点共鸣能量',
    cons: 2,
    data: {
      _energyevery: 25
    }
  },
  {
    title: '卜灵6链：[“天地混元雷符水帖天尊”] 【雷法·三才合一】状态持续期间队伍中登场的角色获得的共鸣技能伤害加成效果提升[_eDmg]%',
    cons: 6,
    data: {
      _eDmg: 55
    }
  }
]