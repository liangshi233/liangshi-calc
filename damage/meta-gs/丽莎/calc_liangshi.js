export const details = [{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},{
  title: '重击超激化伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', '超激化')
},{
  title: '点按苍雷伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
},{
  title: '点按苍雷超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e', '超激化')
}, {
  title: '3层引雷长按E伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['三层引雷长按伤害'], 'e')
}, {
  title: '3层长按E超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['三层引雷长按伤害'], 'e', '超激化')
}, {
  title: '蔷薇的雷光每段伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['放电伤害'], 'q')
}, {
  title: 'Q超激化每段伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['放电伤害'], 'q', '超激化')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '丽莎天赋2：敌人受到蔷薇的雷光攻击后，降低15%防御力',
  data: {
    enemyDef: ({ params }) => params.q ? 15 : 0
  }
},
 {title: '4.4最后修改：如有问题请输入 #伤害计算反馈'}
]
