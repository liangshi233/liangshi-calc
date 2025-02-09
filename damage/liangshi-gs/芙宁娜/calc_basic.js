import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻伤害提升-荒',
    params: { cons6: true, jsl: 0 },
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.hp) * 18 / 100, 'a')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻伤害提升-芒',
    params: { cons6: true, jsl: 1 },
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.hp) * 43 / 100, 'a')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻治疗量-荒',
    params: { cons6: true, jsl: 0 },
    dmg: ({ attr, calc }, { heal }) => heal(calc(attr.hp) * 4 / 100)
  }, {
    title: '众水的歌者治疗量',
    dmg: ({ talent, attr, calc }, { heal }) =>
      heal(talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1)
  }, {
    title: '海薇玛夫人伤害',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
  }, {
    title: '乌瑟勋爵伤害',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
  }, {
    title: '谢贝蕾妲小姐伤害',
    dmgKey: 'e',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '谢贝蕾妲小姐蒸发',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e', 'vaporize')
  }, {
    title: '舞台展开伤害',
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  }, {
    title: 'Q展开蒸发伤害',
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
  }, {
    title: '心夜万芙 谢贝蕾妲',
    params: { teamA: true, q: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '心夜万芙 舞台展开',
    params: { teamA: true, q: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  }
]

export const defParams = { soda: 1 }
export const mainAttr = 'hp,cpct,cdmg'
export const defDmgKey = 'e'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '芙宁娜技能：[孤心沙龙] 「沙龙成员」进行攻击时,根据附近的队伍中生命值高于50%的角色数量,提升此次攻击造成的伤害为原本的1[_eDmg]%',
    data: {
      _eDmg: 40
    }
  }, {
    title: '芙宁娜技能：[万众狂欢] 基于芙宁娜持有的「气氛值」,附近的队伍中所有角色造成的伤害提升[dmg]%,受治疗加成提升[healInc]%',
    check: ({ params }) => params.q === true,
    data: {
      dmg: ({ talent }) => talent.q['气氛值转化提升伤害比例'] * 300,
      healInc: ({ talent }) => talent.q['气氛值转化受治疗加成比例'] * 300
    }
  }, {
    title: '芙宁娜天赋：[无人听的自白] 处于不同始基力属性下的芙宁娜的孤心沙龙获得增益效果,「沙龙成员」造成的伤害提升[eDmg]%,「众水的歌者」为周围的当前场上角色恢复生命值的间隔降低[_eSpeed]%',
    sort: 9,
    data: {
      eDmg: ({ calc, attr }) => Math.min(28, (calc(attr.hp)) / 1000 * 0.7),
      _eSpeed: ({ calc, attr }) => Math.min(16, (calc(attr.hp)) / 1000 * 0.4)
    }
  }, {
    title: '芙宁娜1命：[爱是难驯鸟,哀乞亦无用.] 芙宁娜持有「气氛值」的上限提升100点.',
    check: ({ params }) => params.q === true,
    cons: 1,
    data: {
      dmg: ({ talent }) => talent.q['气氛值转化提升伤害比例'] * 100,
      healInc: ({ talent }) => talent.q['气氛值转化受治疗加成比例'] * 100
    }
  }, {
    title: '芙宁娜2命：[女人皆善变,仿若水中萍.] 基于「气氛值」超过上限的部分,使芙宁娜的生命值上限提升[hpPct]%',
    check: ({ params }) => params.q === true,
    cons: 2,
    data: {
      hpPct: 140
    }
  }, {
    title: '芙宁娜4命：[若非处幽冥,怎知生可贵！] 孤心沙龙的「沙龙成员」命中敌人,或「众水的歌者」为周围的当前场上角色恢复生命值时,芙宁娜获得[_energyevery]点元素能量',
    cons: 4,
    data: {
      _energyevery: 4
    }
  }, {
    title: '芙宁娜6命：[诸君听我颂，共举爱之杯！] 施放孤心沙龙时,芙宁娜的普通攻击、重击与下落攻击将转为无法被附魔覆盖的水元素伤害,且造成的伤害提升[_aPlus]点',
    check: ({ params }) => params.cons6 === true && params.jsl !== undefined,
    sort: 9,
    cons: 6,
    data: {
      _aPlus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * params.jsl),
      _a2Plus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * params.jsl),
      _a3Plus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * params.jsl)
    }
  }, {
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
    check: ({ params }) => params.teamA === true,
    data: {
      dmg: 50
    }
  }, {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
    check: ({ params, cons }) => cons >= 4 && params.teamA === true,
    sort: 1,
    cons: 4,
    data: {
      hpPct: 40
    }
  }, {
    title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性 { 该圣遗物效果不可叠加 }',
    check: ({ params }) => params.teamA === true,
    data: {
      kx: 40
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => (cons < 6 && cons > 1) && params.teamA === true,
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => (cons < 6 && cons > 1) && params.teamA === true && weapon.name !== '苍古自由之誓',
    sort: 1,
    data: {
      atkPct: 20
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => cons >= 6 && params.teamA === true,
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => cons >= 6 && params.teamA === true && weapon.name !== '苍古自由之誓',
    sort: 1,
    data: {
      atkPct: 40
    }
  }, {
    title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 2 && params.teamA === true,
    sort: 1,
    data: {
      mastery: 200
    }
  }, {
    title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
    check: ({ params }) => params.teamA === true,
    data: {
      dmg: 40
    }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamA === true,
    data: {
      hpPct: 25
    }
  },
  'vaporize',
  { title: '11.28最后修改：[11.6重置] 修正天赋加成异常' }
]
