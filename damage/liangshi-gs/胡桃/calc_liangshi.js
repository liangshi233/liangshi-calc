import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs46ranking = cfg.gs46ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '血梅香'
let eNameT = 'E'
let qName = '安神秘法'
let qNameT = 'Q'
let tName = '半血'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '往生堂秘传枪法'
    eNameT = '蝶引来生'
    qNameT = '安神秘法'
    tName = '一半生命值'
  } else if (NamePath == 3) {
    eNameT = '蝶引来生'
    qNameT = '安神秘法'
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
    // 我也不知道该怎么叫了，现在这个叫法应该能看懂吧，觉得不合适的可以用下面注释掉的
    // a2Name = '戳'
    // a3Name = '插'
    eName = 'E'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
  }
}
const miss = ['c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs46ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'z'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[胡桃] 排名规则均未命中，已选择默认排名规则')
        ranking = 'z'
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
  ranking = `${gs46ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '12.27-修复攻击力提升不正确的问题'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${tName}开${eNameT}${aName}一段`,
    dmgKey: 'undefined',
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `${tName}开${eNameT}${a2Name}`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  }, {
    title: `${tName}开${eNameT}${aName}一段蒸发`,
    dmgKey: 'a',
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${a2Name}蒸发`,
    dmgKey: 'z',
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
  }, {
    title: `${eName}伤害`,
    dmgKey: 'e',
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e')
  }, {
    title: `${tName}开${eNameT}后${qNameT}`,
    dmgKey: 'q',
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q')
  }, {
    title: `胡行夜钟 ${a2Name}蒸发`,
    params: { teamA: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
  }, {
    title: `胡行夜钟 ${qNameT}蒸发`,
    params: { teamA: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [
  {
    title: '胡桃技能：[蝶引来生] 消耗一部分生命值,击退周围敌人,基于进入该状态时胡桃的生命值上限,提高胡桃[atkPlus]点攻击力',
    sort: 9,
    data: {
      atkPlus: ({ talent, attr, calc }) => {
        return Math.min(talent.e['攻击力提高'] * calc(attr.hp) / 100, attr.atk.base * 4)
      }
    }
  }, {
    title: '胡桃天赋：[血之灶火] 胡桃的生命值低于或等于50%时,获得[dmg]%火元素伤害加成',
    data: {
      dmg: 33
    }
  }, {
    title: '胡桃1命：[赤团开时斜飞去] 处于蝶引来生施加的彼岸蝶舞状态下时,胡桃的重击体力消耗减少[_a2Stamina]% ',
    cons: 1,
    data: {
      _a2Stamina: 100
    }
  }, {
    title: '胡桃2命：[最不安神晴又复雨] 血梅香造成的伤害提高[ePlus]点,安神秘法会为命中的敌人施加血梅香效果',
    cons: 2,
    sort: 9,
    data: {
      ePlus: ({ attr, calc }) => calc(attr.hp) * 0.1
    }
  }, {
    title: '胡桃6命：[幽蝶能留一缕芳] 胡桃的生命值降至25%以下,或承受足以使她倒下的伤害时胡桃的所有元素抗性和物理抗性提高[_res]%,暴击率提高[_cpct]%,并提高[_interruption]%抗打断能力 { 此效果不会参与伤害计算 }',
    cons: 6,
    data: {
      _interruption: 100,
      _cpct: 100,
      _res: 200
    }
  }, {
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
    check: ({ params }) => params.teamA === true,
    data: {
      dmg: 50
    }
  }, {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
    check: ({ params }) => params.teamA === true,
    sort: 1,
    cons: 4,
    data: {
      hpPct: 40
    }
  }, {
    title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
    check: ({ params }) => params.teamA === true,
    data: {
      kx: 20
    }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamA === true,
    data: {
      hpPct: 25
    }
  },
  'vaporize',
  { title: `2.28最后修改：[11.6重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs46ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}` }
]
