import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1315ranking = cfg.sr1315ranking
let aName = '普通攻击'
let eName = '炽砾舞者的探戈'
let eNameT = 'E'
let qName = '尘****者的日落秀'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '蹄铁裂颅'
    eNameT = '炽砾舞者的探戈'
    qNameT = '尘****者的日落秀'
  } else if (NamePath == 3) {
    eNameT = '炽砾舞者的探戈'
    qNameT = '尘****者的日落秀'
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

const miss = ['z', 'c', 'h', 'y', 'hph', 'hps', 'dph', 'dps']
let ranking = 'undefined'
if (!cfg.sr1315ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'f'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'f'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'f'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[波提欧] 排名规则均未命中，已选择默认排名规则')
        ranking = 'f'
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
  ranking = `${sr1315ranking}`
}

let renew = '5.30 修复六魂击破加成异常'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: `${eNameT}后${aName}伤害`,
    dmgKey: 'a',
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a2['技能伤害'], 'a')
  }, {
    title: `${qName}伤害`,
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${qName}行动延后`,
    dmgKey: 'f',
    dmg: ({ talent, attr, calc }) => {
      return {
        avg: talent.q['行动延后'],
        type: 'text'
      }
    }
  }, {
    title: '天赋一层击破-精英敌人',
    params: { toughness: 10 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 0.4 : 0
      return {
        avg: reaction('iceBreak').avg / 0.9 * (params.toughness + 2) / 4 * (talent.t['1层伤害'] + cons6)
      }
    }
  }, {
    title: '天赋二层击破-精英敌人',
    params: { toughness: 10 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 0.4 : 0
      return {
        avg: reaction('iceBreak').avg / 0.9 * (params.toughness + 2) / 4 * (talent.t['2层伤害'] + cons6)
      }
    }
  }, {
    title: '天赋三层击破-精英敌人',
    params: { toughness: 10 },
    dmg: ({ talent, cons, params }, { reaction }) => {
      let cons6 = cons * 1 >= 6 ? 0.4 : 0
      return {
        avg: reaction('iceBreak').avg / 0.9 * (params.toughness + 2) / 4 * (talent.t['3层伤害'] + cons6)
      }
    }
  }
]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgKey = `${ranking}`
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
  {
    title: '敌人状态：[韧性] 具有[toughness]韧性',
    data: {
      toughness: ({ params }) => params.toughness == 0 ? 0 : (params.toughness || 0)
    }
  }, {
    check: ({ params }) => params.technique >= 1,
    title: '波提欧秘技：[三乘九的微笑] 下一次战斗首次施放战技时，为目标添加与终结技相同的物理弱点'
  }, {
    check: ({ params }) => params.e === true,
    title: '波提欧技能：[炽砾舞者的探戈] 处于【****对峙】的敌方目标受到攻击时，受到的伤害提高[enemydmg]%，自身受到伤害提高[_dmg]%',
    data: {
      enemydmg: ({ talent }) => talent.e['敌方受到的伤害提高'] * 100,
      _dmg: 15
    }
  }, {
    title: '波提欧行迹：[幽灵装填] 使自身暴击率提高[cpct]%，暴击伤害提高[cdmg]%',
    data: {
      cpct: ({ calc, attr }) => Math.min(30, (calc(attr.stance) * 10 / 100)),
      cdmg: ({ calc, attr }) => Math.min(150, (calc(attr.stance) * 50 / 100))
    }
  }, {
    title: '波提欧行迹：[抵近射击] 处于【****对峙】并获得【优势口袋】时，恢复[_energyevery]点能量',
    data: {
      _energyevery: 10
    }
  }, {
    title: '波提欧行迹：[蛇之上行] 受到未处于【****对峙】目标的伤害降低[_reduction]%',
    data: {
      _reduction: 30
    }
  }, {
    title: '波提欧1魂：[蛇之上行] 战斗开始时，获得1层【优势口袋】。造成伤害时无视敌方目标[ignore]%的防御力。',
    cons: 1,
    data: {
      ignore: 16
    }
  }, {
    title: '波提欧2魂：[蛇之上行] 处于【****对峙】并获得【优势口袋】时，恢复[skillPoints]个战技点，并且击破特攻提高[stance]%',
    cons: 2,
    data: {
      skillPoints: 1,
      stance: 30
    }
  }, {
    check: ({ params }) => params.e === true,
    title: '波提欧4魂：[冷肉名厨] 对处于【****对峙】的敌方目标造成伤害提升[dmg]%受到伤害降低[_reduction]%',
    cons: 4,
    data: {
      dmg: 12,
      _reduction: 12
    }
  }, {
    title: '波提欧6魂：[撬棍旅馆的浣熊] 触发天赋造成击破伤害时，对目标额外造成击破伤害',
    cons: 6
  },
  { title: `5.30最后修改：[4.23重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1315ranking} 更新日志:${renew} 其他信息:${information}` }
]
