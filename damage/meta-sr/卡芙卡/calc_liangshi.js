export const details = [{
  title: '普攻伤害',
  params: { dmg: false , pct: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技主目标伤害',
  params: { dmg: false , pct: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '战技相邻目标伤害',
  params: { dmg: false , pct: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
}, {
  title: '天赋追加伤害',
  params: { dmg: false , pct: false },
  dmg: ({ talent }, dmg) => dmg(talent.t['追加伤害'], 't')
}, {
  title: '终结技伤害',
  params: { dmg: false , pct: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'e')
}, {
  title: '触电战技结算伤害',
  params: { dmg: true , pct: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['回合持续伤害'] * talent.e['额外持续伤害'] , 'q')//不能定义持续伤害 暂时定义为终结技伤害
}, {
  title: '触电伤害',
  params: { dmg: true , pct: true },
  dmg: ({ talent }, dmg) => dmg( talent.q['回合持续伤害'] * talent.q['触电伤害'] , 'q') //不能定义持续伤害 暂时定义为终结技伤害
}, {
  title: '触电持续伤害',
  params: { dmg: true , pct: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['回合持续伤害'] , 'q')//不能定义持续伤害 暂时定义为终结技伤害
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '卡芙卡1命：持续伤害提高30%',
  cons: 1,
  data: {
    dmg: ({ params }) => params.dmg ? 30 : 0
  }
},{
  title: '卡芙卡2命：持续伤害提高25%',
  cons: 2,
  data: {
    dmg: ({ params }) => params.dmg ? 25 : 0
  }
},{
  title: '卡芙卡6命：触电的天赋倍率提升156%',
  cons: 6,
  data: {
    qPct: ({ params }) => params.pct ? 156 : 0//不能定义持续伤害 暂时定义为终结技伤害
  }
},{title: '8.11最后修改：如有问题可联系1142607614反馈'}]
