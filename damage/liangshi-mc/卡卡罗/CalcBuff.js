export const CalcBuff = [
  {
    check: ({ params }) => (params["重击使用次数"] || 0) > 0,
    title: '卡卡罗固有1：[喋血觉悟] 施放重击「仁慈」时，共鸣解放伤害加成提升[qDmg]%',
    tree: 1,
    data: {
      qDmg: 10
    }
  },
  {
    check: ({ params }) => (params["重击使用次数"] || 0) > 0,
    title: '卡卡罗固有2：[无暇赴死] 重击「死告」命中目标时，受到伤害降低[_reduction]%',
    tree: 2,
    data: {
      _reduction: 10
    }
  },
  {
    check: ({ params }) => (params["共鸣技能命中次数"] || 1) > 0,
    title: '卡卡罗1链：[隐秘谈判] 共鸣技能灭杀指令命中目标时，额外回复[_energyevery]点共鸣能量',
    cons: 1,
    data: {
      _energyevery: 10
    }
  },
  {
    check: ({ params }) => (params["变奏技能使用次数"] || 1) > 0,
    title: '卡卡罗2链：[零和博弈] 施放变奏技能后，共鸣技能伤害加成提升[eDmg]%',
    cons: 2,
    data: {
      eDmg: 30
    }
  },
  {
    check: ({ params }) => params.Deathblade_Gear === true,
    title: '卡卡罗3链：[铁腕外交] 共鸣解放状态持续期间伤害加成提升[dmg]%',
    cons: 3,
    data: {
     dmg: 25
    }
  },
  {
    title: '卡卡罗4链：[集群威胁] 施放延奏技能时伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: 20
    }
  },
  {
    title: '卡卡罗5链：[替代协议] 变奏技能伤害提升[lDmg]%',
    cons: 5,
    data: {
      lDmg: 50
    }
  }
]