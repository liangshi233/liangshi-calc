export const details = [{
  title: 'E后普攻一段',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: 'E后普攻尾刀',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a')
}, {
  title: 'E后普攻尾刀融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'melt')
}, {
  title: '黑金狼噬伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '黑金狼噬融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]

export const defDmgIdx = 2
export const defDmgKey = 'e'
export const mainAttr = 'atk,cpct,cdmg,mastery'



export const buffs = [{
  title: '强化斥逐拳伤害：开启E后额外提升普通[aMulti]%伤害',
  data: {
    aMulti: ({ talent }) => talent.e['强化斥逐拳伤害'] - 100
  }
},{
  passive: 1,
  title: '莱欧斯利天赋1：释放E后普生命值低于60%普攻伤害提高30%',
  data: {
    aDmg: 30
  }
},{
  passive: 2,
  title: '莱欧斯利天赋1：释放E后生命值变动提升6%攻击力，叠加5层',
  data: {
    atkPct: 30
  }
}, {
  cons: 1,
  title: '莱欧斯利1命：天赋提升的伤害进一步提升至150%',
  data: {
    aDmg: 120
  }
}, {
  cons: 2,
  title: '莱欧斯利2命：天赋每层额外提升Q伤害40%',
  data: {
    qDmg: 200
  }
}, {
  cons: 6,
  title: '莱欧斯利6命：Q暴击率提升10%暴击伤害提升80',
  data: {
    qCpct: 10,
    qCdmg: 80
  }
},'vaporize',
{title: '5.16最后修改：如有问题可联系1142607614反馈'}
]
