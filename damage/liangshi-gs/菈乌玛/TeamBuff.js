export const TeamBuff_Lauma = [
  {
    check: ({ params }) => params.team === true && params.Lauma === true,
    title: '菈乌玛天赋：[月兆祝赐 • 千籁恩宠] 队伍中的角色触发绽放反应时，将转为触发月绽放反应，反应的基础伤害提升[fypct]',
    data: {
      fypct: 14
    }
  },
  {
    check: ({ params }) => params.team === true && params.Lauma === true,
    title: '菈乌玛天赋：[奉向霜夜的明光] 队伍中的角色触发的绽放、超绽放、烈绽放反应造成的伤害能够造成暴击，暴击率固定为[_bloomCpct]%，暴击伤害固定为[_bloomCdmg]%，处于满辉时月绽放反应暴击率提升[cpct]%,暴击伤害提升[cdmg]%',
    data: {
      _bloomCpct: ({ params }) => (params.Moonsign || 0) === 0 ? 0 : (3 - Math.min((params.Moonsign || 0), 3) * 7.5),
      _bloomCdmg: ({ params }) => (params.Moonsign || 0) === 0 ? 0 : (3 - Math.min((params.Moonsign || 0), 3) * 100),
      cpct: ({ params }) => Math.max((Math.min((params.Moonsign || 0), 3) - 1), 0) * (params.lunarBloom === true ? 5 : 0),
      cdmg: ({ params }) => Math.max((Math.min((params.Moonsign || 0), 3) - 1), 0) * (params.lunarBloom === true ? 10 : 0)
    }
  },
  {
    check: ({ params }) => params.team === true && params.Lauma === true,
    title: '菈乌玛技能：[圣言述咏 • 终宵永眠] 队伍中的角色造成绽放、超绽放、烈绽放、月绽放反应伤害时，提升造成的伤害[fybase]',
    data: {
      fybase: ({ params }) =>params.Lunar === true ? 6912 : 3456
    }
  },
  {
    check: ({ params }) => params.team === true && params.Lauma === true,
    title: '菈乌玛技能：[圣言述咏 • 众心为月] 元素战技命中敌人时该敌人的抗性降低[kx]%',
    data: {
      kx: ({ element }) => ['水', '草'].includes(element) ? 25 : 0
    }
  },
  {
    check: ({ params }) => params.team === true && params.Lauma === true,
    title: '菈乌玛2命：[「纺出那终北的告诫与述说」] 队伍中的角色触发绽放、超绽放、烈绽放、月绽放反应时造成的伤害额外提升[fybase],处于满辉时月绽放反应伤害提升[lunarBloom]%',
    cons: 2,
    data: {
      fybase: ({ params }) => params.Lunar === true ? 11250 : 7500,
      lunarBloom: ({ params }) => ((params.Moonsign || 0) >= 3 ? 40 : 0)
    }
  },
  {
    check: ({ params }) => params.team === true && params.Lauma === true,
    title: '菈乌玛6命：[「我愿将这血与泪奉予月明」] 处于满辉时月绽放反应伤害擢升[lunarBloomEle]%',
    cons: 6,
    data: {
      lunarBloomEle: ({ params }) => ((params.Moonsign || 0) >= 3 ? 25 : 0)
    }
  }
]
