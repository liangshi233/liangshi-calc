export const details = [{
   title: '零阶高压粉碎伤害',
   dmg: ({ talent }, dmg) => dmg(talent.e['零阶高压粉碎伤害'], 'e')
},  {
   title: '四阶高压粉碎伤害',
   dmg: ({ talent }, dmg) => dmg(talent.e['四阶高压粉碎伤害'], 'e', 'phy')
}, {
   title: 'Q展开伤害',
   dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}
]

export const defDmgIdx = 0
export const mainAttr = 'atk,cpct,cdmg,mastery'


export const buffs = [{
  title: '菲米尼天赋：触发碎冰反应高压粉碎伤害提升40%',
  data: {
    eDmg: 20
  }
}, {
  title: '菲米尼天赋：Q后普通攻击触发的高压粉碎伤害提升200%',
  data: {
    eDmg: ({ params }) => params.e ? 200 : 0 ,
  }
}, {
  title: '菲米尼1命：高压粉碎暴击率提升15%',
  cons: 1,
  data: {
    eCpct: 15
  }
}, {
  title: '菲米尼4命：触发反应攻击力每层提升9%',
  cons: 4,
  data: {
    atkPct: 18
  }
}, {
  title: '菲米尼6命：触发反应暴击伤害每层提升12%',
  cons: 6,
  data: {
    cdmg: 36
  }
},
 {title: '12.7最后修改：如有问题可联系1142607614反馈'}
]
