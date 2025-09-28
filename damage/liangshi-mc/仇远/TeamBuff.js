export const TeamBuff_Qiuyuan = [
  {
    check: ({ params }) => params.team === true && params.Qiuyuan === true,
    title: '仇远技能：[万钧一断] 施放该共鸣解放时，使附近队伍中的角色提升[cdmg]%暴击伤害',
    data: {
      cdmg: 30
    }
  },
  {
    check: ({ params }) => params.team === true && params.Qiuyuan === true,
    title: '仇远技能：[裁竹为锋] [buff]层挑灯问剑，附近队伍中的角色获得[rDmg]%%声骸技能伤害加成',
    data: {
      buff: ({ params }) => params["挑灯问剑"] || 400,
      rDmg: 30
    }
  },
  {
    check: ({ params }) => params.team === true && params.Qiuyuan === true,
    title: '仇远2链：[剑啊，谓我弃绝弦歌不辍] 附近队伍中的角色声骸技能伤害加深[rDmg]%',
    cons: 2,
    data: {
      rDmg: 30
    }
  },
  {
    check: ({ params }) => params.team === true && params.Qiuyuan === true,
    title: '仇远6链：[如是我闻、我见、我言] 队伍中角色造成的声骸技能伤害无视敌人[rKx]%抗性',
    cons: 6,
    data: {
      rKx: 10
    }
  }
]
