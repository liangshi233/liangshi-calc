export const details = [{
  title: 'E后重击伤害',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '雷楔伤害',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['雷楔伤害'], 'e')
}, {
  title: '雷楔超激化伤害',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['雷楔伤害'], 'e', '超激化')
}, {
  title: '雷楔归位伤害',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['斩击伤害'], 'e')
}, {
  title: 'Q单段伤害',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['连斩伤害2'][0], 'q')
}, {
  title: 'Q总伤害',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'] + talent.q['连斩伤害'] + talent.q['最后一击伤害'], 'q')
}, {
  title: 'Q总伤害·超激化',
  params: { q: 1, team: false },
  dmg: ({ talent }, dmg) => {
    let t1j = dmg(talent.q['技能伤害'], 'q', '超激化')
    let t2j = dmg(talent.q['连斩伤害'] / 8, 'q', '超激化')
    let t2 = dmg(talent.q['连斩伤害'] / 8, 'q')
    let t3j = dmg(talent.q['最后一击伤害'], 'q', '超激化')
    return {
      dmg: t1j.dmg + t2j.dmg * 2 + t2.dmg * 6 + t3j.dmg,
      avg: t1j.avg + t2j.avg * 2 + t2.avg * 6 + t3j.avg
    }
  }
}, {
  title: '刻九万妲Q激化总伤',
  params: { q: 1, team: true },
  dmg: ({ talent }, dmg) => {
    let t1j = dmg(talent.q['技能伤害'], 'q', '超激化')
    let t2j = dmg(talent.q['连斩伤害'] / 8, 'q', '超激化')
    let t2 = dmg(talent.q['连斩伤害'] / 8, 'q')
    let t3j = dmg(talent.q['最后一击伤害'], 'q', '超激化')
    return {
      dmg: t1j.dmg + t2j.dmg * 2 + t2.dmg * 6 + t3j.dmg,
      avg: t1j.avg + t2j.avg * 2 + t2.avg * 6 + t3j.avg
    }
  }
}]

export const defParams = {
  q: 1,
  team: true
}

export const defDmgIdx = 6
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
  {
    title: '刻晴天赋2：释放Q获得15%暴击率',
    data: {
      qCpct: 15
    }
  }, {
    title: '刻晴4命：触发雷元素相关反应提升攻击力25%',
    cons: 4,
    data: {
      atkPct: 25
    }
  }, {
    title: '刻晴6命：4层获得24%雷伤加成',
    cons: 6,
    data: {
      dmg: 24
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.team === true,
    title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
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
    check: ({ params }) => params.team === true,
    title: '宗室天空九条：增加[atkPlus]点攻击力与[cdmg]%爆伤,攻击[atkPct]%',
    data: {
      atkPlus: 794.2,
      cdmg: 60,
      atkPct: 20
    }
  }, {
    check: ({ cons, params }) => (cons >= 4 && params.team === true),
    title: '精5千夜4命纳西妲：增加精通[mastery],减防[enemyDef]%',
    data: {
      mastery: 418,
      enemyDef: 30
    }
  }, {
    check: ({ cons, params }) => ((cons < 4 && cons >= 2) && params.team === true),
    title: '精1千夜2命纳西妲：增加精通[mastery],减防[enemyDef]%',
    data: {
      mastery: 290,
      enemyDef: 30
    }
  }, {
    check: ({ cons, params }) => (cons < 2 && params.team === true),
    title: '精1千夜0命纳西妲：增加精通[mastery]',
    data: {
      mastery: 290
    }
  },
  { title: '2.1最后修改：如有问题请输入 #伤害计算反馈' }
]
