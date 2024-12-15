import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    title: 'E后普通攻击一段',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: 'E后重击伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
  }, {
    title: '0消耗典仪式晶火',
    dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'], 'e')
  }, {
    title: '3消耗典仪式晶火',
    params: { jp: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
  }, {
    title: '4消耗典仪式晶火',
    params: { jp: 4 },
    dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
  }, {
    title: '5消耗典仪式晶火',
    params: { jp: 5 },
    dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
  }, {
    title: '6消耗典仪式晶火',
    params: { jp: 6 },
    dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
  }, {
    title: '如霰澄天的鸣礼伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: '支援炮击伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['支援炮击伤害'], 'q')
  }
]

export const defDmgIdx = 6
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    check: ({ params }) => params.jp !== undefined,
    title: '娜维娅技能：[典仪式晶火] 消耗[_count]枚弹片将使本次射击造成的伤害额外提升[eDmg]%',
    data: {
      _count: ({ params }) => params.jp,
      eDmg: ({ params }) => (params.jp - 3) * 15
    }
  }, {
    title: '娜维娅天赋：[不明流通渠道] 施放典仪式晶火后娜维娅的普通攻击、重击与下落攻击造成的伤害提升[aDmg]%',
    data: {
      aDmg: 40,
      a2Dmg: 40,
      a3Dmg: 40
    }
  }, {
    title: '娜维娅天赋：[互助关系网] 队伍中存在三位火元素/雷元素/冰元素/水元素角色,娜维娅的攻击力提升[atkPct]%',
    data: {
      atkPct: 40
    }
  }, {
    title: '娜维娅1命：[淑女的距离感守则] 施放典仪式晶火时为娜维娅恢复[_energyevery]点元素能量,并使如霰澄天的鸣礼的冷却时间减少[_qcdPlus]秒',
    cons: 1,
    data: {
      _energyevery: 6,
      _qcdPlus: 3
    }
  }, {
    check: ({ params }) => params.jp !== undefined,
    title: '娜维娅2命：[总指挥的乘胜追击] 施放典仪式晶火时消耗「裂晶弹片」使本次典仪式晶火的暴击率提升[eCpct]%',
    cons: 2,
    data: {
      eCpct: ({ params }) => Math.min(36, params.jp * 12)
    }
  }, {
    title: '娜维娅4命：[铭誓者的绝不姑息] 如霰澄天的鸣礼命中敌人时，将使该敌人的岩元素抗性降低[kx]%',
    cons: 4,
    data: {
      kx: 20
    }
  }, {
    check: ({ params }) => params.jp !== undefined,
    title: '娜维娅6命：[刺玫会长的灵活手腕] 施放典仪式晶火时，消耗[_count]枚弹片,使本次典仪式晶火的暴击伤害提升[eCdmg]%',
    cons: 6,
    data: {
      _count: ({ params }) => params.jp,
      eCdmg: ({ params }) => Math.min(135, (params.jp - 3) * 45)
    }
  },
  { title: '12.21最后修改：[11.8重置] ' }
]
