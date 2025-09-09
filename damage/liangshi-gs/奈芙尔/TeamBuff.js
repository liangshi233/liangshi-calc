export const TeamBuff_Nefer = [
  {
    check: ({ params }) => params.team === true && params.Nefer === true,
    title: '奈芙尔天赋：[月兆祝赐 • 千籁恩宠] 队伍中的角色触发绽放反应时，将转为触发月绽放反应，反应的基础伤害提升[fypct]',
    data: {
      fypct: 14
    }
  },
  {
    check: ({ params }) => params.team === true && params.Nefer === true,
    title: '奈芙尔4命：[眩惑入谜局之网] 处于「影舞」状态下时，还会使附近敌人的元素抗性降低[kx]%',
    cons: 4,
    data: {
      kx: ({ element }) => element === '草' ? 20 : 0
    }
  }
]
