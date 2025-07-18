export const TeamBuff_Baizhi = [
  {
    check: ({ params }) => params.team === true && params.Baizhi === true,
    title: '白芷固有1：[泛音区间] 施放共鸣技能时生成天籁，拾取后角色攻击提升[atkPct]%',
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ params }) => params.team === true && params.Baizhi === true,
    title: '白芷6链：[闻道者的觉悟] 拾取天籁后队伍中所有角色的伤害加成提升[dmg]%',
    cons: 6,
    data: {
      dmg: 12
    }
  },
  {
    check: ({ params }) => params.team === true && params.Baizhi === true,
    title: '白芷延奏：[命源输送] 持续为下一位登场角色回复生命值，受到此治疗时角色全伤害加深[dmg]%',
    data: {
      dmg: 15
    }
  }
]
