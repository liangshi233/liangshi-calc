export const CalcBuff = [
  {
    check: ({ params }) => params.Bullets,
    title: '莫特斐固有1：[密接和应] 施放共鸣技能后共鸣技能的伤害提升[eDmg]%',
    tree: 1,
    data: {
      eDmg: 25
    }
  },
  {
    check: ({ params }) => (params.BurstHit || 0) > 0,
    title: '莫特斐固有2：[节奏自由] 共鸣解放加强音命中命中[buff]次，共鸣解放加强音伤害提升[qDmg]%',
    tree: 2,
    data: {
      buff: ({ params }) => Math.max(((params.BurstHit || 0) - 1), 0),
      qDmg: ({ params }) => Math.min(Math.max(((params.BurstHit || 0) - 1), 0), 50) * 1.5
    }
  },
  {
    title: '莫特斐2链：[虚伪的赞美诗] 使用声骸技能后，额外回复[_energyevery]点共鸣能量',
    cons: 2,
    data: {
      _energyevery: 10
    }
  },
  {
    check: ({ params }) => (params.BurstDmg || 0) > 1,
    title: '莫特斐3链：[预热的宣叙调] 共鸣解放持续期间，共鸣解放加强音的暴击伤害提升[qCdmg]%',
    cons: 3,
    data: {
      qCdmg: 30
    }
  },
  {
    title: '莫特斐4链：[宣泄的华尔兹] 共鸣解放持续时间延长[_qSustainedPlus]秒',
    cons: 4,
    data: {
      _qSustainedPlus: 7
    }
  },
  {
    check: ({ params }) => params.Cons5,
    title: '莫特斐5链：[葬送的四重奏] 共鸣技能命中目标时进行的协同攻击加强音伤害提升[qDmg]%',
    cons: 5,
    data: {
      qDmg: -50
    }
  },
  {
    check: ({ params }) => (params.BurstUse || 0) > 0,
    title: '莫特斐6链：[盛怒的无言歌] 施放共鸣解放时，队伍中的角色攻击提升[atkPct]%',
    cons: 6,
    data: {
      atkPct: 20
    }
  }
]