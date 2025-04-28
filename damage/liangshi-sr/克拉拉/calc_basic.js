import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let a3Dmg = { dmg: 0, avg: 0 }
let ar3Dmg = { dmg: 0, avg: 0 }
let q1Dmg = { dmg: 0, avg: 0 }
let q2Dmg = { dmg: 0, avg: 0 }
let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1107ranking = cfg.sr1107ranking
let aName = '普通攻击'
let eName = '史瓦罗在看着你'
let eNameT = 'E'
let qName = '是约定不是命令'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '我也想帮上忙'
    eNameT = '史瓦罗在看着你'
    qNameT = '是约定不是命令'
  } else if (NamePath == 3) {
    eNameT = '史瓦罗在看着你'
    qNameT = '是约定不是命令'
  } else if (NamePath == 4) {
    eName = '战技'
    qName = '终结技'
    eNameT = '战技'
    qNameT = '终结技'
  } else if (NamePath == 5) {
    aName = '普攻'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    eName = 'E'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['c', 'f', 'h', 'y', 'hph', 'hps', 'dph', 'dps']
let ranking = 'undefined'
if (!cfg.sr1107ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'z'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[克拉拉] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${sr1107ranking}`
}

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: `${eName}伤害`,
    dmgKey: 'e',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: '反击伤害',
    params: { Revenge: true },
    dmgKey: 'undefined',
    dmg: ({ talent }, dmg) => dmg(talent.t['反击伤害'], 't')
  }, {
    title: `${qName}伤害提升量`,
    params: { Revenge: true },
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['伤害倍率提高'], 't')
  }, {
    title: `${qNameT} 反击伤害`,
    params: { Revenge: true },
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => dmg(talent.q['伤害倍率提高'] + talent.t['反击伤害'], 't')
  }, {
    title: `${qNameT} 反击相邻伤害`,
    params: { Revenge: true },
    dmg: ({ talent }, dmg) => dmg((talent.q['伤害倍率提高'] + talent.t['反击伤害']) * 0.5, 't')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,speed'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    title: '克拉拉天赋：[因为我们是家人] 克拉拉在史瓦罗的保护下受到敌方目标攻击的伤害降低[_reduction]%',
    data: {
      _reduction: 10
    }
  }, {
    title: '克拉拉技能：[是约定不是命令] 受到的伤害额外降低[_reduction]%，同时史瓦罗的反击得到强化，对敌方目标造成的伤害倍率提高[_tMulti]%',
    data: {
      _reduction: ({ talent }) => talent.q['伤害降低'] * 100,
      _tMulti: ({ talent }) => talent.q['伤害倍率提高'] * 100
    }
  }, {
    check: ({ params }) => params.Revenge === true,
    title: '克拉拉行迹：[****] 史瓦罗的反击造成的伤害提高[tDmg]%',
    tree: 3,
    data: {
      tDmg: 30
    }
  }, {
    title: '克拉拉2魂：[紧紧的拥抱] 施放终结技后攻击力提高[atkPct]%',
    cons: 2,
    data: {
      atkPct: 30
    }
  }, {
    title: '克拉拉4魂：[家人的温暖] 受到攻击后，受到的伤害降低[_reduction]%',
    cons: 4,
    data: {
      _reduction: 30
    }
  }, {
    title: '克拉拉6魂：[长久的陪伴] 我方其它目标遭到攻击时，史瓦罗也有50%的固定概率触发对攻击者的反击，并对攻击目标添加【反击标记】。施放终结技时，额外增加1次强化反击的次数。',
    cons: 6
  },
  { title: `3.21最后修改：[3.21重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1107ranking} 更新日志:${renew} 其他信息:${information}` }
]
