export const CalcBuff = [
  {
    title: '珂莱塔天赋：[艺间巡礼] 【灵萃】达到上限时，共鸣解放新浪潮时代、共鸣解放死兆、共鸣解放致死以终的伤害倍率提升[_ePlus]%',
    data: {
      _ePlus: 80
    }
  },
  {
    title: '珂莱塔技能：[新浪潮时代] 攻击携带解离效果的目标，造成伤害时忽视目标[ignore]%防御。',
    data: {
      ignore: 18
    }
  },
  {
    title: '珂莱塔1链：[美或死，璀璨即凋零] 对拥有解离效果的目标攻击造成伤害时，该次伤害的暴击提升[cdmg]%',
    cons: 1,
    data: {
      cdmg: 12.5
    }
  },
  {
    title: '珂莱塔2链：[寂与亡，衰败亦新生] 共鸣解放致死以终的伤害倍率提升[_ePlus]%',
    cons: 2,
    data: {
      _ePlus: 126
    }
  },
  {
    title: '珂莱塔3链：[切步、向前，此为优雅的进行式] 共鸣技能暴力美学、共鸣技能示我璀璨的伤害倍率提升[_ePlus]%',
    cons: 3,
    data: {
      _ePlus: 93
    }
  },
  {
    title: '珂莱塔4链：[以旧雨，为颂赞的苦酒] 施放重击、重击限制性策略、重击末路见行[buff]次，队伍中的角色共鸣技能伤害加成提升[eDmg]%',
    cons: 4,
    data: {
      buff: ({ params }) => params.ChargedUse || 0,
      eDmg: ({ params }) => (params.ChargedUse || 0) > 0 ? 25 : 0
    }
  },
  {
    title: '珂莱塔5链：[敬昨夜、今日和彼时彼刻] 重击末路见行的伤害倍率提升[_ePlus]%',
    cons: 5,
    data: {
      _ePlus: 47
    }
  },
  {
    title: '珂莱塔6链：[我依然故我，于终幕之上] 共鸣解放死兆的射击造成更高的伤害，并且生成的晶体数量翻倍，二者总计使共鸣解放死兆伤害倍率提升[_ePlus]%',
    cons: 6,
    data: {
      _ePlus: 186.6
    }
  }
]