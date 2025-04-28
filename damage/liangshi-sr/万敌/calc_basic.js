import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1404ranking = cfg.sr1401ranking
let aName = '普通攻击'
let eName = '****'
let eNameT = 'E'
let qName = '****'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '踏破征徒的誓言'
  eNameT = '****'
  qNameT = '****'
 } else if ( NamePath == 3 ) {
  eNameT = '****'
  qNameT = '****'
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
const miss = ['z','f','c','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1404ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'e'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'e'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[万敌] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1404ranking}`
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
  title: `${eName}主目标伤害`,
  params: { e: 0 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'], 'e')
},
{
  title: `${eNameT}相邻目标伤害`,
  params: { e: 0 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['相邻目标伤害'], 'e')
},
/*
{
  title: `****${eNameT}主目标伤害`,
  params: { e: 1 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e2['技能伤害'], 'e')
},
{
  title: `****${eNameT}相邻目标伤害`,
  params: { e: 1 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e2['相邻目标伤害'], 'e')
},
*/
{
  title: `****${eNameT}主目标伤害`,
  params: { e: 2 },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (talent.e2['技能伤害'] + (cons >= 1 ? 0.3 : 0)), 'e')
},
{
  title: `****${eNameT}相邻目标伤害`,
  params: { e: 2 },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (cons >= 1 ? talent.e2['技能伤害'] : talent.e2['相邻目标伤害']) / 100, 'e')
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,hp,cpct,cdmg,dmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '万敌天赋：[****] 【****】状态下生命上限提高[hpPlus]，防御力提升[defPlus]',
  data: {
    hpPlus: ({ calc, attr }) => calc(attr.hp) * 50 / 100
  }
},
{
  title: '万敌天赋：[****] 【****】状态下防御力提升[defPlus]',
  sort: 10,
  data: {
    defPlus: ({ calc, attr }) => 0 - calc(attr.def)
  }
},
{
  title: '万敌行迹：[****] 战斗开始时，自身暴击率提高[cpct]%，受到来自敌方目标伤害造成的充能比例提高[_energyevery]%，受到治疗时的回复量提高[healInc]%',
  sort: 9,
  tree: 3,
  data: {
    cpct: ({ calc, attr }) => Math.max(Math.min((calc(attr.hp) - 4000), 4000), 0) / 100 * 1.2,
    _energyevery: ({ calc, attr }) => Math.max(Math.min((calc(attr.hp) - 4000), 4000), 0) / 100 * 2.5,
    healInc: ({ calc, attr }) => Math.max(Math.min((calc(attr.hp) - 4000), 4000), 0) / 100 * 0.75 //受治疗加成
  }
},
{
  title: '万敌1魂：[寒风雕琢不屈的脊梁] 【****】对主目标造成的伤害倍率提高30.0%，且变成对敌方全体造成等同于主目标的伤害',
  cons: 1
},
{
  title: '万敌2魂：[纷争见证尸骸的喉鸣] 【****】状态期间，造成的伤害无视敌方目标[ignore]%的防御力',
  cons: 2,
  data: {
   ignore: 15
 }
},
{
  title: '万敌4魂：[号角惊觉缄默的狂狮] 【****】状态期间暴击伤害提高[cdmg]%',
  cons: 4,
  data: {
   cdmg: 30
 }
},
 { title: `4.12最后修改：[3.5重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1404ranking} 更新日志:${renew} 其他信息:${information}` }]