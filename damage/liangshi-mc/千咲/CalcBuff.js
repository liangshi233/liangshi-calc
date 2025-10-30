export const CalcBuff = [
  {
    title: '千咲技能：[解弦视界·万理归尘] 对拥有虚无绞痕的目标造成伤害时，可无视其[ignore]%防御。',
    data: {
      ignore: 18
    }
  },
  {
    title: '千咲技能：[解弦视界·万理归尘] [buff]点锯环残响，终结伤害提升[qPlus]',
    sort: 9,
    data: {
      buff: 100,
      qPlus: ({ talent, attr, calc, cons }) => 100 * talent.t['每点【锯环残响】增加倍率'] * calc(attr.atk) * (cons >= 5 ? 2 : 1)
    }
  },
  {
    title: '千咲技能：[即刻·归无] 锯环·疾攻、锯环·终结伤害倍率提升[buff]%锯环·疾攻消耗【锯环残响】提供的锯环·终结倍率增加效果提升[buffC]%',
    sort: 9,
    data: {
      qPlus: ({ params, attr, calc }) => params["电锯模式"] === true ? (120 / 100 * calc(attr.atk)) : 0,
      buff: ({ cons }) => (cons >= 5 ? 2 : 1) * 120,
      buffC: ({ cons }) => (cons >= 5 ? 2 : 1) * 120
    }
  },
  {
    title: '千咲固有1：[以风刻痕留蚀] 队伍中的角色击杀虚无绞痕目标时，减少共鸣技能解弦之眼冷却时间[eCd]%',
    tree: 1,
    data: {
      eCd: 100
    }
  },
  {
    title: '千咲固有2：[以风刻痕留蚀] 施放变奏技能鸣响·再临或共鸣解放即刻·归无时伤害加成提升[dmg]%，治疗加成提升[heal]%',
    tree: 2,
    data: {
      dmg: 20,
      heal: 20
    }
  },
  {
    title: '千咲1链：[穿行于荒芜长廊] 施加虚无绞痕时，攻击提升[atkPct]%',
    cons: 1,
    data: {
      atkPct: 30
    }
  },
  {
    title: '千咲2链：[织作牵绊的弦网] 造成伤害无视目标[kx]%伤害抗性，附近队伍中的角色处于虚湮之线状态时，全属性伤害加成提升[dmg]%',
    cons: 2,
    data: {
      kx: 10,
      dmg: 50
    }
  },
  {
    title: '千咲3链：[踱过长夜的迷惘] 锯环·疾攻、锯环·终结的伤害倍率提升[buff]%锯环·疾攻消耗【锯环残响】提供的锯环·终结倍率增加效果提升[buffC]%',
    sort: 9,
    cons: 3,
    data: {
      qPlus: ({ params, attr, calc }) => params["电锯模式"] === true ? (120 / 100 * calc(attr.atk)) : 0,
      buff: 120,
      buffC: 120
    }
  },
  {
    title: '千咲5链：[万盏灯火将照亮归途所向] 共鸣解放即刻·归无的伤害加成提升[_qDmg]%',
    cons: 5,
    data: {
      _qDmg: 100
    }
  },
  {
    title: '千咲6链：[由此重铸希望，与天光] 拥有虚无绞痕·终焉的目标受到异常效应伤害加深[AeroErosion]%受到伤害提升[enemydmg]%',
    cons: 6,
    data: {
      SpectroFrazzle: 30,
      AeroErosion: 30,
      ElectroFlare: 30,
      FusionBurst: 30,
      GlacioChafe: 30,
      Havoc_Bane: 30,
      enemydmg: 30
    }
  }
]