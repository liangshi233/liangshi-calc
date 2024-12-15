import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs108ranking = cfg.gs108ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '凤缕随翦舞'
let eNameT = 'E'
let qName = '鹍弦踏月出'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '玄鸾画水'
  eNameT = '凤缕随翦舞'
  qNameT = '鹍弦踏月出'
 } else if ( NamePath == 3 ) {
  eNameT = '凤缕随翦舞'
  qNameT = '鹍弦踏月出'
 } else if ( NamePath == 4 ) {
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
const miss = ['a', 'z', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs108ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'h'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[蓝砚] 排名规则均未命中，已选择默认排名规则')
      ranking = 'h'
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
 ranking = `${gs108ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}翦月环伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['环刃攻击伤害'], 'e')
},
{
  title: `${eName}护盾量`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.atk) / 100 + talent.e['护盾吸收量2'][1] * 1)
},
{
  title: `${qName}单段伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害2'][0], 'q')
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
{
  title: '蓝砚天赋：[苍翎镇邪敕符] 元素战技造成的伤害值提升[dmg],元素爆发造成的伤害值提升[dmg]',
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 309 / 100,
    qPlus: ({ attr, calc }) => calc(attr.mastery) * 774 / 100
  }
},
{
  title: '蓝砚4命：[「揽龙鹰兮结血珠」] 施放元素爆发后,元素精通提升[mastery]',
  cons: 4,
  data: {
    mastery: 60
  }
},
 {title: `11.20最后修改：[11.20重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs108ranking} 更新日志:${renew} 其他信息:${information}`}]

