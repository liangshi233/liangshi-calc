import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2001ranking = cfg.gs2001ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '风涡剑'
let eNameT = 'E'
let qName = '风息激荡'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '异邦铁风'
    eNameT = '风涡剑'
    qNameT = '风息激荡'
  } else if (NamePath == 3) {
    eNameT = '风涡剑'
    qNameT = '风息激荡'
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
if (!cfg.gs2001ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'q'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'q'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'q'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[旅行者-风] 排名规则均未命中，已选择默认排名规则')
        ranking = 'q'
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
  ranking = `${gs2001ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}风刃伤害`,
    dmgKey: 'a',
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 60 / 100, 'a')
  }, {
    title: '初始切割伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['初始切割伤害'], 'e')
  }, {
    title: '初始爆风伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['初始爆风伤害'], 'e')
  }, {
    title: '最大切割伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['最大切割伤害'], 'e')
  }, {
    title: '最大爆风伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['最大爆风伤害'], 'e')
  }, {
    title: `${eName}完整伤害`,
    dmgKey: 'e',
    dmg: ({ talent }, dmg) => {
      let e1 = dmg(talent.e['初始切割伤害'], 'e')
      let e3 = dmg(talent.e['最大切割伤害'], 'e')
      let e4 = dmg(talent.e['最大爆风伤害'], 'e')
      return {
        dmg: e1.dmg * 2 + e3.dmg * 4 + e4.dmg,
        avg: e1.avg * 2 + e3.avg * 4 + e4.avg
      }
    }
  }, {
    title: `${qName}每跳伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['龙卷风伤害'], 'q')
  }, {
    title: `${qName}完整伤害`,
    dmgKey: 'q',
    params: { q: true },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['龙卷风伤害'], 'q')
      return {
        dmg: q1.dmg * 9,
        avg: q1.avg * 9
      }
    }
  }, {
    title: '扩散反应伤害',
    dmgKey: 'r',
    dmg: ({}, { reaction }) => reaction('swirl')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
  {
    title: '旅行者2命：[革新的旋风] 元素充能效率提升[recharge]%',
    cons: 2,
    data: {
      recharge: 16
    }
  }, {
    title: '旅行者4命：[眷护的和风] 风涡剑持续期间，受到的伤害降低[_reduction]%',
    cons: 4,
    data: {
      _reduction: 10
    }
  }, {
    title: '旅行者6命：[纠缠的信风] 受到风息激荡伤害的目标，风元素抗性下降[kx]%',
    check: ({ params }) => params.q === true,
    cons: 6,
    data: {
      kx: 20
    }
  },
  { title: `5.8最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2001ranking} 更新日志:${renew} 其他信息:${information}` }
]
