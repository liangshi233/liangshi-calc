import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs48ranking = cfg.gs48ranking
let energy = cfg.energymodel
let t3Dmg = { dmg: 0 , avg: 0 }
let tz3Dmg = { dmg: 0 , avg: 0 }
let t4Dmg = { dmg: 0 , avg: 0 }
let tz4Dmg = { dmg: 0 , avg: 0 }
let qt3Dmg = { dmg: 0 , avg: 0 }
let qtz3Dmg = { dmg: 0 , avg: 0 }
let qt4Dmg = { dmg: 0 , avg: 0 }
let qtz4Dmg = { dmg: 0 , avg: 0 }
let z3Dmg = { dmg: 0 , avg: 0 }
let z4Dmg = { dmg: 0 , avg: 0 }
let zj3Dmg = { dmg: 0 , avg: 0 }
let zj4Dmg = { dmg: 0 , avg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '丹书立约'
let eNameT = 'E'
let qName = '凭此结契'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '火漆制印'
  eNameT = '丹书立约'
  qNameT = '凭此结契'
 }  else if ( NamePath == 3 ) {
  eNameT = '丹书立约'
  qNameT = '凭此结契'
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
if (!cfg.gs48ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'z'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'z'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'z'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[烟绯] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs48ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${qNameT}后满丹火印${a2Name}`,
  params: { dhy: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][cons * 1 === 6 ? 4 : 3], 'a2')
},
{
  title: `${qNameT}后满丹火印${a2Name}蒸发`,
  dmgKey: 'z',
  params: { dhy: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][cons * 1 === 6 ? 4 : 3], 'a2', 'vaporize')
},
{
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}蒸发`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
},
{
  title: `${eName}融化`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: `${qName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}蒸发`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: `${qName}融化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '烟绯天赋：[关联条款] 通过重击消耗4枚丹火印,烟绯会提升[a2Dmg]%火伤',
  cons: 6,
  data: {
    a2Dmg: ({ params }) => params.dhy ? 20 : 0
  }
},
{
  title: '烟绯天赋：[关联条款] 通过重击消耗3枚丹火印,烟绯会提升[a2Dmg]%火伤',
  check: ({ cons }) => cons < 6,
  data: {
    a2Dmg: ({ params }) => params.dhy ? 15 : 0
  }
},
{
  title: '烟绯技能：[凭此结契] 为烟绯自己赋予最大数量的丹火印每间隔一段时间为烟绯赋予一枚丹火印并提高重击[a2Dmg]%的伤害',
  data: {
    a2Dmg: ({ talent }) => talent.q['重击伤害额外加成']
  }
},
{
  title: '烟绯技能：[普通攻击·火漆制印] 每枚丹火印都会降低烟绯[_stamina]%的体力消耗',
  data: {
    _stamina: 15
  }
},
{
  check: ({ params }) => params.dhy === true,
  title: '烟绯1命：[占理不饶人] 烟绯进行重击时,每持有一枚丹火印,都会提高烟绯在咏唱期间[_interruption]%的抗打断能力,并额外降低本次重击[_a2StaminaPct]%的体力消耗',
  cons: 1,
  data: {
    _interruptionPct: 10,
    _a2Stamina: 10
  }
},
{
  title: '烟绯2命：[最终解释权] 烟绯的重击对于生命值低于50%的敌人，暴击率提高[a2Cpct]%',
  cons: 2,
  data: {
    a2Cpct: 10
  }
},
{
  title: '烟绯6命：[是额外条款] 烟绯持有的丹火印最大数量增加一枚',
  cons: 6
},
{title: `5.15最后修改：[10.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs48ranking} 更新日志:${renew} 其他信息:${information}`}]

