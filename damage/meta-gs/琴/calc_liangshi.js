export const details = [{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},{
  title: '风压剑伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '出入领域伤害',
  params: { q: true , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['出入领域伤害'], 'q')
}, {
  title: '蒲公英之风爆发伤害',
  params: { q: true , team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
}, {
  title: '蒲公英之风爆发治疗',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.q['领域发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['领域发动治疗量2'][1] * 1)
}, {
  title: '蒲公英之风每跳治疗',
  params: { team: false },
  dmg: ({ talent, calc, attr }, { heal }) =>
    heal(talent.q['持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗2'][1] * 1)
}, {
  title: '扩散反应伤害',
  params: { team: false },
  dmg: ({}, { reaction }) => reaction('swirl')
},{
  title: '琴珐丽行 长按E伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '琴珐丽行 Q爆发伤害',
  params: { q: true , team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
}]

export const defParams = { soda: 1 , team: true}
export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 4
export const enemyName = '魔偶/女士/雷神'

export const buffs = [{
  cons: 1,
  title: '琴1命：长按1秒后风压剑伤害提升40%',
  data: {
    eDmg: 40
  }
}, {
  cons: 4,
  title: '琴4命：蒲公英之风的领域内敌人风元素抗性降低40%',
  data: {
    kx: ({ params }) => params.q ? 40 : 0
  }
}, {
  check: ({ params }) => params.team === true,
  title: '讨龙宗室丽莎：增加[atkPct]%攻击力降低敌人15%防御力',
  data: {
    atkPct: 68,
    enemyDef: 15
  }
}, {
    check: ({ params }) => params.team === true,
    title: '千岩天空珐露珊：增加[dmg]%风元素伤害加成与[cdmg]%爆伤,降低[kx]%风元素抗性,增加[atkPct]%攻击力',
    data: {
      dmg: 38.25,
      cdmg: 40,
	  kx:30,
	  atkPct: 20,
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '祈风之赐：造成的风元素伤害提升[ePlus]',
    data: {
	ePlus: 278.4 ,
	qPlus: 278.4 
    }
  },
   {title: '12.4最后修改：如有问题可联系1142607614反馈'}
  ]
