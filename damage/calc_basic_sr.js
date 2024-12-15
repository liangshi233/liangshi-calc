import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../resources/CalcBuff/index.js'

/*

暂不支持非攻击力模型的角色伤害
暂不支持非攻生命模型的角色护盾
暂不支持非攻生命模型的角色治疗
暂不支持带有复杂或多段的伤害
暂不支持强化重击强化普攻

*/
let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let aName = '普通攻击'
let eName = '战技'
let eNameT = 'E'
let qName = '终结技'
let qNameT = 'Q'
let tName = '天赋'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '普通攻击'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 3 ) {
  eNameT = '战技'
  qNameT = '终结技'
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
const miss = ['dps','dph','hph','hps']
let ranking = 'undefined'
if ( rankingOnePath == 'm' )  {
 ranking = 'a'
} else if (miss.includes(rankingOnePath)) {
  if ( rankingTwoPath == 'm' )  {
   ranking = 'a'
  } else if (miss.includes(rankingTwoPath)) {
    if ( rankingThreePath == 'm' )  {
     ranking = 'a'
    } else if (miss.includes(rankingThreePath)) {
     logger.mark('[通用] 排名规则均未命中，已选择默认排名规则')
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
const calcBreakMap = {
  '火': 'fireBreak',
  '风': 'windBreak',
  '冰': 'iceBreak',
  '雷': 'ligntningBreak',
  '物理': 'physicalBreak',
  '量子': 'quantumBreak',
  '虚数': 'imaginaryBreak',
  '': 'quantumBreak',
}
let renew = '无'
let information = '通用计算，暂不提供buff计算，请安装拓展'

export const details = [
{
  check: ({ talent }) => talent.a['技能伤害'],
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  check: ({ talent }) => talent.e['技能伤害'],
  title: `${eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}治疗`,
  check: ({ talent }) => talent.e['回复·百分比生命'] || talent.e['百分比生命'] || talent.e['目标治疗·百分比生命'] || talent.e['主目标·百分比生命'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let eTal1 = !talent.e['回复·百分比生命'] ? talent.e['回复·百分比生命'] : (talent.e['百分比生命'] ? talent.e['百分比生命'] : (talent.e['目标治疗·百分比生命'] ? talent.e['目标治疗·百分比生命'] : talent.e['主目标·百分比生命']))
    let eTal2 = !talent.e['回复·固定值'] ? talent.e['回复·固定值'] : (talent.e['固定值'] ? talent.e['固定值'] : (talent.e['目标治疗·固定值'] ? talent.e['目标治疗·固定值'] : (talent.e['目标治疗·固定值'] ? talent.e['目标治疗·固定值'] : talent.e['主目标·固定值'])))
    let eHealE = heal(eTal1 * calc(attr.hp) / 100 + eTal2 * 1 )
    return eHealE
  }
},
{
  check: ({ talent }) => talent.e['百分比生命'] || talent.e['百分比防御'],
  title: `${eName}护盾量`,
  dmg: ({ talent, attr, calc }, { shield }) => {
    let eTal1 = talent.e['百分比生命'] ? talent.e['百分比生命'] : talent.e['百分比防御']
    let eTal2 = talent.e['固定值']
    let calcType = talent.q['百分比生命'] ? calc(attr.hp) : calc(attr.def)
    let eShield = shield(eTal1 * calcType / 100 + eTal2 * 1)
    return eShield
  }
},
{
  check: ({ talent }) => talent.q['技能伤害'],
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}治疗`,
  check: ({ talent }) => talent.q['回复·百分比生命'] || talent.q['百分比生命'] || talent.q['目标治疗·百分比生命'] || talent.q['主目标·百分比生命'],
  dmg: ({ talent, calc, attr }, { heal }) => {
    let qTal1 = !talent.q['回复·百分比生命'] ? talent.q['回复·百分比生命'] : (talent.q['百分比生命'] ? talent.q['百分比生命'] : (talent.q['目标治疗·百分比生命'] ? talent.q['目标治疗·百分比生命'] : talent.q['主目标·百分比生命']))
    let qTal2 = !talent.q['回复·固定值'] ? talent.q['回复·固定值'] : (talent.q['固定值'] ? talent.q['固定值'] : (talent.q['目标治疗·固定值'] ? talent.q['目标治疗·固定值'] : (talent.q['目标治疗·固定值'] ? talent.q['目标治疗·固定值'] : talent.q['主目标·固定值'])))
    let qHealE = heal(qTal1 * calc(attr.hp) / 100 + qTal2 * 1 )
    return qHealE
  }
},
{
  check: ({ talent }) => talent.q['百分比生命'] || talent.q['百分比防御力'],
  title: `${qName}护盾量`,
  dmg: ({ talent, attr, calc }, { shield }) => {
    let qTal1 = talent.q['百分比生命'] ? talent.q['百分比生命'] : talent.q['百分比防御力']
    let qTal2 = talent.q['固定值']
    let calcType = talent.q['百分比生命'] ? calc(attr.hp) : calc(attr.def)
    let qShield = shield(qTal1 * calcType / 100 + qTal2 * 1)
    return qShield
  }
},
{
  check: ({ talent }) => talent.t['技能伤害'],
  title: `${tName}伤害`,
  dmgKey: 't',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'], 't')
},
{
  title: `精英敌人击破`,
  dmgKey: 'r',
  params: { toughness: 10 },
  dmg: ({ params, element }, { reaction }) => {
    let breName = calcBreakMap[element]
    return {
      avg: reaction(breName).avg * ( params.toughness + 2 ) / 4
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffSr,enemyBuffSr,
{title: `12.11最后修改：[12.8重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 更新日志:${renew} 其他信息:${information}`}]
