export const CalcBuff = [
  {
    title: '白芷固有1：[泛音区间] 施放共鸣技能时生成天籁，拾取后角色攻击提升[atkPct]%',
    tree: 1,
    data: {
      atkPct: 20
    }
  },
  {
    title: '白芷1链：[极简与繁复] 施放共鸣技能时消耗[buff]点念意，额外回复[_energyevery]点共鸣能量',
    cons: 1,
    data: {
      buff: ({ params }) => params.Concentration || 4,
      _energyevery: ({ params }) => (params.Concentration || 4) * 2.5
    }
  },
  {
    check: ({ params }) => (params.Concentration || 4) >= 4,
    title: '白芷2链：[极简与繁复] 施放共鸣技能时有4.0点念意，伤害加成提升[dmg]%，治疗效果加成提升[heal]%',
    cons: 2,
    data: {
      dmg: 15,
      heal: 15
    }
  },
  {
    check: ({ params }) => (params["变奏技能使用次数"] || 1) > 0,
    title: '白芷3链：[真理的崇奉] 施放变奏技能时，生命上限提升[hpPct]%',
    cons: 3,
    data: {
      hpPct: 12
    }
  },
  {
    check: ({ params }) => params["共鸣解放使用次数"] > 0,
    title: '白芷4链：[被追溯的本源] 施放共鸣解放时，治疗倍率提升[_healPct]%,额外造成[qPlus]基础伤害值',
    cons: 4,
    data: {
      _healPct: 20,
      qPlus: ({ attr, calc }) => calc(attr.hp) * 1.2 / 100
    }
  },
  {
    title: '白芷6链：[闻道者的觉悟] 拾取天籁后队伍中所有角色的伤害加成提升[dmg]%',
    cons: 6,
    data: {
      dmg: 12
    }
  }
]