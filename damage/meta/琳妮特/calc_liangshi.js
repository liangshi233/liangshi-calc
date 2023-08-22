export const details = [{
   title: '谜影突刺伤害',
     dmg: ({ talent }, dmg) => dmg(talent.e['谜影突刺伤害'], 'e')
},  {
   title: '流涌之刃伤害',
     dmg: ({ talent }, dmg) => dmg(talent.e['流涌之刃伤害'], 'e')
}, {
   title: 'Q展开伤害',
     dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
   title: '惊奇猫猫盒伤害',
     dmg: ({ talent }, dmg) => dmg(talent.q['惊奇猫猫盒伤害'], 'q')
}, {
  params: { q:true },
   title: '彩练术弹伤害',
     dmg: ({ talent }, dmg) => dmg(talent.q['彩练术弹伤害'], 'q')
}
]

export const defDmgIdx = 0
export const mainAttr = 'atk,cpct,cdmg,mastery'


export const buffs = [{
  title: '琳尼特天赋：释放Q后提升攻击力20%',
  data: {
    atkPct: 20
  }
}, {
  title: '琳尼特天赋：元素爆发造成的伤害提高15%',
  data: {
    qDmg: ({ params }) => params.q ? 15 : 0 ,
  }
}, {
  title: '琳尼特6命：风元素伤害加成提升20%',
  cons: 6,
  data: {
    dmg: 20
  }
},
{title: '7.11最后修改：如有问题可联系1142607614反馈'}
]
