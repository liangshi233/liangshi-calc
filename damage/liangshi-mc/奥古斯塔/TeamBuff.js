export const TeamBuff_Augusta = [
  {
    check: ({ params }) => params.team === true && params.Augusta === true,
    title: '奥古斯塔4链：[于荣辉中孤行] 施放变奏技能·灼金的巡行时，队伍中的角色的攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params }) => params.team === true && params.Augusta === true,
    title: '奥古斯塔延奏：[不屈的战歌] 全伤害加深[dmg]%',
    data: {
      dmg: 15
    }
  }
]
