export const details = [{
  title: '普通攻击一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '初始切割伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['初始切割伤害'], 'e')
}, {
  title: '最大切割伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['最大切割伤害'], 'e')
}, {
  title: '初始爆风伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['初始爆风伤害'], 'e')
}, {
  title: '最大爆风伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['最大爆风伤害'], 'e')
}, {
  title: 'Q每跳基础伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['龙卷风伤害'], 'q')
}, {
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '旅行者6命：风元素抗性降低20%',
  cons: 6,
  data: {
    kx: 20
  }
},
 {title: '5.8最后修改：如有问题请输入 #伤害计算反馈'}
 ]
