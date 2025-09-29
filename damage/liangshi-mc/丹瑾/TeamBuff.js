export const TeamBuff_Danjin = [
  {
    check: ({ params }) => params.team === true && params.Danjin === true,
    title: '丹瑾延奏：[明晦] 伤害加深[dmg]%',
    data: {
      dmg: ({ element }) => element === '湮灭' ? 23 : 0
    }
  }
]