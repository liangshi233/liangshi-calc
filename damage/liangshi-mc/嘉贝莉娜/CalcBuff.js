export const CalcBuff = [
  {
    check: ({ params }) => params["恶魔位格"],
    title: '嘉贝莉娜技能：[炼净] 恶魔位格期间，普攻·炽天猎杀、重击·炼羽裁决、空中攻击·火狱暴雨、闪避反击·罪业当涤的倍率提升[buff]%',
    data: {
      buff: 85
    }
  },
  {
    title: '嘉贝莉娜技能：[超阈限] 施放变奏技能、地狱穿行、普攻·炽天猎杀第4段、共鸣技能·迫近、共鸣技能·恶翼扬升、共鸣技能·掠袭时，攻击力提升[atkPct]%',
    data: {
      atkPct: ({ cons }) => (cons >= 2 ? 3.5 : 1) * 20
    }
  },
  {
    title: '嘉贝莉娜固有1：[誓猎] 命中目标[buff]次，伤害加成提升[dmg]%',
    tree: 1,
    data: {
      buff: ({ params }) => (params["变奏技能命中次数"] || 1) + (params["延奏技能命中次数"] || 0) + (params["协同攻击命中次数"] || 0) + (params["常态攻击命中次数"] || 1) + (params["重击命中次数"] || 0) + (params["空中攻击命中次数"] || 0) + (params["共鸣技能命中次数"] || 1) + (params["共鸣解放命中次数"] || 0),
      dmg: ({ params }) => Math.min(((params["变奏技能命中次数"] || 1) + (params["延奏技能命中次数"] || 0) + (params["协同攻击命中次数"] || 0) + (params["常态攻击命中次数"] || 1) + (params["重击命中次数"] || 0) + (params["空中攻击命中次数"] || 0) + (params["共鸣技能命中次数"] || 1) + (params["共鸣解放命中次数"] || 0)), 5) * 5
    }
  },
  {
    title: '嘉贝莉娜固有2：[食罪] 施放普攻第4段，普攻·炽天猎杀第5段，重击·燧发杀戮第3段，重击·炼羽裁决第3段时，回复[_stamina]点耐力。',
    tree: 2,
    data: {
      _stamina: 10
    }
  },
  {
    check: ({ params }) => params["恶魔位格"],
    title: '嘉贝莉娜1链：[不熄抵牾抗争之心] [buff]点余火，普攻、重击、空中攻击、共鸣技能、闪避反击暴击伤害提升[cdmg]%',
    cons: 1,
    data: {
      buff: ({ params }) => params["余火"] || 40,
      cdmg: ({ params }) => Math.min(((params["余火"] || 40) * 3), 120)
    }
  },
  {
    title: '嘉贝莉娜2链：[行过烈狱与幽暗冥途] 内燃烧提供的攻击力加成提升[_atkPct]%',
    cons: 2,
    data: {
      _atkPct: 250
    }
  },
  {
    title: '嘉贝莉娜3链：[再燃血狩死猎之誓] 共鸣解放倍率提升[_qDmg]%',
    cons: 3,
    data: {
      _qDmg: 120
    }
  },
  {
    title: '嘉贝莉娜4链：[承负无薪孤惧苦火] 队伍中的角色施放声骸技能时，使队伍中所有角色全属性伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: 20
    }
  },
  {
    title: '嘉贝莉娜5链：[纵使光明远去，厄难焚身] 共鸣技能倍率提升[buff]%',
    cons: 5,
    data: {
      buff: 150
    }
  },
  {
    check: ({ params }) => params["恶魔位格"],
    title: '嘉贝莉娜6链：[我仍炽耀不移，自有永有] [buff]点余火，提升[dmg]%伤害加深',
    cons: 6,
    data: {
      buff: ({ params }) => params["余火"] || 40,
      dmg: ({ params }) => Math.min(((params["余火"] || 40) * 0.625), 25)
    }
  }
]