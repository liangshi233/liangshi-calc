export const CalcBuff = [
  {
    check: ({ params }) => params["深潜星域"] === true || params["解限星域"] === true,
    title: '守岸人技能：[终末回环] 深潜星域内角色暴击提升[cpct]%解限星域内角色暴击伤害提升[cdmg]%',
    sort: 10,
    data: {
      cpct: ({ attr, calc }) => Math.min((calc(attr.recharge.base + attr.recharge.plus) * 0.01 / 0.2), 12.5),
      cdmg: ({ params, attr, calc }) => params["解限星域"] === true ? Math.min((calc(attr.recharge.base + attr.recharge.plus) * 0.01 / 0.1), 25) : 0
    }
  },
  {
    check: ({ params }) => params["浅析星域"] === true,
    title: '守岸人固有2：[自我引力] 角色处于星域生效范围内时共鸣效率提升[recharge]%',
    tree: 2,
    data: {
      recharge: 10
    }
  },
  {
    check: ({ params }) => params["浅析星域"] === true,
    title: '守岸人1链：[不语者假想] 共鸣解放终末回环展开的星域治疗和增益效果生效范围增加150.0%,持续时间增加[_qSustainedPlus]秒',
    cons: 1,
    data: {
      _qSustainedPlus: 10
    }
  },
  {
    check: ({ params }) => params["浅析星域"] === true,
    title: '守岸人2链：[夜幕的赠予与拒绝] 浅析星域附近队伍中的角色攻击提升[atkPct]%',
    cons: 2,
    data: {
      atkPct: 40
    }
  },
  {
    check: ({ params }) => params["浅析星域"] === true,
    title: '守岸人3链：[无限正将我等待] 施放共鸣解放终末回环时回复[_concerto]点协奏能量',
    cons: 3,
    data: {
      _concerto: 20
    }
  },
  {
    check: ({ params }) => params["混沌理论"] === true,
    title: '守岸人4链：[万物寂静满溢] 施放共鸣技能时治疗效果加成提升[heal]%',
    cons: 4,
    data: {
      heal: 70
    }
  },
  {
    check: ({ params }) => params["浅析星域"] === true,
    title: '守岸人6链：[我所驶向的新世界] 洞悉伤害倍率提升[buff]%,暴击伤害提升[lCdmg]%',
    cons: 6,
    data: {
      buff: 42,
      lCdmg: 500
    }
  }
]