export const CalcBuff = [
  {
    check: ({ params }) => (params.IntroUse || 1) > 0,
    title: '釉瑚固有2：[珠玑] 施放变奏技能时，伤害加成提升[dmg]%',
    tree: 2,
    data: {
      dmg: 15
    }
  },
  {
    check: ({ params }) => params.Auspices_Same,
    title: '釉瑚天赋：[诗中物] 当前[buff]个吉兆相同，造成伤害提升[dmg]%',
    data: {
      buff: ({ params }) => params.Auspices_Same,
      dmg: ({ params }) => params.Auspices_Same >= 2 ? (params.Auspices_Same >= 3 ? 170 : 70) : 0
    }
  },
  {
    check: ({ params }) => params.Auspices_Same,
    title: '釉瑚2链：[堂侧酣睡] 对偶、联珠、合说对共鸣回路诗中物的伤害提升效果额外生效一次',
    cons: 2,
    data: {
      buff: ({ params }) => params.Auspices_Same,
      dmg: ({ params }) => params.Auspices_Same >= 2 ? (params.Auspices_Same >= 3 ? 170 : 70) : 0
    }
  },
  {
    title: '釉瑚3链：[火中噩魇] 攻击提升[atkPct]%',
    cons: 3,
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params }) => (params.IntroUse || 1) > 0,
    title: '釉瑚5链：[万里浅眠] 施放变奏技能时，暴击提升[cpct]%',
    cons: 5,
    data: {
      cpct: 15
    }
  },
  {
    title: '釉瑚6链：[千秋一枕] 施放[buff]次共鸣技能，暴击伤害提升[cdmg]%',
    cons: 6,
    data: {
      buff: ({ params }) => params.SkillsUse || 1,
      cdmg: ({ params }) => Math.min((params.SkillsUse || 1), 4) * 15
    }
  }
]