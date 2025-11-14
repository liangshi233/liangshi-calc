export const TeamBuff_Calcharo = [
  {
    check: ({ params }) => params.team === true && params.Calcharo === true,
    title: '卜灵天赋：[雷炁化生] 【雷法·三才合一】状态持续期间，使队伍中登场的角色共鸣技能伤害加成提升[eDmg]%',
    data: {
      eDmg: 30
    }
  },
  {
    check: ({ params }) => params.team === true && params.Calcharo === true,
    title: '卜灵6链：[“天地混元雷符水帖天尊”] 【雷法·三才合一】状态持续期间队伍中登场的角色获得的共鸣技能伤害加成效果额外提升[_eDmg]%',
    cons: 6,
    data: {
      _eDmg: 25
    }
  }
]
