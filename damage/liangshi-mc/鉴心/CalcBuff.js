export const CalcBuff = [
  {
    check: ({ params }) => (params["重击使用次数"] || 0) > 0,
    title: '鉴心固有1：[形释无极] 共鸣解放伤害提升[qDmg]%',
    tree: 1,
    data: {
      qDmg: 20
    }
  },
  {
    check: ({ params }) => (params["重击使用次数"] || 0) > 0,
    title: '鉴心固有2：[覆映吾身] 重击获得的护盾量提升[shield]%',
    tree: 2,
    data: {
      shield: 20
    }
  },
  {
    title: '鉴心2链：[道者稚徒] 共鸣技能的使用次数额外增加[_eIncreases]%',
    cons: 2,
    data: {
      _eIncreases: 1
    }
  },
  {
    title: '鉴心4链：[十问之思] 施放重击·混元气旋时，共鸣解放伤害提升[qDmg]%',
    cons: 4,
    data: {
      qDmg: 80
    }
  }
]