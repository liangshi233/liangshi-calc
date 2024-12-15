import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2006ranking = cfg.gs2006ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '流火剑'
let eNameT = 'E'
let qName = '厝火燎原'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '异邦烈焰'
  eNameT = '流火剑'
  qNameT = '厝火燎原'
 }  else if ( NamePath == 3 ) {
  eNameT = '流火剑'
  qNameT = '厝火燎原'
 }  else if ( NamePath == 4 ) {
  eName = '元素战技'
  qName = '元素爆发'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  a2Name = 'Z'
  a3Name = '戳'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs2006ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[旅行者-火] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs2006ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: '快快火环伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['快快火环伤害'], 'e,nightsoul')
},
{
  title: '慢慢火环即时伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['慢慢火环即时伤害'], 'e,nightsoul')
},
{
  title: '慢慢火环即时蒸发',
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['慢慢火环即时伤害'], 'e,nightsoul', 'vaporize')
},
{
  title: '慢慢火环即时融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['慢慢火环即时伤害'], 'e,nightsoul', 'melt')
},
{
  title: '慢慢火环伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['慢慢火环伤害'], 'e,nightsoul')
},
{
  title: `${qName}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${qName}释放蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'vaporize')
},
{
  title: `${qName}释放融化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'melt')
}
]

export const defParams = { Nightsoul: true }
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
  title: '旅行者天赋：[未烬的余火] 处于焰烈之槛或灼火之槛中对敌人触发燃烧、蒸发、融化、超载、烈绽放、火元素扩散或火元素结晶反应后，恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 5
  }
},
{
  title: '旅行者1命：[流光的星火] 焰烈之槛或灼火之槛存在期间，造成的伤害提升[dmg]%',
  cons: 1,
  data: {
    dmg: ({ params }) => params.Nightsoul == true ? (6 * 2) : 6
  }
},
{
  title: '旅行者4命：[燎灼的烈火] 施放元素爆发后，获得[dmg]%火元素伤害加成',
  cons: 4,
  data: {
    dmg: 20
  }
},
{
  check: ({ params }) => params.Nightsoul == true,
  title: '旅行者6命：[永燃的圣火] 处于夜魂加持状态下时普通攻击、重击与下落攻击将转为具有夜魂性质且无法被附魔覆盖的火元素伤害，这些攻击的暴击伤害提升[aCdmg]%',
  cons: 6,
  data: {
    aCdmg: 40,
    a2Cdmg: 40,
    a3Cdmg: 40
  }
},
 {title: `11.21最后修改：[11.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2006ranking} 更新日志:${renew} 其他信息:${information}`}]

