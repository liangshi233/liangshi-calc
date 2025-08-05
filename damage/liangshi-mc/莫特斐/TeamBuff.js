export const TeamBuff_Mortefi = [
  {
    check: ({ params }) => params.team === true && params.Mortefi === true,
    title: '莫特斐延奏：[怒意移调] 重击伤害加深[a2Dmg]%',
    data: {
      a2Dmg: 38
    }
  },
  {
    check: ({ params }) => params.team === true && params.Mortefi === true,
    title: '莫特斐6链：[盛怒的无言歌] 施放共鸣解放时，队伍中的角色攻击提升[atkPct]%',
    cons: 6,
    data: {
      atkPct: 20
    }
  }
]
