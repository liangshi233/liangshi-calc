export const TeamBuff_Phrolova = [
  {
    check: ({ params }) => params.team === true && params.Phrolova === true,
    title: '弗洛洛延奏：[未完成的曲目] 伤害加深[dmg]%; 重击伤害加深[a2Dmg]%',
    data: {
      dmg: ({ element }) => element === '湮灭' ? 20 : 0,
      a2Dmg: 25
    }
  }
]