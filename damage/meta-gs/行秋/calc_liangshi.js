let eDmg = { dmg: 0, avg: 0 }
let e2Dmg = { dmg: 0, avg: 0 }
let e3Dmg = { dmg: 0, avg: 0 }

export const details = [{
  title: 'E两段伤害',
  params: { team: false, qkx: true },
  dmg: ({ talent }, dmg) => {
    eDmg = dmg(talent.e['技能伤害'], 'e')
    return eDmg
  }
}, {
  title: '先QA后E两段伤害',
  check: ({ cons }) => cons >= 2,
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '雨帘剑伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['剑雨伤害'], 'q')
}, {
  title: '雨帘剑蒸发',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
}, {
  check: ({ cons }) => cons < 2,
  title: '雨帘剑37段',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    return {
      dmg: 37 * q.dmg,
      avg: 37 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons < 2,
  title: '雨帘剑37段蒸发',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let qz = dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
    return {
      dmg: 25 * q.dmg + 12 * qz.dmg,
      avg: 25 * q.avg + 12 * qz.avg
    }
  }
}, {
  check: ({ cons }) => (cons < 6 && cons >= 2),
  title: '雨帘剑42段',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    return {
      dmg: 42 * q.dmg,
      avg: 42 * q.avg
    }
  }
}, {
  check: ({ cons }) => (cons < 6 && cons >= 2),
  title: '雨帘剑42段蒸发',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let qz = dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
    return {
      dmg: 28 * q.dmg + 14 * qz.dmg,
      avg: 28 * q.avg + 14 * qz.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '雨帘剑55段',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    return {
      dmg: 55 * q.dmg,
      avg: 55 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '雨帘剑55段蒸发',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let qz = dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
    return {
      dmg: 37 * q.dmg + 18 * qz.dmg,
      avg: 37 * q.avg + 18 * qz.avg
    }
  }
}, {
  title: '胡行夜钟E两段',
  params: { team: true, qkx: true },
  dmg: ({ talent }, dmg) => {
    e2Dmg = dmg(talent.e['技能伤害'], 'e')
    return e2Dmg
  }
}, {
  check: ({ cons }) => cons < 2,
  title: '胡行夜钟 21轴 对单',
  params: { team: true },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = eDmg
    return {
      dmg: 37 * q.dmg + 1 * e.dmg,
      avg: 37 * q.avg + 1 * e.avg
    }
  }
}, {
  check: ({ cons }) => (cons < 6 && cons >= 2),
  title: '胡行夜钟 21轴 对单',
  params: { team: true },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = eDmg
    return {
      dmg: 42 * q.dmg + 1 * e.dmg,
      avg: 42 * q.avg + 1 * e.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '胡行夜钟 21轴 对单',
  params: { team: true },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = eDmg
    return {
      dmg: 55 * q.dmg + 1 * e.dmg,
      avg: 55 * q.avg + 1 * e.avg
    }
  }
}, {
  title: '雷国E两段',
  params: { team: false, qkx: true, lg: true },
  dmg: ({ talent }, dmg) => {
    e3Dmg = dmg(talent.e['技能伤害'], 'e')
    return e3Dmg
  }
}, {
  title: '雷国双E 22轴 对单',
  params: { team: false, lg: true },
  dmg: ({ talent, cons }, dmg) => {
    let count4 = cons * 1 >= 4 ? 1 : 0
    let count6 = cons * 1 >= 6 ? 1 : 0
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = e3Dmg
    return {
      dmg: 30 * q.dmg + count4 * 5 * q.dmg + count6 * 10 * q.dmg + 2 * e.dmg,
      avg: 30 * q.avg + count4 * 5 * q.avg + count6 * 10 * q.avg + 2 * e.avg
    }
  }
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
  team: true
}

export const buffs = [
  {
    title: '行秋天赋2：获得20%水伤加成',
    isStatic: true,
    data: {
      dmg: 20
    }
  }, {
    title: '行秋2命：受到剑雨攻击的敌人水元素抗性降低15%',
    cons: 2,
    data: {
      kx: ({ calc, attr, params }) => params.qkx ? 0 : 15
    }
  }, {
    title: '行秋4命：开Q后E的伤害提升50%',
    cons: 4,
    data: {
      eMulti: ({ calc, attr, params }) => params.qkx ? 0 : 50
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '胡行夜钟：水元素抗性降低20%',
    data: {
      kx: 20
    }
  }, {
    check: ({ params }) => params.lg === true,
    title: '雷国：元素爆发伤害提高24%攻击力提升20%和1202点',
    data: {
      qDmg: 24,
      atkPct: 20,
      atkPlus: 1202.35
    }
  }, 'vaporize',
  { title: '4.23最后修改：如有问题请输入 #伤害计算反馈' }
]
