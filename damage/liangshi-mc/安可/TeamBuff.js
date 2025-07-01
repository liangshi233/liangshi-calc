export const TeamBuff_Encore = [
  {
    check: ({ params }) => params.team === true && params.Encore === true,
    title: '安可4链：[冒险？好有趣！] 施放重击黑咩·暴走之炎时，队伍中的角色伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: ({ element }) => element === '热熔' ? 20 : 0
    }
  }
]
