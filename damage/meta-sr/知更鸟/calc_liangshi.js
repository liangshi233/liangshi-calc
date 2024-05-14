import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1309ranking = cfg.sr1309ranking
let aName = '普通攻击'
let eName = '翎之咏叹调'
let eNameT = 'E'
let qName = '千音迭奏，群星赋格'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '扑翼白声'
    eNameT = '翎之咏叹调'
    qNameT = '千音迭奏，群星赋格'
  } else if (NamePath == 3) {
    eNameT = '翎之咏叹调'
    qNameT = '千音迭奏，群星赋格'
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
if (!cfg.sr1309ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'f'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'f'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'f'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[知更鸟] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${sr1309ranking}`
}

let renew = '5.14 修复追加攻击会异常受到自身暴击伤害提升'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: `${eName}伤害提高`,
    dmgKey: 'undefined',
    dmg: ({ talent }) => {
      return {
        avg: Format.percent(talent.e['伤害提高']),
        type: 'text'
      }
    }
  }, {
    title: `${eNameT}后${aName}伤害`,
    dmgKey: 'a',
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
  }, {
    title: `${qName}攻击力提高`,
    dmgKey: 'f',
    dmg: ({ talent, attr, calc }) => {
      return {
        avg: Math.floor((calc(attr.atk) * talent.q['攻击力提高百分比'] + talent.q['攻击力提高固定值']) * 100) / 100,
        type: 'text'
      }
    }
  }, {
    title: `${qName}附加伤害`,
    dmgKey: 'q',
    params: { e: true, q: true },
    dmg: ({ talent, cons }, dmg) => {
      let q1 = dmg(talent.q['附加伤害'], 't')
      let cosn6 = 1 + (cons * 1 >= 6 ? 6.00 : 1.50)
      return {
        avg: q1.avg * cosn6
      }
    }
  }
]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgKey = `${ranking}`
export const defParams = { technique: `${Technique}` }

export const buffs = [
  {
    check: ({ params }) => params.technique >= 1,
    title: '知更鸟秘技：[酣醉序曲] 领域展开期间进入战斗后，每个波次开始时恢复[_energyevery]点能量。',
    data: {
      _energyevery: 5
    }
  }, {
    check: ({ params }) => params.e === true,
    title: '知更鸟技能：[翎之咏叹调] 使我方全体造成的伤害提高[dmg]%',
    data: {
      dmg: ({ talent }) => talent.e['伤害提高'] * 100
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '知更鸟技能：[千音迭奏，群星赋格] 【协奏】状态，使我方全体攻击力提高[atkPlus]',
    data: {
      atkPlus: ({ talent, calc, attr }) => calc(attr.atk) * talent.q['攻击力提高百分比'] + talent.q['攻击力提高固定值'] * 1,
      tCpct: -2147483647
    }
  }, {
    title: '知更鸟天赋：[调性合颂] 使我方全体暴击伤害提高[cdmg]%，且我方目标攻击敌方目标后，知更鸟额外为自身恢复[_energyevery]点能量。',
    data: {
      cdmg: ({ talent }) => talent.t['暴伤提高'] * 100,
      _energyevery: 2
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '知更鸟1魂：[微笑的国度] 处于【协奏】状态时，我方全体全属性抗性穿透提高[kx]%',
    cons: 1,
    data: {
      kx: 24
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '知更鸟2魂：[两者的午茶] 处于【协奏】状态时，我方全体速度提高[speedPct]%，天赋的能量恢复效果额外提高[_energyevery]点',
    cons: 2,
    data: {
      speedPct: 16,
      _energyevery: 1
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '知更鸟4魂：[雨滴的钥匙] 施放终结技时，解除我方全体的控制类负面状态，使我方全体在知更鸟处于【协奏】状态期间的效果抵抗提高[effDef]%',
    cons: 4,
    data: {
      effDef: 50
    }
  }, {
    check: ({ params }) => params.q === true,
    title: '知更鸟6魂：[月隐的午夜] 处于【协奏】状态时，终结技造成的物理属性附加伤害的暴击伤害额外提高[_cdmg]%。',
    cons: 6,
    data: {
      _cdmg: 450
    }
  },
  { title: `5.14最后修改：[3.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1309ranking} 更新日志:${renew} 其他信息:${information}` }
]
