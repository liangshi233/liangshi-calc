export const TeamBuff_Zhezhi = [
  {
    check: ({ params }) => params.team === true && params.Zhezhi === true,
    title: '折枝延奏：[提白] 伤害加深[dmg]%，共鸣技能伤害加深[eDmg]%',
    data: {
      dmg: ({ element }) => element === '冷凝' ? 20 : 0,
      eDmg: 25
    }
  },
  {
    check: ({ params }) => params.team === true && params.Zhezhi === true,
    title: '折枝固有2：[点睛] 施放延奏技能后，登场角色回复[_energyevery]点共鸣能量',
    data: {
      _energyevery: 15
    }
  },
  {
    check: ({ params }) => params.team === true && params.Zhezhi === true,
    title: '折枝4链：[随类赋彩] 施放共鸣解放时，队伍中角色攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  }
]
