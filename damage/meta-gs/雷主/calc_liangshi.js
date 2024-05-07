import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2003ranking = cfg.gs2003ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '雷影剑'
let eNameT = 'E'
let qName = '雷轰电转'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '异邦惊雷'
    eNameT = '雷影剑'
    qNameT = '雷轰电转'
  } else if (NamePath == 3) {
    eNameT = '雷影剑'
    qNameT = '雷轰电转'
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

const miss = ['a', 'z', 'c', 'h', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'

if (!cfg.gs2003ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'f'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'f'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'f'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[旅行者-雷] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs2003ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${eName}伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: `${eName}激化`,
    dmgKey: 'e',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'aggravate')
  }, {
    title: `${eName}元素充能提升`,
    dmgKey: 'f',
    params: { e: true },
    dmg: ({ attr, calc }) => {
      return {
        avg: Format.percent((calc(attr.recharge) * 10 / 100 + 20) / 100),
        type: 'text'
      }
    }
  }, {
    title: `${qName}释放伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${qName}释放激化`,
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
  }, {
    title: `${qName}落雷伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q')
  }, {
    check: ({ cons }) => cons >= 6,
    title: `${qName}强化落雷`,
    params: { q: true, q2: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q')
  }, {
    title: `${qName}落雷激化`,
    dmgKey: 'q',
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q', 'aggravate')
  }, {
    check: ({ cons }) => cons >= 6,
    title: `${qName}强化落雷激化`,
    params: { q: true, q2: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q', 'aggravate')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
  {
    check: ({ params }) => params.e !== true,
    title: '旅行者技能：[雷影剑] 吸收丰穰勾玉，在持续时间内提高元素充能效率[recharge]%。',
    data: {
      recharge: ({ attr, calc }) => calc(attr.recharge) * 10 / 100 + 20
    }
  }, {
    title: '旅行者天赋：[转瞬的迅雷] 队伍中附近的其他角色获取雷影剑产生的丰穰勾玉时，雷影剑的冷却时间减少[_ecdPlus]秒。 { 该效果单人不生效 }',
    data: {
      _ecdPlus: 1.5
    }
  }, {
    title: '旅行者1命：[丰穰的春雷] 释放雷影剑能产生的丰穰勾玉数量提升至3枚',
    cons: 1
  }, {
    title: '旅行者2命：[震怒的苍雷] 雷轰电转的威光命中敌人后，会使敌人的雷元素抗性降低[kx]%',
    check: ({ params }) => params.q === true,
    cons: 2,
    data: {
      kx: 15
    }
  }, {
    title: '旅行者6命：[撼世的神雷] 雷轰电转每引发2次威光落雷，就使下一次威光落雷造成的伤害提高[qDmg]%，并为当前角色额外恢复[_energyevery]点元素能量。',
    check: ({ params }) => params.q2 === true,
    cons: 6,
    data: {
      qDmg: 15,
      _energyevery: 1
    }
  },
  { title: `5.8最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2003ranking} 更新日志:${renew} 其他信息:${information}` }
]
