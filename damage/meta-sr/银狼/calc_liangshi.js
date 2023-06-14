import { Format } from '#miao'

export const details = [{
  title: '普攻伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '终结技伤害',
  params: { team: false },
  dmg: ({ talent, cons }, dmg) => {
    let addDmg = (cons * 1 >= 4) ? 1 : 0
    return dmg(talent.q['技能伤害'] + addDmg, 'q')
  }
}, {
  title: '希银布罗 普攻伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '希银布罗 战技伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '希银布罗 终结技',
  params: { team: true },
  dmg: ({ talent, cons }, dmg) => {
    let addDmg = (cons * 1 >= 4) ? 1 : 0
    return dmg(talent.q['技能伤害'] + addDmg, 'q')
  }
}]

export const mainAttr = 'atk,cpct,cdmg,effPct'
export const defDmgIdx = 5

export const defParams = {
  team: true
}

export const buffs = [{
  title: '银狼天赋：防御力缺陷降低敌方防御力[enemyDef]%',
  data: {
    enemyDef: ({ talent }) => talent.t['防御力降低'] * 100
  }
}, {
  title: '银狼战技：添加弱点降低对方对应属性抗性[kx]%',
  data: {
    kx: ({ talent }) => talent.e['伤害抗性降低'] * 100
  }
}, {
  title: '银狼终结技：释放终结技降低敌方防御[enemyDef]%',
  data: {
    enemyDef: ({ talent }) => talent.q['防御力降低'] * 100
  }
}, {
  title: '银狼4命：敌方有5个负面Buff附加100%攻击力的量子属性附加伤害',
  cons: 4,
  data: {}
}, {
  title: '银狼6命：敌方有5个负面Buff提高100%受到的伤害',
  cons: 6,
  data: {
    dmg: 100
  }
}, {
  title: '行迹-旁注：敌方目标的负面效果数量大于等于3个额外降低抗性3%',
  tree: 2,
  data: {
    kx: 3
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '布洛妮娅 贝洛伯格进行曲：攻击力提升[atk]%,暴击伤害提升[cdmg]%',
  data: {
    atk: 55,
    cdmg: 68.768
  }
}, {
  check: ({ cons, params }) =>  params.team === true,
  title: '布洛妮娅 行迹-军势：造成的伤害提升[dmg]%',
  data: {
    dmg: 10
  }
}, {
  check: ({ cons, params }) => ((cons == 6) && params.team === true),
  title: '罗刹光锥 棺的回响⁵：速度提高[speedPct]%',
  data: {
    speedPct: 20
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '罗刹光锥 棺的回响³：速度提高[speedPct]%',
  data: {
    speedPct: 16
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '罗刹光锥 棺的回响¹：速度提高[speedPct]%',
  data: {
    speedPct: 12
  }
},{title: '6.14最后修改：如有问题可联系1142607614反馈'}]
