import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs105ranking = cfg.gs105ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '暝色缒索'
let eNameT = 'E'
let qName = '黯声回响'
let qNameT = 'Q'
let tName = '翳的通感'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '宿灵闪箭'
  eNameT = '暝色缒索'
  qNameT = '黯声回响'
 }  else if ( NamePath == 3 ) {
  eNameT = '暝色缒索'
  qNameT = '黯声回响'
 }  else if ( NamePath == 4 ) {
  eName = '元素战技'
  qName = '元素爆发'
  eNameT = '元素战技'
  qNameT = '元素爆发'
  tName = '天赋'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
  tName = '天赋'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  a2Name = 'Z'
  a3Name = '戳'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
  tName = 'T'
 }
}
const miss = ['a','z','c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs105ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'q'
   }  else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'q'
     }  else if (miss.includes(rankingThreePath)) {
      logger.mark('[欧洛伦] 排名规则均未命中，已选择默认排名规则')
      ranking = 'q'
     }  else {
       ranking = `${rankingThreePath}`
     }
   }  else {
     ranking = `${rankingTwoPath}`
   }
 } else {
  ranking = `${rankingOnePath}`
 }
} else {
 ranking = `${gs105ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}弹跳对单`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['宿灵球伤害'], 'e,nightsoul')
},
{
  title: `${eName}弹跳激化`,
  dmg: ({ talent }, dmg) => dmg(talent.e['宿灵球伤害'], 'e,nightsoul', 'aggravate')
},
{
  title: `${qName}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${qName}释放激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['施放伤害'], 'q,nightsoul', 'aggravate')
},
{
  title: `${qName}音波碰撞伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul')
},
{
  title: `${qName}音波碰撞激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['音波碰撞伤害'], 'q,nightsoul', 'aggravate')
},
{
  title: `${tName}附加伤害`,
  params: { t: true },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 180 / 100, 'nightsoul')
},
{
  title: '感电反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('electroCharged')
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,
{
  title: '欧洛伦天赋：[灵相的触媒] 元素战技暝色缒索中的宿灵球命中敌人后，普攻、重击或下落攻击命中敌人将恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 3
  }
},
{
  check: ({ params }) => params.t === true,
  title: '欧洛伦1命：[林雾间的行迹] 宿灵球命中敌人后，固有天赋造成的伤害提升[dmg]%',
  cons: 1,
  data: {
    dmg: 50
  }
},
{
  title: '欧洛伦2命：[藏蜜酒的王蜂] 施放元素爆发后,获得[dmg]%雷元素伤害加成',
  cons: 2,
  data: {
    dmg: 8 + 8 * 4
  }
},
{
  title: '欧洛伦4命：[如夜风的谜烟] 施放黯声回响后，恢复[_energyevery]点元素能量',
  cons: 4,
   data: {
     _energyevery: 8
   }
},
{
  title: '欧洛伦6命：[致深泉的颂赞] 触发固有天赋后，攻击力提升[atkPct]%',
  cons: 6,
  data: {
    atkPct: 10 * 3
  }
},
{title: `11.19最后修改：[11.02重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs105ranking} 更新日志:${renew} 其他信息:${information}`}]
