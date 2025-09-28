export const CalcBuff = [
  {
    title: '仇远固有1：[且从容] 施放答剑·弦歌不缀、答剑·割股之心、答剑·忠烈死节时伤害加深[qDmg]%',
    tree: 1,
    data: {
      qDmg: 20
    }
  },
  {
    title: '仇远固有2：[与尔同销万古愁] 消耗【金药玉馔】获得[atkPct]%攻击力',
    tree: 2,
    data: {
      atkPct: 20
    }
  },
  {
    check: ({ attr, calc }) => calc(attr.cpct) >= 50,
    title: '仇远技能：[万钧一断] 施放该共鸣解放时，使附近队伍中的角色提升[cdmg]%暴击伤害',
    sort: 9,
    data: {
      cdmg: ({ attr, calc }) => Math.min(((calc(attr.cpct) - 50) * 2), 30)
    }
  },
  {
    check: ({ params }) => (params["挑灯问剑"] || 400) >= 400,
    title: '仇远技能：[裁竹为锋] [buff]层挑灯问剑，附近队伍中的角色获得[rDmg]%%声骸技能伤害加成',
    data: {
      buff: ({ params }) => params["挑灯问剑"] || 400,
      rDmg: 30
    }
  },
  {
    title: '仇远1链：[如剑不动，相由心生] 暴击率提升[cpct]%',
    cons: 1,
    data: {
      cpct: 15
    }
  },
  {
    title: '仇远2链：[剑啊，谓我弃绝弦歌不辍] 附近队伍中的角色声骸技能伤害加深[rDmg]%',
    cons: 2,
    data: {
      rDmg: 30
    }
  },
  {
    title: '仇远3链：[十问之思] 攻击力提升[atkPct]%',
    cons: 3,
    data: {
      atkPct: 20
    }
  },
  {
    title: '仇远4链：[剑啊，谓我弃绝忠烈死节] 万钧一断伤害倍率增加[buff]%',
    cons: 4,
    data: {
      buff: 600
    }
  },
  {
    title: '仇远5链：[剑啊，如今我弹铗而歌] 获得[qDmg]%无视怪物防御',
    cons: 5,
    data: {
      qDmg: 20
    }
  },
  {
    title: '仇远6链：[如是我闻、我见、我言] 队伍中角色造成的声骸技能伤害无视敌人[rKx]%抗性',
    cons: 6,
    data: {
      rKx: 10
    }
  }
]