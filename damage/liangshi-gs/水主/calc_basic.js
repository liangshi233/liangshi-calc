import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2005ranking = cfg.gs2005ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '水纹剑'
let eNameT = 'E'
let qName = '扬水制流'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '异邦激流'
    eNameT = '水纹剑'
    qNameT = '扬水制流'
  } else if (NamePath == 3) {
    eNameT = '水纹剑'
    qNameT = '扬水制流'
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
if (!cfg.gs2005ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'e'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'e'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'e'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[旅行者-水] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs2005ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: '水滴伤害',
    dmgKey: 'undefined',
    dmg: ({ talent }, dmg) => dmg(talent.e['露滴伤害'], 'e')
  }, {
    title: `${eName}伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e')
  }, {
    title: `${eName}蒸发`,
    dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e', 'vaporize')
  }, {
    title: '充盈水滴伤害',
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['露滴伤害'], 'e')
  }, {
    title: `充盈${eName}伤害`,
    params: { e2: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e')
  }, {
    title: `充盈${eName}蒸发`,
    dmgKey: 'e',
    params: { e2: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e', 'vaporize')
  }, {
    title: `${qName}单段伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${qName}单段蒸发`,
    dmgKey: 'q',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
{
  title: '任务加成：[单手剑战斗技巧•八] 在任务『近在咫尺的目标』中使用『单手剑战斗技巧•八』后，基础攻击力提升[_atkPlus]点 { 此效果暂不参与计算 }',
  data: {
    _atkPlus: 3
  }
},
  {
    check: ({ params }) => params.e === true,
    title: '旅行者技能：[水纹剑] 长按施放时，若生命值高于50%，露滴造成的伤害将提高[ePlus]，并且每秒损失[_deHp]生命值。',
    data: {
      ePlus: ({ talent, calc, attr }) => calc(attr.hp) * talent.e['充盈伤害增加'] / 100,
      _deHp: ({ calc, attr }) => calc(attr.hp) * 4 / 100
    }
  }, {
    check: ({ params }) => params.e2 === true,
    title: '旅行者天赋：[澄明的净水] 长按施放水纹剑时如果通过充盈消耗了生命值，则在施放结束时的喷发激流造成的伤害提高[ePlus]',
    data: {
      ePlus: ({ calc, attr }) => Math.min(5000, ((calc(attr.hp) * 50 / 100) * 45 / 100))
    }
  }, {
    title: '旅行者1命：[微澜的湖水] 拾取源水之滴后，将恢复[_energyevery]点元素能量。',
    cons: 1,
    data: {
      _energyevery: 2
    }
  }, {
    title: '旅行者2命：[潺涓的碧水] 扬水制流的浮水泡沫移动的速度降低30%，持续时间延长[_qSustainedPlus]秒。',
    cons: 2,
    data: {
      _qSustainedPlus: 3
    }
  },
  { title: `5.8最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2005ranking} 更新日志:${renew} 其他信息:${information}` }
]
