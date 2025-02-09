import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs96ranking = cfg.gs96ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '万相化灰'
let eNameT = 'E'
let qName = '厄月将升'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '斩首之邀'
    eNameT = '万相化灰'
    qNameT = '厄月将升'
  } else if (NamePath == 3) {
    eNameT = '万相化灰'
    qNameT = '厄月将升'
  } else if (NamePath == 4) {
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a3Name = '下落'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'Z'
    a3Name = '戳'
    eName = 'E'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
  }
}
const miss = ['c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs96ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'a'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'a'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'a'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[阿蕾奇诺] 排名规则均未命中，已选择默认排名规则')
        ranking = 'a'
      } else {
        ranking = `${rankingThreePath}`
      }
    } else {
      ranking = `${rankingTwoPath}`
    }
  } else {
    ranking = `${rankingOnePath}`
  }
} else {
  ranking = `${gs96ranking}`
}
if (!cfg.namemodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `仆万香班 ${aName}一段`,
    params: { teamA: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `仆万香班 ${aName}尾段`,
    dmgKey: 'a',
    params: { teamA: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a')
  }, {
    title: `仆万香班 ${eName}切斩`,
    params: { teamA: true, BondOfLife: 200 },
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['切斩伤害'], 'e')
  }, {
    title: `仆万香班 ${qNameT}伤害`,
    params: { teamA: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    check: ({ attr }) => attr.mastery >= 120,
    title: '仆万夜钟 {aName}一段蒸发',
    params: { teamB: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'vaporize')
  }, {
    check: ({ attr }) => attr.mastery >= 120,
    title: '仆万夜钟 {aName}尾段蒸发',
    params: { teamB: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'vaporize')
  }, {
    check: ({ artis }) => artis.如雷的盛怒 == 4,
    title: `仆皇北夏 ${aName}一段`,
    params: { teamC: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    check: ({ artis }) => artis.如雷的盛怒 == 4,
    title: `仆皇北夏 ${aName}尾段`,
    params: { teamC: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a')
  }, {
    check: ({ attr }) => attr.phy >= 34.6,
    title: `仆皇修钟 ${aName}一段`,
    params: { teamD: true, phy: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    check: ({ attr }) => attr.phy >= 34.6,
    title: `仆皇修钟 ${aName}尾段`,
    params: { teamD: true, phy: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'phy')
  }, {
    check: ({ attr }) => attr.mastery >= 480,
    title: '仆行妲心 烈绽放',
    params: { teamE: true, BondOfLife: 200 },
    dmg: ({}, { reaction }) => reaction('burgeon')
  }, {
    check: ({ attr }) => attr.cpct <= 32 && attr.cdmg >= 160,
    title: `仆万莫班 ${qNameT}蒸发`,
    params: { teamF: true, BondOfLife: 200 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
  }
]

export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}` }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
    data: {
      _BondOfLife: ({ params, cons, weapon }) => Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200)
    }
  }, {
    check: ({ params }) => params.phy !== true,
    title: '阿蕾奇诺技能：[红死之宴] 阴翳礼赞状态下，普通攻击将转为红死之宴,使造成的伤害提升[aPlus]；通过这种方式消耗生命之契时，会使元素战技「万相化灰」的冷却缩短[_eCdPlus]秒。',
    data: {
      aPlus: ({ talent, attr, calc, params, cons, weapon }) => calc(attr.atk) * ((Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * (talent.a['红死之宴提升'] / 100)),
      _eCdPlus: 0.8
    }
  }, {
    title: '阿蕾奇诺技能：[唯厄月可知晓] 在战斗状态下，获得[dmg]%火元素伤害加成',
    data: { dmg: 40 }
  }, {
    title: '阿蕾奇诺天赋：[唯力量可守护] 获得[_res]%全元素抗性和物理抗性',
    data: {
      _res: ({ attr, calc }) => Math.min((calc(attr.atk) >= 1000 ? ((calc(attr.atk) - 1000) / 100) : 0), 20)
    }
  }, {
    check: ({ params }) => params.phy !== true,
    title: '阿蕾奇诺1命：[「所有的仇与债皆由我偿…」] 红死之宴进一步提高[aPlus]；此外，在红死之宴状态下进行普通攻击时，提高[_aInterruption]%抗打断能力。',
    cons: 1,
    data: {
      aPlus: ({ attr, calc, params, cons, weapon }) => calc(attr.atk) * ((Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * (100 / 100)),
      _aInterruption: 100
    }
  }, {
    title: '阿蕾奇诺2命：[「所有的赏与罚皆自我出…」] 血偿勒令施加时即为血偿勒令·结，并在回收时在前方唤出厄月血祸，造成火元素范围伤害',
    cons: 2
  }, {
    title: '阿蕾奇诺4命：[「此后，你们须相爱相护…」] 回收血偿勒令时，厄月将升的冷却时间缩短[_cdPlus]秒并恢复[_energyevery]点元素能量',
    cons: 4,
    data: {
      _cdPlus: 2,
      _energyevery: 15
    }
  }, {
    title: '阿蕾奇诺6命：[「自此以后，我们将共飨新生。」] 厄月将升造成的伤害提高[qPlus],且释放后普通攻击与元素爆发的暴击率提高[aCpct]%,暴击伤害提高[aCdmg]%',
    cons: 6,
    data: {
      qPlus: ({ calc, attr, params, cons, weapon }) => (calc(attr.atk) * ((Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * (700 / 100))),
      aCpct: 10,
      aCdmg: 70,
      qCpct: 10,
      qCdmg: 70
    }
  }, {
    title: '元素反应：[超导] 冰元素触及雷元素时会造成冰元素的范围伤害,并降低受超导影响生物[phyKx]%的物理抗性 ',
    check: ({ params }) => params.teamD === true,
    data: { phyKx: 25 }
  }, {
    title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
    check: ({ params }) => params.teamA === true || params.teamC === true || params.teamF === true,
    sort: 1,
    data: { atkPct: 25 }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamE === true,
    data: { hpPct: 25 }
  }, {
    title: '元素共鸣：[交织之护] 全元素与物理抗性提升[_res]%',
    check: ({ params }) => params.teamB === true || params.teamD === true,
    data: { _res: 15 }
  }, {
    title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
    check: ({ params }) => params.teamA === true || params.teamB === true || params.teamF === true,
    data: { kx: 40 }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => (cons < 6 && cons > 1) && (params.teamA === true || params.teamB === true || params.teamF === true),
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => (cons < 6 && cons > 1) && (params.teamA === true || params.teamB === true || params.teamF === true),
    sort: 1,
    data: { atkPct: 20 }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => cons >= 6 && (params.teamA === true || params.teamB === true || params.teamF === true),
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => cons >= 6 && (params.teamA === true || params.teamB === true || params.teamF === true),
    sort: 1,
    data: { atkPct: 40 }
  }, {
    title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 2 && (params.teamA === true || params.teamB === true || params.teamF === true),
    sort: 1,
    data: { mastery: 200 }
  }, {
    title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
    check: ({ params }) => params.teamA === true || params.teamB === true || params.teamF === true,
    data: { dmg: 40 }
  }, {
    title: '香菱天赋：[绝云朝天椒] 拾取辣椒会提高[atkPct]%攻击力',
    check: ({ params }) => params.teamA === true,
    sort: 1,
    data: { atkPct: 10 }
  }, {
    title: '香菱6命：[大龙卷旋火轮] 火轮持续期间,队伍中所有角色获得[dmg]%火元素伤害加成',
    check: ({ params }) => params.teamA === true,
    sort: 1,
    data: { dmg: 15 }
  }, {
    title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
    check: ({ params }) => params.teamA === true || params.teamF === true,
    sort: 1,
    data: { atkPlus: 1202.35 }
  }, {
    title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
    check: ({ params }) => params.teamA === true || params.teamF === true,
    sort: 1,
    data: { atkPct: 20 }
  }, {
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
    check: ({ params }) => params.teamB === true,
    data: { dmg: 50 }
  }, {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,使队伍中所有角色的生命值上限提升[hpPct]%',
    check: ({ params, cons }) => cons >= 4 && params.teamB === true,
    data: { hpPct: 40 }
  }, {
    title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
    check: ({ params }) => params.teamB === true || params.teamD === true,
    data: { kx: 20 }
  }, {
    title: '钟离圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
    check: ({ params, artis }) => (params.teamB === true || params.teamD === true) && artis.千岩牢固 !== 4,
    sort: 1,
    data: {
      atkPct: 20,
      shield: 30
    }
  }, {
    title: '罗莎莉亚圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
    check: ({ params, artis }) => params.teamD === true && artis.昔日宗室之仪 !== 4,
    sort: 1,
    data: { atkPct: 20 }
  }, {
    title: '罗莎莉亚天赋：[暗中支援的黯色] 施放终命的圣礼时提高附近的队伍中所有角色[cpct]%暴击率',
    check: ({ params }) => params.teamD === true,
    data: { cpct: 15 }
  }, {
    title: '罗莎莉亚6命：[代行裁判] 终命的圣礼的攻击会使敌人的物理抗性降低[phyKx]%',
    check: ({ params }) => params.teamD === true,
    data: { phyKx: 20 }
  }, {
    title: '夏沃蕾天赋：[尖兵协同战法] 队伍中所有角色的元素类型均为火元素与雷元素，并且至少有一名火元素角色、一名雷元素角色时,角色触发超载反应后，受本次反应影响的敌人的火元素与雷元素抗性降低[kx]%',
    check: ({ params }) => params.teamC === true,
    data: { kx: 40 }
  }, {
    title: '夏沃蕾天赋：[纵阵武力统筹] 夏沃蕾发射近迫式急促拦射的「超量装药弹头」后将使队伍中附近的所有火元素与雷元素角色的攻击力提升[atkPct]%',
    check: ({ params }) => params.teamC === true,
    data: { atkPct: 40 }
  }, {
    title: '夏沃蕾6命：[终结罪恶的追缉] 队伍中的角色受到「近迫式急促拦射」的治疗后，获得[dmg]%火元素伤害加成与雷元素伤害加成',
    check: ({ params }) => params.teamC === true,
    data: { dmg: 60 }
  }, {
    title: '夏沃蕾圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
    check: ({ params }) => params.teamC === true,
    sort: 1,
    data: { atkPct: 20 }
  }, {
    title: '行秋技能：[古华剑·画雨笼山] 场上角色的抗打断能力提升[_interruption]%受到伤害降低[_reduction]%',
    check: ({ params }) => params.teamE === true,
    data: {
      _interruption: 70,
      _reduction: 45.32
    }
  }, {
    title: '珊瑚宫心海武器：[讨龙英杰谭-精5] 主动切换角色时,新登场的角色攻击力提升[atkPct]%',
    check: ({ params }) => params.teamE === true,
    sort: 1,
    data: { atkPct: 48 }
  }, {
    title: '珊瑚宫心海圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
    check: ({ params }) => params.teamE === true,
    sort: 1,
    data: {
      atkPct: 20,
      shield: 30
    }
  }, {
    title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
    check: ({ params }) => params.teamE === true,
    sort: 7,
    data: { mastery: 250 }
  }, {
    title: '纳西妲圣遗物：[深林的记忆4] 元素战技或元素爆发命中敌人后,使命中目标的草元素抗性降低[kx]%',
    check: ({ params, artis }) => params.teamE === true && artis.深林的记忆 !== 4,
    data: { kx: 30 }
  }, {
    title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons < 6 && params.teamE === true,
    sort: 1,
    data: {
      mastery: 40
    }
  }, {
    title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 6 && params.teamE === true,
    sort: 1,
    data: { mastery: 48 }
  }, {
    title: '纳西妲2命：[正等善见之根] 处于纳西妲施加的蕴种印状态下的敌人,受到原激化、超激化、蔓激化反应影响后,防御力降低[enemyDef]%',
    check: ({ params, cons }) => cons >= 2 && params.teamE === true,
    data: { enemyDef: 30 }
  }, {
    title: '莫娜1命：[沉没的预言] 队伍中自己的角色攻击命中处于星异状态下的敌人后,感电反应造成的伤害提升[electroCharged]%,蒸发反应造成的伤害提升[vaporize]%,水元素扩散反应造成的伤害提升[swirl]%,冻结反应的持续时间延长[frozrntimePct]%。',
    check: ({ params, cons }) => cons >= 1 && params.teamF === true,
    data: {
      electroCharged: 15,
      vaporize: 15,
      swirl: 15,
      frozrntimePct: 15
    }
  }, {
    title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时,暴击率提升[cpct]%',
    check: ({ params, cons }) => cons >= 4 && params.teamF === true,
    data: { cpct: 15 }
  }, {
    title: '莫娜技能：[星命定轨] 对敌人施加星异的伤害加成效果,并以此提高[dmg]%这一次造成的伤害',
    check: ({ params }) => params.teamF === true,
    data: { dmg: 60 }
  }, {
    title: '莫娜武器：[讨龙英杰谭-精5] 主动切换角色时,新登场的角色攻击力提升[atkPct]%',
    check: ({ params }) => params.teamF === true,
    sort: 1,
    data: { atkPct: 48 }
  }, {
    title: '莫娜圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
    check: ({ params }) => params.teamF === true,
    sort: 1,
    data: {
      atkPct: 20,
      shield: 30
    }
  },
  'vaporize',
  { title: `4.27最后修改：[4.24重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs96ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}` }
]
