export const details = [{
  title: '冰锥剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '冰锥剑融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},{
  title: '冰锥破碎伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['冰锥碎裂伤害'], 'e')
},{
  title: '冰锥破碎融化',
  dmgKey: 'e',
  check: ({ cons }) => cons < 2,
  dmg: ({ talent }, dmg) => dmg(talent.e['冰锥碎裂伤害'], 'e', 'melt')
},{
  title: '火元素摧毁冰锥融化',
  cons: 2,
  dmgKey: 'e',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['冰锥碎裂伤害'], 'e', 'melt')
}, {
  title: 'Q后冰爆伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['冰爆伤害'], 'e')
}, {
  title: '冰封咒碑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害伤害'], 'q')
}, {
  title: '冰封咒碑融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害伤害'], 'q', 'melt')
}, {
  title: '冰碑破碎伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['冰碑破碎伤害'], 'q')
}, {
  title: '冰碑破碎融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['冰碑破碎伤害'], 'q', 'melt')
}]


export const mainAttr = 'atk,cpct,cdmg,mastery'
export const defDmgKey = 'e'

export const buffs = [{
  title: '旅行者1命：冰元素抗性降低15%',
  cons: 1,
  data: {
    kx: 15
  }
}, {
  title: '旅行者2命：通过火元素摧毁冰锥伤害提高250%',
  cons: 2,
  data: {
    eDmg: ({ params }) => params.e ? 250 : 0
  }
},{
  title: '旅行者4命：防御力降低12%',
  cons: 4,
  data: {
    enemyDef: 12
  }
},{
  title: '冰封咒碑：开启Q后额外提升e[eMulti]%伤害',
  data: {
    eMulti: ({ talent }) => talent.e['冰爆伤害提高'] - 100
  }
},{
  title: '冰封咒碑：受到伤害提升Q伤害[qPlus]',
  data: {
    qPlus: ({ talent, calc, attr }) => 150 * calc(attr.hp) / 100,
  }
}]
