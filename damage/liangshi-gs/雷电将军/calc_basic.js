import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs52ranking = cfg.gs52ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '神变·恶曜开眼'
let eNameT = 'E'
let qName = '奥义·梦想真说'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '源流'
    eNameT = '神变·恶曜开眼'
    qNameT = '奥义·梦想真说'
  } else if (NamePath == 3) {
    eNameT = '神变·恶曜开眼'
    qNameT = '奥义·梦想真说'
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

const miss = ['a', 'c', 'h', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'

if (!cfg.gs52ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'q'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'q'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'q'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[雷电将军] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs52ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '4.11 修复命座效果异常'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${eName}协同攻击`,
    dmgKey: 'e',
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['协同攻击伤害'], 'e')
  }, {
    title: '超绽放伤害',
    dmgKey: 'undefined',
    dmg: ({}, { reaction }) => {
      return reaction('hyperBloom')
    }
  }, {
    title: `零愿力${qName}`,
    params: { type: 0, Resolve: 0 },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
  }, {
    title: `满愿力${qName}`,
    dmgKey: 'q',
    params: { type: 0, Resolve: 60 },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
  }, {
    title: `满愿力${qName}激化`,
    params: { type: 0, Resolve: 60 },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q', 'aggravate')
  }, {
    title: `零愿力${qNameT}后${a2Name}`,
    params: { type: 1, Resolve: 0 },
    dmg: ({ talent, attr }, dmg) => {
      let qz1 = dmg(talent.q['重击伤害'] / 2, 'q')
      return {
        dmg: qz1.dmg * 2,
        avg: qz1.avg * 2
      }
    }
  }, {
    title: `满愿力${qNameT}后${a2Name}`,
    params: { type: 1, Resolve: 60 },
    dmgKey: 'z',
    dmg: ({ talent, attr }, dmg) => {
      let qz1 = dmg(talent.q['重击伤害'], 'q')
      return {
        dmg: qz1.dmg * 2,
        avg: qz1.avg * 2
      }
    }
  }, {
    title: `满愿力${qNameT}后${a2Name}激化`,
    params: { type: 1, Resolve: 60 },
    dmg: ({ talent, attr }, dmg) => {
      let qzj1 = dmg(talent.q['重击伤害'], 'q', 'aggravate')
      return {
        dmg: qzj1.dmg * 2,
        avg: qzj1.avg * 2
      }
    }
  }, {
    title: `${qName}单次能量恢复`,
    dmgKey: 'f',
    dmg: ({ talent, calc, attr }) => {
      return {
        avg: Format.number(talent.q['梦想一心能量恢复'] * (1 + ((calc(attr.recharge) - 100) * 0.006))),
        type: 'text'
      }
    }
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,recharge,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    title: '雷电将军技能：[神变·恶曜开眼] 获授雷罚恶曜之眼的角色在持续期间内元素爆发造成的伤害获得[qDmg]%提升',
    data: {
      qDmg: ({ talent }) => talent.e['元素爆发伤害提高'] * 90
    }
  },
  {
    check: ({ params }) => params.Resolve !== undefined,
    title: '雷电将军技能：[奥义·梦想真说] 施放消耗[buffCount]层诸愿百眼之愿力,增加梦想一刀与梦想一心的攻击造成的伤害[qPct]%,抗打断能力提高[_interruption]%,并免疫感电反应的伤害。',
    data: {
      buffCount: ({ params }) => params.Resolve,
      qPct: ({ talent, params }) => talent.q['愿力加成'][params.type || 0] * params.Resolve,
      _interruption: 100
    }
  },
  {
    title: '雷电将军天赋：[殊胜之御体] 基于元素充能效率超过100%的部分,使雷元素伤害加成提升[dmg]%,梦想一心状态提供的元素能量恢复提高[_recharge]%',
    sort: 4,
    data: {
      dmg: ({ attr }) => Math.max(attr.recharge.base + attr.recharge.plus - 100, 0) * 0.4,
      _recharge: ({ attr }) => Math.max(attr.recharge.base + attr.recharge.plus - 100, 0) * 0.6
    }
  },
  {
    title: '雷电将军2命：[斩铁断金] 奥义·梦想真说的梦想一刀与梦想一心状态期间的攻击将无视敌人[qIgnore]%的防御力。',
    cons: 2,
    data: {
      qIgnore: 60
    }
  },
  { title: `4.11最后修改：[1.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs52ranking} 更新日志:${renew} 其他信息:${information}` }
]
