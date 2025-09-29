export const CalcBuff = [
  {
    check: ({ params }) => (params["朱蚀之刻"] || true) === true,
    title: '丹瑾技能：[朱华残章] 攻击携带朱蚀之刻的目标时，造成的伤害提升[dmg]%',
    data: {
      dmg: 20
    }
  },
  {
    title: '丹瑾固有1：[绯光] 以闪避反击·逐影触发的共鸣技能朱蚀伤害提升[_dmg]% {此项不参与计算}',
    tree: 1,
    data: {
      _dmg: 20
    }
  },
  {
    check: ({ params }) => (params["常态攻击使用次数"] || 1) >= 3,
    title: '丹瑾固有2：[盈溢] 施放共鸣技能烬灭后，重击伤害提升[a2Dmg]%',
    tree: 2,
    data: {
      a2Dmg: 30
    }
  },
  {
    check: ({ params }) => (params["朱蚀之刻"] || true) === true,
    title: '丹瑾1链：[丹心本如鉴] 攻击携带共鸣技能朱蚀之刻的目标[buff]次,受到伤害[buffC]次，自身的攻击提升[atkPct]%',
    cons: 1,
    data: {
      buff: ({ params }) => (params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0),
      buffC: ({ params }) => params["受到伤害次数"] || 1,
      atkPct: ({ params }) => Math.min((Math.max((((params["变奏技能造成伤害次数"] || 1) + (params["延奏技能造成伤害次数"] || 0) + (params["协同攻击造成伤害次数"] || 0) + (params["常态攻击造成伤害次数"] || 1) + (params["重击造成伤害次数"] || 0) + (params["空中攻击造成伤害次数"] || 0) + (params["共鸣技能造成伤害次数"] || 1) + (params["共鸣解放造成伤害次数"] || 0)) - (params["受到伤害次数"] || 1)), 0)), 6)
    }
  },
  {
    check: ({ params }) => (params["朱蚀之刻"] || true) === true,
    title: '丹瑾2链：[明镜却蒙尘] 攻击携带共鸣技能朱蚀之刻的目标时，造成的伤害额外提升[dmg]%',
    cons: 2,
    data: {
      dmg: 20
    }
  },
  {
    title: '丹瑾3链：[刹那芳华不长久] 共鸣解放伤害加成提升[qDmg]%',
    cons: 3,
    data: {
      qDmg: 30
    }
  },
  {
    check: ({ params }) => (params["彤华"] || 120) >= 60,
    title: '丹瑾4链：[孤艳难红] 【彤华】积攒60点以上时，暴击提升[cpct]%',
    cons: 4,
    data: {
      cpct: 15
    }
  },
  {
    title: '丹瑾5链：[剑扫春秋] 当前生命值[buff]%，伤害加成提升[dmg]%',
    cons: 5,
    data: {
      buff: ({ params }) => params["自身生命值"] || 100,
      dmg: ({ params }) => (params["自身生命值"] || 100) > 60 ? 15 : 30
    }
  },
  {
    title: '丹瑾6链：[绯染碧玉岂堪留] 施放重击缭乱时，队伍中的角色的攻击提升[atkPct]%',
    cons: 6,
    data: {
      atkPct: 20
    }
  }
]