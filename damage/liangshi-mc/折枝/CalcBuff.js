export const CalcBuff = [
  {
    title: '折枝固有1：[挥毫] 施放共鸣技能[buff]次，攻击提升[atkPct]%',
    tree: 1,
    data: {
      buff: ({ params }) => params["共鸣技能使用次数"] || 1,
      atkPct: ({ params }) => Math.min((params["共鸣技能使用次数"] || 1), 3) * 6
    }
  },
  {
    check: ({ params }) => (params["共鸣技能使用次数"] || 1) > 3,
    title: '折枝天赋：[妙笔丹青] 施放极意·神来之笔使普攻伤害加成提升[aDmg]%',
    data: {
      aDmg: 18
    }
  },
  {
    title: '折枝1链：[骨法用笔] 施放共鸣技能时回复[_energyevery]点共鸣能量，且自身暴击提升[cpct]%',
    cons: 1,
    data: {
      _energyevery: 15,
      cpct: 10
    }
  },
  {
    title: '折枝3链：[应物象形] 施放共鸣技能[buff]次，攻击提升[atkPct]%',
    cons: 3,
    data: {
      buff: ({ params }) => params["共鸣技能使用次数"] || 1,
      atkPct: ({ params }) => Math.min((params["共鸣技能使用次数"] || 1), 3) * 15
    }
  },
  {
    check: ({ params }) => params["共鸣解放使用次数"] > 0,
    title: '折枝4链：[随类赋彩] 施放共鸣解放时，队伍中角色攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  }
]