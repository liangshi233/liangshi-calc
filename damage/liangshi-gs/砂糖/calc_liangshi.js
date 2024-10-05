export const details = [{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '风灵作成·陆叁零捌伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: 'Q每跳基础伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}, {
  title: '为队友提升精通',
  params: { team: false },
  dmg: ({ calc, attr }) => {
    return {
      avg: calc(attr.mastery) * 0.2 + 50 + (attr.mastery.inc || 0)
    }
  }
}, {
  title: '扩散反应伤害',
  params: { team: false },
  dmg: ({}, { reaction }) => reaction('swirl')
}, {
  title: '砂珐夜班 重击伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '砂珐夜班 E伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '砂珐夜班 Q每跳',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = { team: true }

export const buffs = [
  {
    title: '砂糖天赋1：触发扩散反应时，队伍提升50精通'
  }, {
    title: '砂糖天赋2：释放QE命中敌人时，基于自身精通提升队伍[mastery]精通',
    data: {
      mastery: ({ attr, calc }) => calc(attr.mastery) * 0.2
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '千岩天空珐露珊：增加[dmg]%风元素伤害加成与[cdmg]%爆伤,降低[kx]%风元素抗性,增加[atkPct]%攻击力',
    data: {
      dmg: 38.25,
      cdmg: 40,
      kx: 30,
      atkPct: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '祈风之赐：造成的风元素伤害提升[aPlus]',
    data: {
      aPlus: 278.4,
      a2Plus: 278.4,
      a3Plus: 278.4,
      ePlus: 278.4,
      qPlus: 278.4
    }
  }, {
    check: ({ cons, params }) => params.team === true,
    title: '精1终末夜兰：获得[dmg]%增伤，增加[atkPct]%攻击力与[mastery]精通',
    data: {
      atkPct: 20,
      mastery: 100,
      dmg: 35
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
    sort: 9,
    data: {
      atkPct: 20,
      atkPlus: 1202.35
    }
  },
  { title: '6.11最后修改：如有问题请输入 #伤害计算反馈' }
]
