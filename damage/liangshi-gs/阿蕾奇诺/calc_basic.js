import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs96ranking = cfg.gs96ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '万相化灰'
let eNameT = 'E'
let qName = '厄月将升'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '斩首之邀'
    eNameT = '万相化灰'
    qNameT = '厄月将升'
  } else if (NamePath == 3) {
    eNameT = '万相化灰'
    qNameT = '厄月将升'
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

if (!cfg.gs96ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'a'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'a'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'a'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[阿蕾奇诺] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs96ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '4.30 修复生命之契缩放设置对初始生命之契不生效的问题'
renew = '5.3 修复血偿勒令回收伤害错误的受到元素战技伤害加成的问题'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${eNameT}后${aName}一段伤害`,
    dmgKey: 'a',
    dmg: ({ talent, attr, cons }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `${eNameT}后${aName}一段蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
  }, {
    check: ({ cons }) => cons >= 2,
    title: '血偿勒令回收伤害',
    dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 900 / 100, '')
  }, {
    title: `${eName}发动伤害`,
    dmgKey: 'undefined',
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['尖刺伤害'], 'e')
  }, {
    title: `${eName}切斩伤害`,
    dmgKey: 'e',
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['切斩伤害'], 'e')
  }, {
    title: '血偿勒令伤害',
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血偿勒令伤害'], 'e')
  }, {
    title: `${qName}伤害`,
    dmgKey: 'q',
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${qName}蒸发伤害`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
  }, {
    title: `${qName}治疗量`,
    dmg: ({ params, cons, talent, attr, calc, weapon }, { heal }) => heal(150 / 100 * (Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * calc(attr.hp) + 150 / 100 * calc(attr.atk))
  }
]

export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}` }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
    data: {
      _BondOfLife: ({ params, cons, weapon }) => Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200)
    }
  }, {
    title: '阿蕾奇诺技能：[红死之宴] 阴翳礼赞状态下，普通攻击将转为红死之宴,使造成的伤害提升[aPlus]；通过这种方式消耗生命之契时，会使元素战技「万相化灰」的冷却缩短[_eCdPlus]秒。',
    data: {
      aPlus: ({ talent, attr, calc, params, cons, weapon }) => calc(attr.atk) * ((Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * (talent.a['红死之宴提升'] / 100)),
      _eCdPlus: 0.8
    }
  }, {
    title: '阿蕾奇诺技能：[唯厄月可知晓] 在战斗状态下，获得[dmg]%火元素伤害加成',
    data: { dmg: 40 }
  }, {
    title: '阿蕾奇诺天赋：[唯力量可守护] 获得[_res]%全元素抗性和物理抗性',
    data: {
      _res: ({ attr, calc }) => Math.min((calc(attr.atk) >= 1000 ? ((calc(attr.atk) - 1000) / 100) : 0), 20)
    }
  }, {
    title: '阿蕾奇诺1命：[「所有的仇与债皆由我偿…」] 红死之宴进一步提高[aPlus]；此外，在红死之宴状态下进行普通攻击时，提高[_aInterruption]%抗打断能力。',
    cons: 1,
    data: {
      aPlus: ({ attr, calc, params, cons, weapon }) => calc(attr.atk) * ((Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * (100 / 100)),
      _aInterruption: 100
    }
  }, {
    title: '阿蕾奇诺2命：[「所有的赏与罚皆自我出…」] 血偿勒令施加时即为血偿勒令·结，并在回收时在前方唤出厄月血祸，造成火元素范围伤害并使所有元素抗性与物理抗性提升[_res]%',
    cons: 2,
    data: { _res: 20 }
  }, {
    title: '阿蕾奇诺4命：[「此后，你们须相爱相护…」] 回收血偿勒令时，厄月将升的冷却时间缩短[_cdPlus]秒并恢复[_energyevery]点元素能量',
    cons: 4,
    data: {
      _cdPlus: 2,
      _energyevery: 15
    }
  }, {
    title: '阿蕾奇诺6命：[「自此以后，我们将共飨新生。」] 厄月将升造成的伤害提高[qPlus],且释放后普通攻击与元素爆发的暴击率提高[aCpct]%,暴击伤害提高[aCdmg]%',
    cons: 6,
    data: {
      qPlus: ({ calc, attr, params, cons, weapon }) => (calc(attr.atk) * ((Math.min((params.blPct * ((65 + (cons >= 2 ? 65 : 0)) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPct * params.blPlus), 200) / 100) * (700 / 100))),
      aCpct: 10,
      aCdmg: 70,
      qCpct: 10,
      qCdmg: 70
    }
  },
  'vaporize',
  { title: `5.3最后修改：[3.11重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs96ranking} 更新日志:${renew} 其他信息:${information}` }]
