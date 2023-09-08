export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '满层E 普攻首段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['盘拏耀跃·单体伤害'], 'a')
}, {
  title: '满层E 普攻尾段伤害',
  params: { buff: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['盘拏耀跃·单体伤害'], 'a')
}, {
  title: '满层E 普攻尾段相邻伤害',
  params: { buff: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['盘拏耀跃·相邻目标伤害'], 'a')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['目标伤害'], 'q')
}, {
  title: '终结技相邻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['相邻目标伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,effPct'
export const defDmgIdx = 2

export const buffs = [{
  title: '亢心：每次攻击都将提升自己身伤害，至多叠加6层[dmg]%',
  data: {
    dmg: ({ params , talent }) => params.buff ? ( talent.t['伤害提高'] * 100 * 6 ) : 0
  }
}, {
  title: '龙力自在：施放【天矢阴】或【盘拏耀跃】时提升暴击伤害，至多叠加4层',
  data: {
    cdmg: ({ params , talent }) => params.buff ? ( talent.e['暴击伤害提高'] * 100 * 4 ) : 0
  }
}, {
  title: '行迹-起蛰：对拥有虚数弱点的目标暴击伤害提高24%',
  tree: 3,
  data: {
    cdmg: 24
  }
},{
  title: '丹恒•饮月1命：亢心可额外叠加四层',
  cons: 1,
  data: {
    dmg: ({ params , talent }) => params.buff ? ( talent.t['伤害提高'] * 100 * 4 ) : 0
  }
}, {
  title: '丹恒•饮月6命：抗性穿透提高20%，最多叠加3层',
  cons: 4,
  data: {
    kx: 60
  }
},{title: '9.8最后修改：如有问题可联系1142607614反馈'}]
