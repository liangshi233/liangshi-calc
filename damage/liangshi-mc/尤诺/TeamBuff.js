export const TeamBuff_Luno = [
  {
    check: ({ params }) => params.team === true && params.Luno === true,
    title: '尤诺天赋：[于盈亏间涨落] 处于满月领域中获得护盾[buff]次, 全伤害加深[dmg]%',
    data: {
      buff: ({ params }) => params["获得护盾次数"] || 0,
      dmg: ({ params }) => Math.min((params["获得护盾次数"] || 0), 10) * 4
    }
  },
  {
    check: ({ params }) => params.team === true && params.Luno === true,
    title: '尤诺2链：[昼或夜，且以它为永恒] 处于满月领域中获得护盾[buff]次，获得[dmg]%全伤害加深',
    cons: 4,
    data: {
      buff: ({ params }) => params["获得护盾次数"] || 0,
      dmg: ({ params }) => Math.min((params["获得护盾次数"] || 0), 10) >= 10 ? 40 : 0
    }
  }
]
