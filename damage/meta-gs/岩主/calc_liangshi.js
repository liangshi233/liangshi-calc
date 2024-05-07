import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2002ranking = cfg.gs2002ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '星陨剑'
let eNameT = 'E'
let qName = '岩潮叠嶂'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '异邦岩峰'
    eNameT = '星陨剑'
    qNameT = '岩潮叠嶂'
  } else if (NamePath == 3) {
    eNameT = '星陨剑'
    qNameT = '岩潮叠嶂'
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

if (!cfg.gs2002ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'e'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'e'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'e'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[旅行者-岩] 排名规则均未命中，已选择默认排名规则')
        ranking = 'e'
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
  ranking = `${gs2002ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}崩毁伤害`,
    dmgKey: 'a',
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 60 / 100, 'a')
  }, {
    title: `${eName}伤害`,
    dmgKey: 'e',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: `${qName}单段伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['地震波单次伤害'], 'q')
  }, {
    title: `${qName}完整伤害`,
    dmgKey: 'q',
    params: { q: true },
    dmg: ({ talent }, dmg) => {
      let q1 = dmg(talent.q['地震波单次伤害'], 'q')
      return {
        dmg: q1.dmg * 4,
        avg: q1.avg * 4
      }
    }
  }, {
    check: ({ cons }) => cons >= 1,
    title: `${qNameT}后${eName}伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: '结晶护盾吸收量',
    dmgKey: 'r',
    dmg: ({}, { reaction }) => reaction('crystallize')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
  {
    title: '旅行者天赋：[破碎的绝岩] 星陨剑的冷却时间减少[_ecdPlus]秒',
    data: {
      _ecdPlus: 2
    }
  }, {
    title: '旅行者1命：[巍然的青岩] 队伍中角色处于岩潮叠嶂的岩嶂包围中时，暴击率提升[cpct]%，并提高抗打断能力。',
    check: ({ params }) => params.q === true,
    cons: 1,
    data: {
      cpct: 10
    }
  }, {
    title: '旅行者4命：[巍然的青岩] 岩潮叠嶂引发的震荡波击中敌人，会恢复[_energyevery]点元素能量。',
    cons: 4,
    data: {
      _energyevery: 25
    }
  }, {
    title: '旅行者6命：[永世的磐岩] 岩潮叠嶂的岩嶂持续时间延长[_qSustainedPlus]秒；星陨剑的荒星持续时间延长[_eSustainedPlus]秒。',
    cons: 6,
    data: {
      _qSustainedPlus: 5,
      _eSustainedPlus: 10
    }
  },
  { title: `5.8最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2002ranking} 更新日志:${renew} 其他信息:${information}` }
]
