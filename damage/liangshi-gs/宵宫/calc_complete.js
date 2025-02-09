import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '炽焰箭首段',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '炽焰箭首段蒸发',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
}, {
  title: '炽焰箭首段融化',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'melt')
}, {
  title: '炽焰箭二段',
  params: { num: 2, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
}, {
  title: '炽焰箭二段蒸发',
  params: { num: 2, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
}, {
  title: '炽焰箭二段融化',
  params: { num: 2, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'melt')
}, {
  title: '炽焰箭三段',
  params: { num: 3, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
}, {
  title: '炽焰箭三段蒸发',
  params: { num: 3, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
}, {
  title: '炽焰箭三段融化',
  params: { num: 3, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'melt')
}, {
  title: '炽焰箭四段',
  params: { num: 4, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
}, {
  title: '炽焰箭四段蒸发',
  params: { num: 4, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'vaporize')
}, {
  title: '炽焰箭四段融化',
  params: { num: 4, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'melt')
}, {
  title: '炽焰箭尾箭',
  params: { num: 10, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a')
}, {
  title: '炽焰箭尾箭蒸发',
  params: { num: 10, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
}, {
  title: '炽焰箭尾箭蒸发',
  params: { num: 10, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'melt')
}, {
  title: '焰硝矢伤害',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: '焰硝矢蒸发',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'vaporize')
}, {
  title: '焰硝矢融化',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
}, {
  title: '重击伤害',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: '重击伤害蒸发',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'vaporize')
}, {
  title: '重击伤害融化',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2', 'melt')
}, {
  title: '琉金云间草伤害',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '琉金云间草蒸发',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}, {
  title: '琉金云间草融化',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
  title: '琉金云间草爆炸伤害',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['琉金火光爆炸伤害'], 'q')
}, {
  title: '琉金云间草爆炸蒸发',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['琉金火光爆炸伤害'], 'q', 'vaporize')
}, {
  title: '琉金云间草爆炸融化',
  params: { num: 1, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['琉金火光爆炸伤害'], 'q', 'melt')
}, {
  title: '宵夜万班首箭蒸发',
  params: { num: 10, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
}, {
  title: '宵夜万班尾箭蒸发',
  params: { num: 10, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
}, {
  check: ({ cons }) => cons >= 6,
  dmgKey: 'e',
  title: '宵夜万班凹双蒸',
  params: { num: 10, team: true, xywb: true },
  dmg: ({ talent }, dmg) => {
    let a0Dmg = dmg(talent.a['一段伤害'] / 2, 'a', 'vaporize')
    let a1Dmg = dmg(talent.a['一段伤害'] / 2, 'a')
    let a1_5Dmg = dmg(talent.a['一段伤害'] / 2, 'a')
    let a2Dmg = dmg(talent.a['二段伤害'], 'a')
    let a3Dmg = dmg(talent.a['三段伤害'], 'a', 'vaporize')
    let a4Dmg = dmg(talent.a['四段伤害'], 'a')
    let a4_5Dmg = dmg(talent.a['四段伤害'] / 2, 'a')
    let a5Dmg = dmg(talent.a['五段伤害'], 'a', 'vaporize')
    let a5_5Dmg = dmg(talent.a['五段伤害'] / 2, 'a', 'vaporize')
    return {
      avg: a0Dmg.avg + a1Dmg.avg + a1_5Dmg.avg + a2Dmg.avg + a3Dmg.avg + 3 * a4_5Dmg.avg + a5_5Dmg.avg + a5Dmg.avg,
      dmg: a0Dmg.dmg + a1Dmg.dmg + a1_5Dmg.dmg + a2Dmg.dmg + a3Dmg.dmg + 3 * a4_5Dmg.dmg + a5_5Dmg.dmg + a5Dmg.dmg
    }
  }
}, {
  check: ({ cons }) => cons < 6,
  dmgKey: 'e',
  title: '宵夜万班147蒸发',
  params: { num: 10, team: true, xywb: true },
  dmg: ({ talent }, dmg) => {
    let a0Dmg = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a1Dmg = dmg(talent.a['一段伤害'], 'a')
    let a2Dmg = dmg(talent.a['二段伤害'], 'a')
    let a3Dmg = dmg(talent.a['三段伤害'], 'a', 'vaporize')
    let a4Dmg = dmg(talent.a['四段伤害'], 'a')
    let a5Dmg = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    return {
      avg: a0Dmg.avg / 2 + a1Dmg.avg / 2 + a2Dmg.avg + a3Dmg.avg + a4Dmg.avg + a5Dmg.avg,
      dmg: a0Dmg.dmg / 2 + a1Dmg.dmg / 2 + a2Dmg.dmg + a3Dmg.dmg + a4Dmg.dmg + a5Dmg.dmg
    }
  }
}, {
  title: '宵云夜班 首箭蒸发',
  params: { num: 1, team: true, xyyb: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
}, {
  title: '宵云夜班 尾箭蒸发',
  params: { num: 10, team: true, xyyb: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
}, {
  dmgKey: 'e',
  title: '宵云夜班 20轴对单',
  params: { num: 10, team: true, xyyb: true },
  dmg: ({ talent, cons }, dmg) => {
    let q1Dmg = dmg(talent.q['技能伤害'], 'q', 'vaporize')
    let q2Dmg = dmg(talent.q['琉金火光爆炸伤害'], 'q', 'vaporize')
    let a1Dmg = dmg(talent.a['一段伤害'], 'a')
    let a1zDmg = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2Dmg = dmg(talent.a['二段伤害'], 'a')
    let a2zDmg = dmg(talent.a['二段伤害'], 'a', 'vaporize')
    let a3Dmg = dmg(talent.a['三段伤害'], 'a')
    let a3zDmg = dmg(talent.a['三段伤害'], 'a', 'vaporize')
    let a4Dmg = dmg(talent.a['四段伤害'], 'a')
    let a4zDmg = dmg(talent.a['四段伤害'], 'a', 'vaporize')
    let a5Dmg = dmg(talent.a['五段伤害'], 'a')
    let a5zDmg = dmg(talent.a['五段伤害'], 'a', 'vaporize')
    let count = cons * 1 >= 1 ? 2 : 0
    let count2 = cons * 1 >= 6 ? 1 : 0
    return {
      avg: q1Dmg.avg + q2Dmg.avg * (5 + count) + a1zDmg.avg + a2zDmg.avg + a3zDmg.avg + a4zDmg.avg + a5zDmg.avg + (a1Dmg.avg + a2Dmg.avg + a3Dmg.avg + a4Dmg.avg + a5Dmg.avg * 2) + (a1Dmg.avg + a1zDmg.avg * 0.5 + a2Dmg.avg * 2 + a3Dmg.avg + a4Dmg.avg + a4zDmg.avg * 0.5 + a5Dmg.avg * 2) * 0.6 * count2,
      dmg: q1Dmg.dmg + q2Dmg.dmg * (5 + count) + a1zDmg.dmg + a2zDmg.dmg + a3zDmg.dmg + a4zDmg.dmg + a5zDmg.dmg + (a1Dmg.dmg + a2Dmg.dmg + a3Dmg.dmg + a4Dmg.dmg + a5Dmg.dmg * 2) + (a1Dmg.dmg + a1zDmg.dmg * 0.5 + a2Dmg.dmg * 2 + a3Dmg.dmg + a4Dmg.dmg + a4zDmg.dmg * 0.5 + a5Dmg.dmg * 2) * 0.6 * count2
    }
  }
}]

export const defDmgKey = 'e'
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const defParams = {
  num: 10
}

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '焰硝庭火舞：开启E后额外提升普通[aMulti]%伤害',
    data: {
      aMulti: ({ talent }) => talent.e['炽焰箭伤害'] - 100
    }
  }, {
    title: '宵宫天赋1：袖火百景图10层提高20%火伤加成',
    data: {
      dmg: ({ params }) => params.num ? params.num * 2 : 20
    }
  }, {
    title: '宵宫2命：宵宫造成暴击后获得25%火伤加成',
    cons: 2,
    data: {
      dmg: ({ params }) => params.num > 1 ? 25 : 0
    }
  }, {
    title: '宵宫6命：按照一轮普攻触发3次，尾箭双蒸计算',
    cons: 6,
    data: {
      aMulti: 0
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '夜兰：获得[dmg]%增伤',
    data: {
      dmg: 50
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
    sort: 9,
    data: {
      atkPct: 20,
      atkPlus: 1202.35
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 热诚之火：攻击力提高[atkPct]%',
    data: {
      atkPct: 25
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.xywb === true,
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
    check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.xywb === true),
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
    check: ({ cons, params }) => (cons >= 6 && params.xywb === true),
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
    check: ({ params }) => params.xyyb === true,
    title: '云堇：获得[aDmg]%增伤，提升普通攻击伤害2336',
    sort: 9,
    data: {
      aDmg: 15,
      aPlus: 2336 * 2
    }
  }, 'vaporize',
  { title: '9.26最后修改：如有问题请输入 #伤害计算反馈' }
]
