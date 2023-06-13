export const details = [{
  title: '普攻四段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},{
  title: '普攻四段融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'melt')
},{
  title: '重华叠霜伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: '重华叠霜融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `云开星落 ${count}柄灵刃总伤害`,
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `云开星落 ${count}柄灵刃融化`,
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '重云6命：对于生命百分比低于重云的敌人伤害提升15%，同时额外多一柄灵刃',
  cons: 6,
  data: {
    qDmg: 15
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
 ]
