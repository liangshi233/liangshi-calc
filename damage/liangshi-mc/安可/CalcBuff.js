export const CalcBuff = [
  {
    title: '安可固有1：[生气的黑咩] 当前生命值[buff]%,共鸣解放期间伤害提升[dmg]%',
    tree: 1,
    data: {
      buff: ({ params }) => params.OwnHp || 100,
      dmg: ({ params }) => (params.OwnHp || 100) >= 70 ? 10 : 0
    }
  },
  {
    check: ({ params }) => (params.SkillsUse || 1) > 0,
    title: '安可固有2：[咩咩加油歌] 施放共鸣技能时, 伤害加成提升[dmg]%',
    tree: 2,
    data: {
      dmg: 20
    }
  },
  {
    title: '安可1链：[羊咩的童话书] 普攻命中目标[buff]次，伤害加成额外提升[dmg]%',
    cons: 1,
    data: {
      buff: ({ params }) => params.NormalHit || 1,
      dmg: ({ params }) => Math.min((params.NormalHit || 1), 4) * 3
    }
  },
  {
    title: '安可2链：[数羊安眠曲] 施放普攻或共鸣技能时，额外回复[_energyevery]点共鸣能量',
    cons: 2,
    data: {
      _energyevery: 1
    }
  },
  {
    check: ({ params }) => (params.ChargedUse || 1) > 0 && (params.Mayhem || 0) >= 100,
    title: '安可3链：[迷雾？黑海岸！] 重击伤害倍率提升[buff]%',
    cons: 3,
    data: {
      buff: 40,
      a2Plus: ({ attr, calc }) => calc(attr.atk) * 40 / 100
    }
  },
  {
    title: '安可4链：[冒险？好有趣！] 施放重击黑咩·暴走之炎时，队伍中的角色伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: 20
    }
  },
  {
    title: '安可5链：[聚光灯，勇士登场！] 共鸣技能伤害加成提升[eDmg]%',
    cons: 5,
    data: {
      eDmg: 35
    }
  },
  {
    check: ({ params }) => params.Cosmos_Rave === true,
    title: '安可6链：[羊咩，拯救世界！] 共鸣解放黑咩大暴走期间，造成[buff]次伤害使攻击提升[atkPct]%',
    cons: 6,
    data: {
      buff: 1,
      atkPct: 5
    }
  }
]