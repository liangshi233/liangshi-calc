export const details = [{
  title: '重击伤害',  
  params: {team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: '高天之歌点按伤害',
  params: {team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
}, {
  title: '高天之歌长按伤害',
  params: {team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
}, {
  title: '风神之诗单段伤害',
  params: {team: false , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}, {
  title: 'Q含转化单段',
  params: {team: false , q: true },
  dmg: ({ talent }, dmg) => {
    let basic = dmg(talent.q['持续伤害'], 'q')
    // 暂时以物伤近似计算
    let fj = dmg(talent.q['附加元素伤害'], 'q', 'phy')
    return {
      dmg: basic.dmg + fj.dmg,
      avg: basic.avg + fj.avg
    }
  }
}, {
  title: '扩散反应伤害',
  params: {team: false },
  dmg: ({}, { reaction }) => reaction('swirl')
}, {
  title: '莫甘娜 E点按伤害',
  params: {team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e')
}, {
  title: '莫甘娜 Q单段伤害',
  params: {team: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
    team:true
}


export const buffs = [{
  title: '温迪2命：E降低12%风抗与物抗',
  cons: 2,
  data: {
    kx: 12
  }
}, {
  title: '温迪4命：温迪获取元素晶球或元素微粒后，获得25%风元素伤害加成',
  cons: 4,
  data: {
    dmg: 25
  }
}, {
  title: '温迪6命：Q降低20%风抗',
  cons: 6,
  data: {
    kx: ({ params }) => params.q ? 20 : 0
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '甘雨4命：大招领域内敌人受到的伤害提升25%',
  data: {
    dmg: ({ params }) => params.q ? 25 : 0
  }
}, {
  check: ({ cons, params }) => (cons >= 2 && params.team === true),
  title: '千夜教官满命莫娜：获得[dmg]%增伤,暴击[cpct]%,精通[mastery]',
  data: {
    dmg: 60,
    vaporize:15,
    cpct: 15,
    mastery: 168
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true),
  title: '千夜教官0命莫娜：获得[dmg]%增伤,精通[mastery]',
  data: {
    dmg: 60,
    mastery: 168
  }
}, {
  check: ({ params }) => params.team === true,
  title: '6命宗室迪奥娜：攻击力提升[atkPct]%，提升精通[mastery]点',
  data: {
    atkPct: 20,
    mastery: 200
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 粉碎之冰：攻击处于冰元素附着或冻结下的敌人时，暴击率提高[cpct]%',
  data: {
    cpct: 15
  }
},
 {title: '10.8最后修改：如有问题请输入 #伤害计算反馈'}
 ]
