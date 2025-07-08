export const TeamBuff_Sanhua = [
  {
    check: ({ params }) => params.team === true && params.Sanhua === true,
    title: '散华延奏：[凛絜] 普攻伤害加深[aDmg]%',
    data: {
      aDmg: 38
    }
  },
  {
    check: ({ params }) => params.team === true && params.Sanhua === true,
    title: '散华6链：[曙色天光] 引爆【冰棱】或【冰川】后，队伍中的角色攻击提升[atkPct]%',
    cons: 6,
    data: {
      atkPct: 10 * 2
    }
  }
]
