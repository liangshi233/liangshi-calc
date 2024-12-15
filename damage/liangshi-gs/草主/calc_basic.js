import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2004ranking = cfg.gs2004ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '草缘剑'
let eNameT = 'E'
let qName = '草灯莲'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '异邦草翦'
    eNameT = '草缘剑'
    qNameT = '草灯莲'
  } else if (NamePath == 3) {
    eNameT = '草缘剑'
    qNameT = '草灯莲'
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

const miss = ['a', 'z', 'c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs2004ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'e'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'e'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'e'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[旅行者-草] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs2004ranking}`
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
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
  }, {
    title: `${qName}单段伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q')
  }, {
    title: `${qName}单段激化`,
    dmgKey: 'q',
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q', 'spread')
  }, {
    title: `${qName}爆发伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['激烈爆发伤害'], 'q')
  }, {
    title: `${qNameT}后${eName}伤害`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: `${qNameT}后${eName}激化`,
    params: { q: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
  }, {
    title: '草原核伤害',
    dmgKey: 'r',
    dmg: ({ calc, attr }, { reaction }) => reaction('bloom')
  }]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,
{
  title: '任务加成：[单手剑战斗技巧•八] 在任务『近在咫尺的目标』中使用『单手剑战斗技巧•八』后，基础攻击力提升[_atkPlus]点 { 此效果暂不参与计算 }',
  data: {
    _atkPlus: 3
  }
},
  {
    title: '旅行者天赋：[蔓生的埜草] 草灯莲将在其存在期间每秒获得一层莲光遍照效果，使其领域内的当前场上角色的元素精通提升[mastery]点元素精通。',
    check: ({ params }) => params.q === true,
    data: {
      mastery: 60
    }
  }, {
    title: '旅行者天赋：[繁庑的丛草] 草缘剑造成的伤害提升[eDmg]%，偃草若化造成的伤害提升[qDmg]%',
    data: {
      eDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery)) * 0.15),
      qDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery)) * 0.1)
    }
  }, {
    title: '旅行者1命：[寄身的倚草] 草缘剑命中敌人后，将恢复[_energyevery]点元素能量。',
    cons: 1,
    data: {
      _energyevery: 3.5
    }
  }, {
    title: '旅行者2命：[健韧的劲草] 草灯莲的存在时间延长[_qSustainedPlus]秒。',
    cons: 2,
    data: {
      _qSustainedPlus: 3
    }
  }, {
    title: '旅行者6命：[蕴思的霜草] 处于草灯莲的莲光遍照效果影响下的角色获得[dmg]%草元素伤害加成。',
    check: ({ params }) => params.q === true,
    cons: 6,
    data: {
      dmg: 12
    }
  },
  { title: `5.8最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2004ranking} 更新日志:${renew} 其他信息:${information}` }
]
