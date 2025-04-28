import { Format, LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1317ranking = cfg.sr1317ranking
let aName = '普通攻击'
let zName = '忍具•降魔花弁'
let eName = '忍切·初志贯彻'
let eNameT = 'E'
let qName = '忍道·极·****天流'
let qNameT = 'Q'
let tName = '天赋'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '忍术·七转八起'
  eNameT = '忍切·初志贯彻'
  qNameT = '忍道·极·****天流'
  tName = '忍·科学·堪忍袋'
 } else if ( NamePath == 3 ) {
  eNameT = '忍切·初志贯彻'
  qNameT = '忍道·极·****天流'
  tName = '忍·科学·堪忍袋'
 } else if ( NamePath == 4 ) {
  zName = '强化普攻'
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  zName = '强普'
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  zName = 'Z'
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  tName = 'T'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f','c','e','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1317ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'z'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[乱破] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1317ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `${eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${zName}主目标单段伤害`,
  params: { q: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a2['主目标伤害'], 'a')
},
{
  title: `${zName}全体单段伤害`,
  params: { q: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a2['全体伤害'], 'a')
},
{
  title: `${zName}-满充能精英敌人击破`,
  dmgKey: 'r',
  params: { toughness: 10, q: true },
  dmg: ({ params, cons, talent }, { reaction }) => {
    return {
      avg: reaction('imaginaryBreak').avg * ( params.toughness + 2 ) / 4 * ( talent.t['击破伤害'] + ( talent.t['击破倍率提高'] * ( cons >= 6 ? 15 : 10 ) ) )
    }
  }
},
{
  check: ({ trees }) => trees['102'],
  title: `${zName}单段超击破伤害`,
  params: { toughness: 10, q: true },
  dmg: ({ params, cons }, { reaction }) => {
    return {
      avg: reaction('superBreak').avg / 0.9 * ( 60 / 100 ) * ( 1 + 0.5 + ( cons >= 2 ? 0.5 : 0 ) )
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '敌人状态：[韧性] 具有[toughness]韧性上限',
  data: {
    toughness: ({ params }) => (params.toughness || 10)
  }
},
{
  check: ({ params }) => params.technique >= 1,
  title: '乱破秘技：[忍步•****理] 主动攻击敌人进入战斗后获得[_energyevery]点能量',
  data: {
    _energyevery: 10
  }
},
{
  check: ({ params }) => params.q === true,
  title: '乱破技能：[忍道•极•****天流] 进入【结印】状态，击破特攻提高[stance]%',
  data: {
    stance: ({ talent }) => talent.q['击破特攻提高'] * 100
  }
},
{
  title: '乱破天赋：[忍•科学•堪忍袋] [_tEnergyevery]点充能使本次击破伤害倍率提高[_breakPlus]%',
  data: {
    _tEnergyevery: ({ params, cons }) => params.energyevery || (cons >= 6 ? 15 : 10),
    _breakPlus: ({ talent, params, cons }) => talent.t['击破倍率提高'] * 100 * (params.energyevery || (cons >= 6 ? 15 : 10))
  }
},
{
  title: '乱破行迹：[忍法帖•魔天] 精英级别及以上的敌方目标的弱点被击破时，恢复[_energyevery]点能量',
  tree: 1,
  data: {
    _energyevery: 10
  }
},
{
  title: '乱破行迹：[忍法帖•枯叶] 敌方目标的弱点被击破时，受到的击破伤害提高[breakEnemydmg]%',
  tree: 3,
  data: {
    breakEnemydmg: ({ attr }) => Math.max(8, (Math.min(0, (attr.atk - 2400)) / 100)) + 2
  }
},
{
  check: ({ params }) => params.q === true,
  title: '乱破1魂：[常世道返三途无六钱] 施放终结技进入【结印】状态期间，造成的伤害无视目标[ignore]%的防御，退出【结印】状态后恢复[_energyevery]点能量',
  cons: 1,
  data: {
    ignore: 20,
    _energyevery: 20
 }
},
{
  check: ({ params }) => params.q === true,
  title: '乱破4魂：[经年劣化任侠无忍义] 【结印】状态期间，速度提高[speedPct]%',
  cons: 4,
  data: {
    speedPct: 12
 }
},
{
  title: '乱破6魂：[破邪显正应报无慈悲] 发动【忍具•降魔花弁】第3段攻击后获得[_energyevery]点充能',
  cons: 6,
  data: {
    _energyevery: 5
 }
},
 { title: `12.20最后修改：[12.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1317ranking} 更新日志:${renew} 其他信息:${information}` }]
