export const CalcBuff = [
  {
    title: '维里奈固有1：[自然的献礼] 施放重击星星花绽放、空中攻击星星花绽放、共鸣解放草木生长或延奏技能盛放时, 攻击提升[atkPct]%',
    tree: 1,
    data: {
      atkPct: 20
    }
  },
  {
    title: '维里奈2链：[抽叶的思考] 施放共鸣技能扩繁试验时，额外获得[_concerto]点协奏能量',
    cons: 2,
    data: {
      _concerto: 10
    }
  },
  {
    check: ({ params }) => params.Photosynthesis_Mark === true,
    title: '维里奈3链：[生长的选择] 共鸣解放光合标记的治疗效果加成提升[heal]%',
    cons: 3,
    data: {
      heal: 12
    }
  },
  {
    title: '维里奈4链：[盛放的拥抱] 施放重击星星花绽放、空中攻击星星花绽放、共鸣解放草木生长或延奏技能盛放时，伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: 15
    }
  },
  {
    title: '维里奈5链：[盛放的拥抱] 角色生命值[buff]%，治疗效果加成提升[heal]%',
    cons: 5,
    data: {
      buff: ({ params }) => params["自身生命值"] || 100,
      heal: ({ params }) => (params["自身生命值"] || 100) < 50 ? 20 : 0
    }
  },
  {
    check: ({ params }) => params.Photosynthesis_Energy > 0,
    title: '维里奈6链：[丰收的喜悦] 重击星星花绽放及空中攻击星星花绽放的伤害提升[a2Dmg]%',
    cons: 6,
    data: {
      a2Dmg: 20,
      a3Dmg: 20
    }
  }
]