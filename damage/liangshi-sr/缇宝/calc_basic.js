import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1403ranking = cfg.sr1403ranking
let aName = '普通攻击'
let eName = '礼物都去哪儿了'
let eNameT = 'E'
let qName = '猜猜这里住着谁'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '一百层的小火箭'
  eNameT = '礼物都去哪儿了'
  qNameT = '猜猜这里住着谁'
 } else if ( NamePath == 3 ) {
  eNameT = '礼物都去哪儿了'
  qNameT = '猜猜这里住着谁'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f','c','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1403ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'a'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'a'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'a'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[缇宝] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1403ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${qNameT}${eNameT}后${aName}主目标伤害`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.talent.a['技能伤害'] * calc(attr.hp), 'a')
},
{
  title: `${qNameT}${eNameT}后${aName}相邻伤害`,
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['相邻目标伤害'] * calc(attr.hp), 'a')
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['技能伤害'] * calc(attr.hp), 'q')
},
{
  title: `${qName}受击伤害`,
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic((cons >= 2 ? 1.2 : 1) * talent.q['附加伤害'] * calc(attr.hp), 't')
},
{
  title: '天赋追加伤害',
  params: { t: true },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.t['追加攻击伤害'] * calc(attr.hp), 't')
},
{
  title: `3目标${qNameT}${eNameT}后${aName}真实伤害`,
  dmgKey: 'a',
  dmg: ({ talent, calc, attr }, { basic }) => {
    let a1 = basic(talent.talent.a['技能伤害'] * calc(attr.hp), 'a')
    let a2 = basic(talent.a['相邻目标伤害'] * calc(attr.hp), 'a')
    return {
      avg: (a1.avg + a2.avg * 2) * 24 / 100,
      dmg: (a1.dmg + a2.dmg * 2) * 24 / 100,
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '缇宝技能：[礼物都去哪儿了] 拥有【****】时，我方全体目标全属性抗性穿透提高[atkPct]%',
  data: {
    atkPct: ({ talent }) => talent.e['抗性穿透提高'] * 100
  }
},

{
  title: '缇宝技能：[猜猜这里住着谁] 开启结界，敌方目标受到的伤害提高[enemydmg]%',
  data: {
    enemydmg: ({ talent }) => talent.q['伤害提高'] * 100
  }
},

{
  title: '缇宝行迹：[岔路旁的小石子？] 战斗开始时，恢复[_energyevery]点能量，我方其他目标攻击击中1个目标恢复[_energyeveryTwo]点能量',
  tree: 3,
  data: {
    _energyevery: 30,
    _energyeveryTwo: 1.5
  }
},

{
  title: '缇宝行迹：[长翅膀的玻璃球！] 生命上限提高我方全体角色生命上限之和的[hpPct]%', //非组队计算仅计算自己
  tree: 2,
  data: {
    hpPct: 9
  }
},

{
  check: ({ params }) => params.t === true,
  title: '缇宝行迹：[城墙外的羊羔儿…] 施放天赋的追加攻击后，造成的伤害提高[dmg]%',
  tree: 1,
  data: {
    _hpPct: 72 * 3
  }
},
{
  title: '缇宝2魂：[探访佳梦的向导] 结界造成的附加伤害提高至原伤害的[buff]%',
  cons: 2,
  data: {
    buff: 120
 }
},
{
  title: '缇宝4魂：[心意相契的安宁] 【****】持续期间，我方全体造成伤害时无视目标[ignore]%的防御力',
  cons: 4,
  data: {
    ignore: 18
 }
},
{
  check: ({ params }) => params.t === true,
  title: '缇宝6魂：[星月满天的明日] 天赋的追加攻击造成的伤害提高[tDmg]%',
  cons: 6,
  data: {
    tDmg: 729
 }
},
 { title: `2.22最后修改：[2.22重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1403ranking} 更新日志:${renew} 其他信息:${information}` }]
