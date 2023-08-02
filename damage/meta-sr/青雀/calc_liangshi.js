import { Format } from '#miao'

export const details = [{
  title: '门前清伤害',
  params: { team: false , lao:false , ting:false , yu:false },
  dmg: ({ talent }, dmg) => dmg(talent.a['门前清·伤害'], 'a')
}, {
  title: '满层E 杠伤害',
  params: { team: false , lao:true , ting:true , yu:true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['杠·伤害'], 'a')
}, {
  title: '满层E 杠相邻伤害',
  params: { team: false , lao:true , ting:true , yu:true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['杠·相邻目标伤害'], 'a')
}, {
  title: '终结技伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '青银布罗 门前清',
  params: { team: true , lao:false , ting:false , yu:false },
  dmg: ({ talent }, dmg) => dmg(talent.a['门前清·伤害'], 'a')
}, {
  title: '青银布罗 杠',
  params: { team: true , lao:true , ting:true , yu:true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['杠·伤害'], 'a')
}, {
  title: '青银布罗 杠相邻',
  params: { team: true , lao:true , ting:true , yu:true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['杠·相邻目标伤害'], 'a')
}, {
  title: '青银布罗 终结技伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,effPct'
export const defDmgIdx = 1

export const defParams = {
  team: true
}

export const buffs = [{
  title: '海底捞月：使用战技提高造成的伤害[xq]%',
  data: {
    aDmg: ({ params , talent }) => params.lao ? ( talent.e['伤害提高'] * 100 * 4 ) : 0 ,
    xq: ({ talent }) => talent.e['伤害提高'] * 100 * 4
  }
}, {
  title: '青雀天赋：处于暗杠状态提升攻击力[xq]%',
  data: {
    atk: ({ params , talent }) => params.yu ? ( talent.t['攻击力提高'] * 100 ) : 0 ,
    xq: ({ talent }) => talent.t['攻击力提高'] * 100
  }
},{
  title: '行迹-听牌：使用战技提高造成的伤害额外提升[xq]%',
  data: {
    aDmg: ({ params }) => params.ting ? 10 : 0 ,
    xq: 10
  }
}, {
  title: '青雀1命：终结技造成的伤害提升[qDmg]%',
  tree: 1,
  data: {
    qDmg: 10
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
},
 {title: '8.2最后修改：如有问题可联系1142607614反馈'}]
