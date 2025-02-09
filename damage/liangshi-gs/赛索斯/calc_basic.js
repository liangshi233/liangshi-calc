import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs97ranking = cfg.gs97ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a2Name2 = '贯影箭'
let a3Name = '下落攻击'
let eName = '古仪·鸣砂掣雷'
let eNameT = 'E'
let qName = '秘仪·瞑光贯影'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '王家苇箭术'
    eNameT = '古仪·鸣砂掣雷'
    qNameT = '秘仪·瞑光贯影'
  } else if (NamePath == 3) {
    eNameT = '古仪·鸣砂掣雷'
    qNameT = '秘仪·瞑光贯影'
  } else if (NamePath == 4) {
    a2Name2 = '二段蓄力'
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a2Name2 = '二段蓄力'
    a3Name = '下落'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'Z'
    a2Name2 = '2Z'
    a3Name = '戳'
    eName = 'E'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['q', 'z', 'c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'

if (!cfg.gs97ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'a'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'a'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'a'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[赛索斯] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs97ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${a2Name2}`,
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.a['贯影箭伤害2'][0] * calc(attr.atk) / 100 + talent.a['贯影箭伤害2'][1] * calc(attr.mastery) / 100, 'a2')
  }, {
    title: `${a2Name2}激化`,
    dmgKey: 'z',
    dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.a['贯影箭伤害2'][0] * calc(attr.atk) / 100 + talent.a['贯影箭伤害2'][1] * calc(attr.mastery) / 100, 'a2', 'aggravate')
  }, {
    title: `${eName}伤害`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: `${eName}激化伤害`,
    dmgKey: 'e',
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['技能伤害'], 'e', 'aggravate')
  }, {
    title: `${qNameT}后${aName}一段`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a2')
  }, {
    title: `${qNameT}后${aName}一段激化`,
    dmgKey: 'undefined',
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a2', 'aggravate')
  }, {
    title: `${qNameT}后${aName}三段`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a2')
  }, {
    title: `${qNameT}后${aName}三段激化`,
    dmgKey: 'a',
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a2', 'aggravate')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '赛索斯技能：[古仪·鸣砂掣雷] 对敌人触发了感电、超导、超载、原激化、超激化、超绽放或雷元素扩散反应，恢复[_energyevery]元素能量',
    data: {
      _energyevery: 12
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '赛索斯技能：[秘仪·瞑光贯影] 普通攻击将转为发射能穿透敌人的暝弦矢提升其造成的伤害[a2Plus]',
    data: {
      a2Plus: ({ talent, attr, calc }) => calc(attr.mastery) * talent.q['瞑弦矢伤害提升'] / 100
    }
  }, {
    title: '赛索斯天赋：[黑鸢的密喻] 瞄准射击时，使蓄力时间降低至0.3秒，并获得[_energyevery]元素能量',
    data: {
      _energyevery: -20
    }
  }, {
    check: ({ params }) => params.q !== true,
    title: '赛索斯天赋：[砂王的赐礼] 「热砂炫影」效果，使贯影箭造成的伤害值提升[a2Plus]',
    data: {
      a2Plus: ({ attr, calc }) => calc(attr.mastery) * 700 / 100
    }
  }, {
    check: ({ params }) => params.q !== true,
    title: '赛索斯1命：[封龛谒灵歌] 贯影箭的暴击率提升[a2Cpct]%',
    cons: 1,
    data: {
      a2Cpct: 15
    }
  }, {
    title: '赛索斯2命：[寂秘纸草经] 通过古仪·鸣砂掣雷恢复元素能量或施放秘仪·瞑光贯时获得[dmg]%雷元素伤害加成',
    cons: 2,
    data: {
      dmg: 15 * 2
    }
  }, {
    title: '赛索斯4命：[真念鸵羽集] 贯影箭与暝弦矢命中2名及以上的敌人时，队伍中附近的所有角色的元素精通提升[mastery]',
    cons: 4,
    data: {
      mastery: 80
    }
  }, {
    title: '赛索斯6命：[巡日塔门书] 贯影箭命中敌人后，将返还因固有天赋「黑鸢的密喻」消耗的元素能量',
    cons: 6
  },
  'aggravate',
  { title: `6.10最后修改：[4.25重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs97ranking} 更新日志:${renew} 其他信息:${information}` }
]
