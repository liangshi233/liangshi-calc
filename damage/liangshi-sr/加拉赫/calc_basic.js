import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1301ranking = cfg.sr1301ranking
let aName = '普通攻击'
let a2Name = '酒花奔涌'
let eName = '罐装特调'
let eNameT = 'E'
let qName = '香槟仪礼'
let qNameT = 'Q'
let tName = '鏖战正酣'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '开瓶费'
    eNameT = '罐装特调'
    qNameT = '香槟仪礼'
  } else if (NamePath == 3) {
    eNameT = '罐装特调'
    qNameT = '香槟仪礼'
  } else if (NamePath == 4) {
    a2Name = '强化普攻'
    eName = '战技'
    qName = '终结技'
    eNameT = '战技'
    qNameT = '终结技'
    tName = '天赋'
  } else if (NamePath == 5) {
    aName = '普攻'
    a2Name = '强化普攻'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
    tName = '天赋'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'A2'
    eName = 'E'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
    tName = 'T'
  }
}

const miss = ['e', 'z', 'f', 'y', 'dps', 'dph', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.sr1301ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'h'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'h'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'h'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[加拉赫] 排名规则均未命中，已选择默认排名规则')
        ranking = 'h'
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
  ranking = `${sr1301ranking}`
}

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: `${a2Name}伤害`,
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a2['技能伤害'], 'a')
  }, {
    title: `${eName}生命恢复`,
    dmgKey: 'h',
    dmg: ({ talent }, { heal }) => heal(talent.e['生命值回复'])
  }, {
    title: `${qName}伤害`,
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${tName}生命恢复`,
    dmgKey: 'undefined',
    dmg: ({ talent }, { heal }) => heal(talent.t['生命值回复'])
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,speed'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    check: ({ params }) => params.technique >= 1,
    title: '加拉赫秘技：[亲启佳酿] 进入战斗后对敌方全体造成火属性伤害。'
  }, {
    title: '加拉赫技能：[鏖战正酣] 【酩酊】使目标受到的击破伤害提高[_dmg]%',
    data: {
      _dmg: ({ talent }) => talent.t['击破伤害提高'] * 100
    }
  }, {
    title: '加拉赫技能：[****花奔涌] 受到强化普攻酒花奔涌攻击的目标攻击力降低[atkDef]%',
    data: {
      atkDef: ({ talent }) => talent.a2['攻击力降低'] * 100
    }
  }, {
    title: '加拉赫行迹：[崭新配方] 使自身提供的治疗量提高[heal]%',
    tree: 1,
    data: {
      heal: ({ calc, attr }) => Math.min(75, (calc(attr.stance) * 50) / 100)
    }
  }, {
    title: '加拉赫1魂：[盐与犬] 进入战斗后会恢复[_energyevery]点能量，效果抵抗提高[effDef]%',
    cons: 1,
    data: {
      effDef: 50,
      _energyevery: 20
    }
  }, {
    title: '加拉赫6魂：[****与沙] 击破特攻提高[stance]%',
    cons: 6,
    data: {
      stance: 20
    }
  }
]
