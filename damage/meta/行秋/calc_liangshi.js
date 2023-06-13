export const details = [{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '先QA后E两段伤害',
  params: { team: false },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '雨帘剑伤害',
  params: { team: false },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['剑雨伤害'], 'q')
}, {
  title: '雨帘剑蒸发',
  params: { team: false },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['剑雨伤害'], 'q', 'vaporize')
}, {
  check: ({ cons }) => cons < 2 ,
  title: '雨帘剑37段',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    return {
      dmg:  37 * q.dmg,
      avg:  37 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons < 2 ,
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
      dmg:  42 * q.dmg,
      avg:  42 * q.avg
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
      dmg:  55 * q.dmg,
      avg:  55 * q.avg
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
  check: ({ cons }) => cons < 2 ,
  title: '胡行夜钟 21轴 对单',
  params: { team: true },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = dmg(talent.e['技能伤害'], 'e')
    return {
      dmg:  37 * q.dmg + 1 * e.dmg,
      avg:  37 * q.avg + 1 * e.avg
    }
  }
}, {
  check: ({ cons }) => (cons < 6 && cons >= 2),
  title: '胡行夜钟 21轴 对单',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = dmg(talent.e['技能伤害'], 'e')
    return {
      dmg:  42 * q.dmg + 1 * e.dmg,
      avg:  42 * q.avg + 1 * e.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '胡行夜钟 21轴 对单',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['剑雨伤害'], 'q')
    let e = dmg(talent.e['技能伤害'], 'e')
    return {
      dmg:  55 * q.dmg + 1 * e.dmg,
      avg:  55 * q.avg + 1 * e.avg
    }
  }
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
  team: true
}

export const buffs = [{
  title: '行秋天赋2：获得20%水伤加成',
  isStatic: true,
  data: {
    dmg: 20
  }
}, {
  title: '行秋2命：受到剑雨攻击的敌人水元素抗性降低15%',
  cons: 2,
  data: {
    kx: 15
  }
}, {
  title: '行秋4命：开Q后E的伤害提升50%',
  cons: 4,
  data: {
    eMulti: 50
  }
}, {
  check: ({ params }) => params.team === true ,
  title: '胡行夜钟：水元素抗性降低20%',
  data: {
	kx: 20 
  }
}, 'vaporize',
{title: '5.7最后修改：如有问题可联系1142607614反馈'}
]
