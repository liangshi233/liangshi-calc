export const CalcBuff = [
  {
    title: '奥古斯塔技能：[不屈的战歌] [buff]层【以众愿为冕】，伤害提升[dmg]%',
    tree: 1,
    data: {
      buff: ({ params, cons }) => params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1)),
      dmg: ({ params, cons }) => (params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1))) * 15
    }
  },
  {
    title: '奥古斯塔1链：[于焦壤中蒙垢] [buff]层【以众愿为冕】，暴击伤害额外提升[cdmg]%',
    cons: 1,
    data: {
      buff: ({ params, cons }) => params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1)),
      cdmg: ({ params, cons }) => (params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1))) * 15
    }
  },
  {
    title: '奥古斯塔2链：[于血戮中涤尘] [buff]层【以众愿为冕】，暴击提升[cpct]%',
    cons: 2,
    data: {
      buff: ({ params, cons }) => params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1)),
      cpct: ({ params, cons }) => (params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1))) * 20
    }
  },
  {
    title: '奥古斯塔2链：[于血戮中涤尘] 当前[buff]暴击,提升[cdmg]%暴击伤害',
    cons: 2,
    data: {
      buff: ({ calc, attr }) => calc(attr.cpct),
      cdmg: ({ calc, attr }) => Math.max((calc(attr.cpct) - 100) * 2, 0)
    }
  },
  {
    title: '奥古斯塔3链：[于朽腐中砺骨] 重击,共鸣技能,共鸣解放的伤害倍率提升[buff]%',
    cons: 3,
    data: {
     buff: 25
    }
  },
  {
    check: ({ params }) => (params["变奏技能使用次数"] || 1) > 0,
    title: '奥古斯塔4链：[于荣辉中孤行] 施放变奏技能·灼金的巡行时，队伍中的角色的攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  },
  {
    title: '奥古斯塔5链：[于怒潮中卓立] 荣誉的加护获得护盾量提升[buff]%',
    cons: 5,
    data: {
      buff: 50
    }
  },
  {
    title: '奥古斯塔6链：[于耀光中刻名] [buff]层【以众愿为冕】，伤害提升[dmg]%',
    cons: 6,
    data: {
      buff: ({ params, cons }) => params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1)),
      dmg: ({ params, cons }) => (params["以众愿为冕"] || (cons >= 6 ? 4 : (cons >= 1 ? 2 : 1))) * 5
    }
  },
  {
    title: '奥古斯塔6链：[于耀光中刻名] 当前[buff]暴击,提升[cdmg]%暴击伤害',
    cons: 6,
    data: {
      buff: ({ calc, attr }) => calc(attr.cpct),
      cdmg: ({ calc, attr }) => Math.min((Math.max((calc(attr.cpct) - 150), 0)) * 2, 50)
    }
  }
]