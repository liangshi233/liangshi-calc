let QDmg = { dmg: 0, avg: 0 }
let Q1Dmg = { dmg: 0, avg: 0 }
let Q2Dmg = { dmg: 0, avg: 0 }

export const details = [{
  title: '锅巴单口伤害',
  params: { team: false, qhs: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷火伤害'], 'e')
}, {
  title: '锅巴单口蒸发',
  params: { team: false, qhs: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷火伤害'], 'e', 'vaporize')
}, {
  title: '旋火轮单次伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['旋火轮伤害'], 'q')
}, {
  title: '旋火轮单次蒸发',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['旋火轮伤害'], 'q', 'vaporize')
}, {
  title: '万达锅巴单口蒸发',
  params: { team: true, qhs: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷火伤害'], 'e', 'vaporize')
}, {
  title: '万达旋火轮单次蒸发',
  params: { team: true, hb: false, qhs: false, lg: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['旋火轮伤害'], 'q', 'vaporize')
}, {
  title: '雷国锅巴单口蒸发',
  params: { team: false, hb: false, qhs: true, lg: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷火伤害'], 'e', 'vaporize')
}, {
  title: '雷国旋火轮单次蒸发',
  params: { team: false, hb: false, qhs: false, lg: true },
  dmg: ({ talent }, dmg) => {
    QDmg = dmg(talent.q['旋火轮伤害'], 'q', 'vaporize')
    Q1Dmg = dmg(talent.q['一段挥舞伤害'], 'q', 'vaporize')
    Q2Dmg = dmg(talent.q['二段挥舞伤害'], 'q')
    return QDmg
  }
}, {
  title: '雷国 22轴 对单',
  params: { team: false, hb: false, qhs: true, lg: true },
  dmg: ({ talent, cons }, dmg) => {
    let e = dmg(talent.e['喷火伤害'], 'e', 'vaporize')
    let q = dmg(talent.q['旋火轮伤害'], 'q', 'vaporize')
    let q3 = dmg(talent.q['三段挥舞伤害'], 'q')
    let q1 = Q1Dmg
    let q2 = Q2Dmg
    let count = cons * 1 >= 4 ? 4 : 0
    return {
      dmg: q1.dmg + q2.dmg + q3.dmg + 8 * q.dmg + count * q.dmg + 4 * e.dmg,
      avg: q1.avg + q2.avg + q3.avg + 8 * q.avg + count * q.avg + 4 * e.avg
    }
  }
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = { team: true }

export const buffs = [
  {
    cons: 1,
    title: '香菱1命：锅巴降低敌人火抗15',
    data: {
      kx: 15
    }
  }, {
    cons: 4,
    title: '香菱4命：旋火轮持续时间提升40%'
  }, {
    title: '香菱6命：旋火轮持续时间火元素伤害提升15%',
    cons: 6,
    data: {
      dmg: ({ calc, attr, params }) => params.qhs ? 15 : 0
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力[dmg]%火伤加成',
    sort: 9,
    data: {
      atkPct: 20,
      atkPlus: 1202.35,
      dmg: 15
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.team === true,
    title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
    sort: 9,
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16,
      dmg: 40,
      atkPct: 20,
      kx: 40
    }
  }, {
    check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
    title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    sort: 9,
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16,
      dmg: 48,
      atkPct: 20,
      kx: 40,
      mastery: 200
    }
  }, {
    check: ({ cons, params }) => (cons >= 6 && params.team === true),
    title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    sort: 9,
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32,
      dmg: 48,
      atkPct: 40,
      kx: 40,
      mastery: 200
    }
  }, {
    check: ({ params }) => params.lg === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力[dmg]%火伤加成',
    sort: 9,
    data: {
      atkPct: 20,
      atkPlus: 1202.35,
      dmg: 15
    }
  }, {
    check: ({ params }) => params.lg === true,
    title: '元素共鸣 热诚之火：攻击力提高[atkPct]%',
    data: {
      atkPct: 25
    }
  }, {
    check: ({ params }) => params.lg === true,
    title: '恶曜开眼：开E元素爆发伤害提升[qDmg]%',
    data: {
      qDmg: 24
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 热诚之火：攻击力提高[atkPct]%',
    data: {
      atkPct: 25
    }
  }, 'vaporize',
  { title: '10.6最后修改：如有问题请输入 #伤害计算反馈' }
]
