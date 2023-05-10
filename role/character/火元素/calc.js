export const details = [{
  title: '火燎剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '火燎剑蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
}, {
  title: '火燎剑融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
}, {
  title: 'E基础伤害提升值',
  params: {team:false},
  dmg: ({ talent, calc, attr }) => {
    return {
      avg: talent.e['伤害值提升'] * calc(attr.hp) / 100
    }
  }
}, {
  title: '烈焰焚尽爆发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '烈焰焚尽爆发蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}, {
  title: '烈焰焚尽爆发融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
  title: '烈焰焚尽持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}, {
  title: '烈焰焚尽持续蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q', 'vaporize')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '旅行者天赋：E提升火伤害[ePlus]',
  data: {
    aPlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.hp) / 100,
    a2Plus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.hp) / 100,	  	  
    ePlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.hp) / 100,
    qPlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.hp) / 100,
  }
}]
