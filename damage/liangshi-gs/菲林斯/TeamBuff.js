export const TeamBuff_Flins = [
  {
    check: ({ params }) => params.team === true && params.Flins === true && params.Lunar === true,
    title: '月兆祝赐：[旧世潜藏] 队伍中的角色触发感电反应时，将转为触发月感电反应,基础伤害提升[fypct]',
    data: {
      fypct: 14
    }
  },
  {
    check: ({ params }) => params.team === true && params.Flins === true,
    title: '菲林斯2命：[渡越魍魉之墙] 处于满辉时攻击命中敌人，该敌人的元素抗性降低[kx]%',
    cons: 2,
    data: {
      kx: ({ element, params }) => ['雷'].includes(element) ? ((params.Moonsign || 0) >= 3 ? 25: 0) : 0
    }
  },
  {
    check: ({ params }) => params.team === true && params.Flins === true && params.Lunar === true,
    title: '菲林斯6命：[歌与亡者之舞] 对敌人造成的月感电反应伤害擢升[lunarChargedEle]%',
    cons: 6,
    data: {
      lunarChargedEle: ({ params }) => (params.Moonsign || 0) >= 3 ? 10 : 0
    }
  }]
