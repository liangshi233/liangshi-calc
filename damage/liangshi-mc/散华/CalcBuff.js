export const CalcBuff = [
  {
    check: ({ params }) => (params["变奏技能使用次数"] || 1) > 0,
    title: '散华固有1：[凝冰] 施放变奏技能时，共鸣技能伤害提升[eDmg]%',
    tree: 1,
    data: {
      eDmg: 20
    }
  },
  {
    check: ({ params }) => (params["常态攻击使用次数"] || 1) >= 5,
    title: '散华固有2：[自然的献礼] 施放第5.0段普攻后，共鸣回路冰绽造成的伤害提升[tDmg]%',
    tree: 2,
    data: {
      tDmg: 20
    }
  },
  {
    check: ({ params }) => (params["常态攻击使用次数"] || 1) >= 5,
    title: '散华1链：[孤身孑然] 施放第5.0段普攻时，暴击提升[cpct]%',
    cons: 1,
    data: {
      cpct: 15
    }
  },
  {
    title: '散华3链：[目视异常] 目标生命值[buff]%，造成的伤害提升[dmg]%',
    cons: 3,
    data: {
      buff: ({ params }) => params.TargetHp || 100,
      dmg: ({ params }) => (params.TargetHp || 100) < 70 ? 35 : 0
    }
  },
  {
    check: ({ params }) => params["共鸣解放使用次数"] > 0,
    title: '散华4链：[剑修五蕴] 施放共鸣解放时，回复[_energyevery]点共鸣能量。并且重击爆裂伤害提升[a2Dmg]%',
    cons: 4,
    data: {
      _energyevery: 10,
      a2Dmg: 120
    }
  },
  {
    title: '散华5链：[颠覆无常] 共鸣回路冰绽的暴击伤害提升[tCdmg]%',
    cons: 5,
    data: {
      tCdmg: 100
    }
  },
  {
    title: '散华6链：[曙色天光] 引爆【冰棱】或【冰川】后，队伍中的角色攻击提升[atkPct]%',
    cons: 6,
    data: {
      atkPct: 10 * 2
    }
  }
]