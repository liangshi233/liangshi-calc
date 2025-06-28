export const CalcBuff = [
  {
    check: ({ params }) => params.Scarlet_Coda === true,
    title: '弗洛洛技能：[生与死的乐章] [buff]层余音可使本次伤害倍率额外增加[buffC]%',
    data: {
      buff: ({ params }) => params.Lingering_Note || 24,
      buffC: ({ params, talent }) => Math.min((params.Lingering_Note || 24), 24) * talent.e['每层余音增加倍率'],
      ePlus: ({ params, talent, attr, calc }) => Math.min((params.Lingering_Note || 24), 24) * talent.e['每层余音增加倍率'] * calc(attr.atk) / 100
    }
  },
  {
    title: '弗洛洛固有1：[变音符] 施放声骸技能时，抗打断能力提升，受到伤害降低[_reduction]%',
    tree: 1,
    data: {
      _reduction: 30
    }
  },
  {
    title: '弗洛洛固有2：[八重奏] 拥有[buff]%层余音，暴击提升[cpct]%,暴击伤害提升[cdmg]%',
    tree: 2,
    data: {
      buff: ({ params }) => params.Lingering_Note || 24,
      cpct: ({ params }) => Math.min((params.Lingering_Note || 24), 24) * 2.5,
      cdmg: ({ params }) => Math.min(Math.max(((params.Lingering_Note || 24) - 24), 0), 100)
    }
  },
  {
    title: '弗洛洛1链：[钥匙，通往冥界的奥秘] 亡与死的乐章伤害倍率提升[buff]%。永不消逝的梦呓伤害倍率提升[buffC]%',
    cons: 1,
    data: {
      buff: 80,
      buffC: 80
    }
  },
  {
    check: ({ params }) => params.Scarlet_Coda === true,
    title: '弗洛洛2链：[绳索，重生更新的纽带] 谱曲终末伤害倍率提升[buff]%,余音对谱曲终末的倍率增加效果提升[buffC]%',
    cons: 2,
    data: {
      buff: 75,
      buffC: 75,
      ePlus: ({ params, talent, attr, calc }) => Math.min((params.Lingering_Note || 24), 24) * talent.e['每层余音增加倍率'] * calc(attr.atk) / 100 * 75 / 100
    }
  },
  {
    title: '弗洛洛3链：[匕首，消弭妄想的力量] 声骸伤害加深[rDmg]%,永生组歌伤害倍率提升[buff]%',
    cons: 3,
    data: {
      rDmg: 60,
      buff: 80
    }
  },
  {
    title: '弗洛洛4链：[火炬，新径启行的引导] 施放声骸技能后，队伍中的角色攻击提升[atkPct]%',
    cons: 4,
    data: {
      atkPct: 20
    }
  },
  {
    title: '弗洛洛5链：[岔路，穿越生命的要地] 处于指挥状态时，受到伤害降低[_reduction]%',
    cons: 5,
    data: {
      _reduction: 30
    }
  },
  {
    title: '弗洛洛6链：[深夜，走出安息与终结] 拥有[buff]层余音，强化攻击赫卡忒[buffC]%伤害倍率;处于指挥状态登场时赫卡忒普攻攻击伤害倍率提升[buffD]%目标受到赫卡忒的伤害提升[enemyDef]%',
    cons: 6,
    data: {
      buff: ({ params }) => params.Lingering_Note || 24,
      buffC: ({ params }) => Math.min((params.Lingering_Note || 24), 24),
      buffD: ({ params }) => !params.TruceTime ? 300 : 0,
      enemyDef: ({ params }) => !params.TruceTime ? (params.Maestro_State === true ? 40 : 0) : 0
    }
  }
]