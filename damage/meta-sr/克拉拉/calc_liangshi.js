import { Format } from '#miao'

export const details = [{
  params: { team: false },
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a' )
}, {
  params: { team: false },
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e' )
}, {
  params: { team: false , fu:true },
  title: '反击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['反击伤害'], 'e')
}, {
  params: { team: false , fu:true },
  title: '终结技 反击',
  dmg: ({ talent }, dmg) => dmg(talent.q['伤害倍率提高'] + talent.t['反击伤害'], 't')
}, {
  params: { team: true },
  title: '克艾白素 普攻',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a' )
}, {
  params: { team: true },
  title: '克艾白素 战技',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e' )
}, {
  params: { team: true , fu:true },
  title: '克艾白素 反击',
  dmg: ({ talent }, dmg) => dmg(talent.e['反击伤害'], 'e')
}, {
  params: { team: true , fu:true },
  title: '克艾白素 终结反击',
  dmg: ({ talent }, dmg) => dmg(talent.q['伤害倍率提高'] + talent.t['反击伤害'], 't')
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = 3

export const defParams = {
  team: true
}

export const buffs = [
{
  title: '克拉拉2命：施放终结技后攻击力提高30%',
  cons: 2,
  data: {
    atkPct: 30
  }
}, {
  title: '行迹-复仇：史瓦罗的反击造成的伤害提高30%',
  tree: 3,
  data: {
    dmg: ({ params }) => params.fu ? 30 : 0 ,
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '艾丝妲 星空祝言：速度提升[speedPct]%',
  data: {
    speedPct: 50
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '艾丝妲 天象学：攻击力提升[atk]%',
  data: {
    atk: 70
  }
},
{title: '6.20最后修改：如有问题可联系1142607614反馈'}
]

