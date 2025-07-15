export const TeamBuff_Changli = [
  {
    check: ({ params }) => params.team === true && params.Changli === true,
    title: '长离延奏：[奇正相生] 下一位登场角色伤害加深[dmg]%，共鸣解放伤害加深[qDmg]%',
    data: {
      dmg: ({ element }) => element === '热熔' ? 20 : 0,
      qDmg: 25
    }
  },
  {
    check: ({ params }) => params.team === true && params.Changli === true,
    title: '长离4链：[饰我所言] 施放变奏技能后，队伍中的角色攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  }
]
