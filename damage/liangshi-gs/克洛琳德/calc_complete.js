import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs98ranking = cfg.gs98ranking
let energy = cfg.energymodel
let a1Dmg = { dmg: 0 , avg: 0 }
let a1jDmg = { dmg: 0 , avg: 0 }
let c1Dmg = { dmg: 0 , avg: 0 }
let c1jDmg = { dmg: 0 , avg: 0 }
let c6Dmg = { dmg: 0 , avg: 0 }
let c6jDmg = { dmg: 0 , avg: 0 }
let aName = '普通攻击'
let aNameT = 'A'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '狩夜之巡'
let eNameT = 'E'
let qName = '残光将终'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '逐影之誓'
  aNameT = '逐影之誓'
  eNameT = '狩夜之巡'
  qNameT = '残光将终'
 } else if ( NamePath == 3 ) {
  eNameT = '狩夜之巡'
  qNameT = '残光将终'
 } else if ( NamePath == 4 ) {
  eName = '元素战技'
  qName = '元素爆发'
  aNameT = '普通攻击'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  aNameT = '普攻'
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
const miss = ['h', 'f', 'y',, 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs98ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   }  else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     }  else if (miss.includes(rankingThreePath)) {
      logger.mark('[克洛琳德] 排名规则均未命中，已选择默认排名规则')
      ranking = 'dps'
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
 ranking = `${gs98ranking}`
}
if (!cfg.namemodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${aName}二段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${aName}三段`,
  dmg: ({ talent, cons }, dmg) => {
    let a3 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: a3.dmg * 2 ,
      avg: a3.avg * 2
    }
  }
},
{
  title: `${aName}四段`,
  dmg: ({ talent, cons }, dmg) => {
    let a4 = dmg(talent.a['四段伤害'] / 3 , 'a', 'phy')
    return {
      dmg: a4.dmg * 3 ,
      avg: a4.avg * 3
    }
  }
},
{
  title: `${aName}五段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: `${a3Name}期间伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${a3Name}伤害`,
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${eNameT}后${aName}穿透射击`,
  params: { blPct: 0.5 },
  dmg: ({ talent, attr , cons }, dmg ) => {
   a1Dmg = dmg(talent.e['驰猎伤害2'][1], 'a')
   return a1Dmg
  }
},
{
  title: `${eNameT}后${aName}穿透射击激化`,
  dmgKey: 'a',
  params: { blPct: 0.5 },
  dmg: ({ talent, attr , cons }, dmg ) => {
   a1jDmg = dmg(talent.e['驰猎伤害2'][1], 'a', 'aggravate')
   return a1jDmg
  }
},
{
  title: `${eNameT}后${aName}射击`,
  dmgKey: 'undefined',
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.e['驰猎伤害2'][0], 'a')
},
{
  title: `${eNameT}后${aName}射击激化`,
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.e['驰猎伤害2'][0], 'a', 'aggravate')
},
{
  title: `${eName}贯夜突进伤害`,
  params: { blPct: 0 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][0], 'a')
},
{
  title: `${eName}贯夜突进激化`,
  params: { blPct: 0 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][0], 'a', 'aggravate')
},
{
  title: `${eName}强化贯夜伤害`,
  params: { blPct: 0.5 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][1], 'a')
},
{
  title: `${eName}强化贯夜激化`,
  params: { blPct: 0.5 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][1], 'a', 'aggravate')
},
{
  title: `${eName}贯夜·契令`,
  dmg: ({ talent, attr }, dmg ) => {
    let e3 = dmg(talent.e['贯夜伤害2'][2], 'e')
    return {
      dmg: e3.dmg * 3 ,
      avg: e3.avg * 3
    }
  }
},
{
  title: `${eName}贯夜·契令激化`,
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg ) => {
    let e3 = dmg(talent.e['贯夜伤害2'][2], 'e')
    let e4 = dmg(talent.e['贯夜伤害2'][2], 'e', 'aggravate')
    return {
      dmg: e3.dmg * 2 + e4.dmg,
      avg: e3.avg * 2 + e4.avg
    }
  }
},
{
  title: `${eNameT}后24${aNameT}伤害`,
  dmg: ({ talent, attr }, dmg ) => {
    let a1 = dmg(talent.e['驰猎伤害2'][0], 'a')
    return {
      dmg: a1.dmg * 24 ,
      avg: a1.avg * 24
    }
  }
},
{
  title: `${eNameT}后24${aNameT}激化`,
  dmg: ({ talent, attr }, dmg ) => {
    let a1 = dmg(talent.e['驰猎伤害2'][0], 'a')
    let a2 = dmg(talent.e['驰猎伤害2'][0], 'a', 'aggravate')
    return {
      dmg: a1.dmg * 14 + a2.dmg * 10 ,
      avg: a1.avg * 14 + a2.avg * 10
    }
  }
},
{
  title: `${eNameT}${aNameT}${aNameT}${aNameT} ${eName}完整伤害`,
  dmg: ({ talent, attr }, dmg ) => {
    let a1 = a1Dmg
    let e1 = dmg(talent.e['贯夜伤害2'][2], 'e')
    return {
      dmg: a1.dmg * 3 * 5 + e1.dmg * 3 * 6 ,
      avg: a1.avg * 3 * 5 + e1.avg * 3 * 6
    }
  }
},
{
  title: `${eNameT}${aNameT}${aNameT}${aNameT} ${eName}完整激化`,
  dmg: ({ talent, attr }, dmg ) => {
    let a1 = a1jDmg
    let a2 = a1Dmg
    let e1 = dmg(talent.e['贯夜伤害2'][2], 'e')
    let e2 = dmg(talent.e['贯夜伤害2'][2], 'e', 'aggravate')
    return {
      dmg: a1.dmg * 7 + a2.dmg * 8 + ( e1.dmg * 2 + e2.dmg ) * 6 ,
      avg: a1.avg * 7 + a2.avg * 8 + ( e1.avg * 2 + e2.avg ) * 6
    }
  }
},
{
  check: ({ cons }) => cons >= 1,
  title: '夜巡之影协同攻击',
  dmg: ({ attr, calc }, { basic }) => {
    c1Dmg = basic(calc(attr.atk) * 30 / 100, 'a')
    return c1Dmg
  }
},
{
  check: ({ cons }) => cons >= 1,
  title: '夜巡之影协同攻击激化',
  dmg: ({ attr, calc }, { basic }) => {
    c1jDmg = basic(calc(attr.atk) * 30 / 100, 'a', 'aggravate')
    return c1jDmg
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: '明烛之影追击伤害',
  dmg: ({ attr, calc }, { basic }) => {
    c6Dmg = basic(calc(attr.atk) * 200 / 100, 'a')
    return c6Dmg
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: '明烛之影追击激化',
  dmg: ({ attr, calc }, { basic }) => {
    c6jDmg = basic(calc(attr.atk) * 200 / 100, 'a', 'aggravate')
    return c6jDmg
  }
},
{
  title: `${qName}单段伤害`,
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害2'][0], 'q')
},
{
  title: `${qName}单段激化`,
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害2'][0], 'q', 'aggravate')
},
{
  title: `${qName}完整伤害`,
  dmg: ({ talent, attr }, dmg ) => {
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    return {
      dmg: q1.dmg * 5 ,
      avg: q1.avg * 5
    }
  }
},
{
  title: `${qName}完整激化`,
  dmgKey: 'q',
  dmg: ({ talent, attr }, dmg ) => {
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let q2 = dmg(talent.q['技能伤害2'][0], 'q', 'aggravate')
    return {
      dmg: q1.dmg * 3 + q2.dmg * 2,
      avg: q1.avg * 3 + q2.dmg * 2
    }
  }
},
{
  title: '单人站场16秒',
  dmg: ({ talent, attr, cons }, dmg ) => {
    let c1 = c1Dmg
    let c6 = c6Dmg
    let a1 = a1Dmg
    let cons1 = cons >= 1 ? 1 : 0
    let cons6 = cons >= 6 ? 1 : 0
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a6 = dmg(talent.a['四段伤害'] / 3 , 'a', 'phy')
    let a7 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['贯夜伤害2'][2], 'e')
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    return {
      dmg: cons1 * ( c1.dmg * 2 * 6 ) + cons6 * ( c6.dmg * 6 ) + ( a3.dmg * 2 + a4.dmg * 2 + a5.dmg * 2 * 2 + a6.dmg * 3 + a7.dmg ) + a1.dmg * 3 * 5 + e1.dmg * 3 * 6 + q1.dmg * 5 ,
      avg: cons1 * ( c1.avg * 2 * 6 ) + cons6 * ( c6.avg * 6 ) + ( a3.avg * 2 + a4.avg * 2 + a5.avg * 2 * 2 + a6.avg * 3 + a7.avg ) + a1.avg * 3 * 5 + e1.avg * 3 * 6 + q1.avg * 5
    }
  }
},
{
  title: '单人站场16秒激化',
  dmgKey: 'dph',
  dmg: ({ talent, attr, cons }, dmg ) => {
    let c1 = c1Dmg
    let c6 = c6Dmg
    let c1j = a1jDmg
    let c6j = a1Dmg
    let a1 = a1Dmg
    let a2 = a1jDmg
    let cons1 = cons >= 1 ? 1 : 0
    let cons6 = cons >= 6 ? 1 : 0
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a6 = dmg(talent.a['四段伤害'] / 3 , 'a', 'phy')
    let a7 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['贯夜伤害2'][2], 'e')
    let e2 = dmg(talent.e['贯夜伤害2'][2], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let q2 = dmg(talent.q['技能伤害2'][0], 'q', 'aggravate')
    return {
      dmg: cons1 * ( c1.dmg * 2 * 4 + c1j.dmg * 2 * 2 ) + cons6 * ( c6.dmg * 4 + c6j.dmg * 2 ) + ( a3.dmg * 2 + a4.dmg * 2 + a5.dmg * 2 * 2 + a6.dmg * 3 + a7.dmg ) + a1.dmg * 7 + a2.dmg * 8 + ( e1.dmg * 2 + e2.dmg ) * 6 + q1.dmg * 3 + q2.dmg * 2,
      avg: cons1 * ( c1.avg * 2 * 4 + c1j.avg * 2 * 2 ) + cons6 * ( c6.avg * 4 + c6j.avg * 2 ) + ( a3.avg * 2 + a4.avg * 2 + a5.avg * 2 * 2 + a6.avg * 3 + a7.avg ) + a1.avg * 7 + a2.avg * 8 + ( e1.avg * 2 + e2.avg ) * 6 + q1.avg * 3 + q2.avg * 2
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let consn = 0
  let weaponnn = 0
  let weaponconsn = 0
  if (weapon.name === '船坞长剑') {
    if (weapon.affix == 1) {
      weaponnn = 2 * 3
    }
    if (weapon.affix == 2) {
      weaponnn = 2.5 * 3
    }
    if (weapon.affix == 3) {
      weaponnn = 3 * 3
    }
    if (weapon.affix == 4) {
      weaponnn = 3.5 * 3
    }
    if (weapon.affix == 5) {
      weaponnn = 4 * 3
    }
  }
  if (weapon.name === '天目影打刀') {
    if (weapon.affix == 1) {
      weaponnn = 6
    }
    if (weapon.affix == 2) {
      weaponnn = 7.5
    }
    if (weapon.affix == 3) {
      weaponnn = 9
    }
    if (weapon.affix == 4) {
      weaponnn = 10.5
    }
    if (weapon.affix == 5) {
      weaponnn = 12
    }
  }
  if (weapon.name === '西风剑') {
   weaponn = 3 * 2 * 2
  }
  if (weapon.name === '天空之刃') {
    weaponconsn = 1
  }
  return {
    avg: Format.percent( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn + energy ) ) / ( 60 - weaponnn - ( 0.2212 * ( 23 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  dmg: ({ talent, attr, cons, weapon, calc }, dmg ) => {
    let c1 = c1Dmg
    let c6 = c6Dmg
    let a1 = a1Dmg
    let cons1 = cons >= 1 ? 1 : 0
    let cons6 = cons >= 6 ? 1 : 0
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a6 = dmg(talent.a['四段伤害'] / 3 , 'a', 'phy')
    let a7 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['贯夜伤害2'][2], 'e')
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let weaponn = 0
    let consn = 0
    let weaponnn = 0
    let weaponconsn = 0
    if (weapon.name === '船坞长剑') {
      if (weapon.affix == 1) {
        weaponnn = 2 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 2.5 * 3
      }
      if (weapon.affix == 3) {
        weaponnn = 3 * 3
      }
      if (weapon.affix == 4) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix == 5) {
        weaponnn = 4 * 3
      }
    }
    if (weapon.name === '天目影打刀') {
      if (weapon.affix == 1) {
        weaponnn = 6
      }
      if (weapon.affix == 2) {
        weaponnn = 7.5
      }
      if (weapon.affix == 3) {
        weaponnn = 9
      }
      if (weapon.affix == 4) {
        weaponnn = 10.5
      }
      if (weapon.affix == 5) {
        weaponnn = 12
      }
    }
    if (weapon.name === '西风剑') {
     weaponn = 3 * 2 * 2
    }
    if (weapon.name === '天空之刃') {
      weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn + energy ) ) / ( 60 - weaponnn - ( 0.2212 * ( 23 + weaponconsn ) ) ) ) )
    return {
      dmg: ( cons1 * ( c1.dmg * 2 * 6 ) + qcn * cons6 * ( c6.dmg * 6 ) + ( a3.dmg * 2 + a4.dmg * 2 + a5.dmg * 2 * 2 + a6.dmg * 3 + a7.dmg ) + a1.dmg * 3 * 5 + e1.dmg * 3 * 6 + qcn * q1.dmg * 5 ) / 16 ,
      avg: ( cons1 * ( c1.avg * 2 * 6 ) + qcn * cons6 * ( c6.avg * 6 ) + ( a3.avg * 2 + a4.avg * 2 + a5.avg * 2 * 2 + a6.avg * 3 + a7.avg ) + a1.avg * 3 * 5 + e1.avg * 3 * 6 + qcn * q1.avg * 5 ) / 16
    }
  }
},
{
  title: '单人站场期望DPS激化',
  dmgKey: 'dps',
  dmg: ({ talent, attr, cons, weapon, calc }, dmg ) => {
    let c1 = c1Dmg
    let c6 = c6Dmg
    let c1j = a1jDmg
    let c6j = a1Dmg
    let a1 = a1Dmg
    let a2 = a1jDmg
    let cons1 = cons >= 1 ? 1 : 0
    let cons6 = cons >= 6 ? 1 : 0
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a6 = dmg(talent.a['四段伤害'] / 3 , 'a', 'phy')
    let a7 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['贯夜伤害2'][2], 'e')
    let e2 = dmg(talent.e['贯夜伤害2'][2], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害2'][0], 'q')
    let q2 = dmg(talent.q['技能伤害2'][0], 'q', 'aggravate')
    let weaponn = 0
    let consn = 0
    let weaponnn = 0
    let weaponconsn = 0
    if (weapon.name === '船坞长剑') {
      if (weapon.affix == 1) {
        weaponnn = 2 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 2.5 * 3
      }
      if (weapon.affix == 3) {
        weaponnn = 3 * 3
      }
      if (weapon.affix == 4) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix == 5) {
        weaponnn = 4 * 3
      }
    }
    if (weapon.name === '天目影打刀') {
      if (weapon.affix == 1) {
        weaponnn = 6
      }
      if (weapon.affix == 2) {
        weaponnn = 7.5
      }
      if (weapon.affix == 3) {
        weaponnn = 9
      }
      if (weapon.affix == 4) {
        weaponnn = 10.5
      }
      if (weapon.affix == 5) {
        weaponnn = 12
      }
    }
    if (weapon.name === '西风剑') {
     weaponn = 3 * 2 * 2
    }
    if (weapon.name === '天空之刃') {
      weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn + energy ) ) / ( 60 - weaponnn - ( 0.2212 * ( 23 + weaponconsn ) ) ) ) )
    return {
      dmg: ( cons1 * ( c1.dmg * 2 * 4 + c1j.dmg * 2 * 2 ) + qcn * cons6 * ( c6.dmg * 4 + c6j.dmg * 2 ) + ( a3.dmg * 2 + a4.dmg * 2 + a5.dmg * 2 * 2 + a6.dmg * 3 + a7.dmg ) + a1.dmg * 7 + a2.dmg * 8 + ( e1.dmg * 2 + e2.dmg ) * 6 + qcn * ( q1.dmg * 3 + q2.dmg * 2 ) ) / 16,
      avg: ( cons1 * ( c1.avg * 2 * 4 + c1j.avg * 2 * 2 ) + qcn * cons6 * ( c6.avg * 4 + c6j.avg * 2 ) + ( a3.avg * 2 + a4.avg * 2 + a5.avg * 2 * 2 + a6.avg * 3 + a7.avg ) + a1.avg * 7 + a2.avg * 8 + ( e1.avg * 2 + e2.avg ) * 6 + qcn * ( q1.avg * 3 + q2.avg * 2 ) ) / 16
    }
  }
},
{
  title: `克皇 ${qName}单段激化`,
  params: { teamA: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害2'][0], 'q', 'aggravate')
}]

export const defParams = { blPlus: `${BLPlusPath}` , blPct: `${BLPctPath}` }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
     _BondOfLife: ({ talent , params , weapon }) => Math.min( ( params.blPct * ( talent.q['赋予生命之契'] + 35 + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) + params.blPct * params.blPlus ) , 200 )
  }
},
{
  title: '克洛琳德天赋：[破夜的明焰] 队伍中附近的角色对敌人触发雷元素相关反应后，提升普通攻击与残光将终造成的雷元素伤害[aPlus]%',
  data: {
    aPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 20 / 100 * 3 ) , 1800 ),
    qPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 20 / 100 * 3 ) , 1800 )
  }
},
{
  title: '克洛琳德天赋：[契令的酬偿] 生命之契的数值提升或降低时，暴击率提升[cpct]% ',
  data: {
    cpct: 10 * 2
  }
},
{
  title: '克洛琳德1命：[「自此，行过烛影之帷」] 狩夜之巡的夜巡状态持续期间，普通攻击造成的雷元素伤害命中敌人时，将在敌人附近唤出夜巡之影进行两次协同攻击',
  cons: 1
},
{
  title: '克洛琳德2命：[「自此，直面长夜之危」] 队伍中附近的角色对敌人触发雷元素相关反应后，普通攻击与残光将终造成的雷元素伤害再提升[aPlus]%,处于3层状态下时，抗打断能力提升[interruption]%',
  cons: 2,
  data: {
    aPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 10 / 100 * 3 ) , 900 ),
    qPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 10 / 100 * 3 ) , 900 ),
    interruption: 70
  }
},
{
  title: '克洛琳德4命：[「铭记泪，生命与仁爱」] 当前拥有[_BondOfLife]%生命值上限的生命之契，残光将终造成的伤害提升[qDmg]',
  cons: 4,
   data: {
     _BondOfLife: ({ talent , params , weapon }) => Math.min( ( params.blPct * ( talent.q['赋予生命之契'] + 35 + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) + params.blPct * params.blPlus ) , 200 ) ,
     qDmg: ({ talent , params , weapon }) => Math.min( ( Math.min( ( params.blPct * ( talent.q['赋予生命之契'] + 35 + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) + params.blPct * params.blPlus ) , 200 ) * 2 ) , 200 )
   }
},
{
  title: '克洛琳德6命：[「为此，勿将希望弃扬」] 施放狩夜之巡后暴击率提高[cpct]%,暴击伤害提高[cdmg]%,夜巡状态持续期间受到的伤害降低[_reduction]%，抗打断能力提高[interruption]%，明烛之影会追击敌人造成雷元素伤害',
  cons: 6,
  data: {
    cpct: 10 ,
    cdmg: 70 ,
    _reduction: 80 ,
    interruption: 100
  }
},
{
  title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
  check: ({ params }) => params.teamA === true,
  sort: 7,
  data: {
    mastery: 250
  }
},
{
  title: '纳西妲2命：[正等善见之根] 处于纳西妲施加的蕴种印状态下的敌人,受到原激化、超激化、蔓激化反应影响后,防御力降低[enemyDef]%',
  check: ({ params , cons }) => cons >= 2 && params.teamA === true,
  data: {
    enemyDef: 30
  }
},
{
  title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons < 6 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 40
  }
},
{
  title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons >= 6 && params.teamA === true,
  sort: 1,
  data: {
    mastery: 48
  }
},
{
  title: '钟离圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  check: ({ params , artis }) => params.teamA === true  && artis.千岩牢固 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  check: ({ params }) => params.teamA === true ,
  data: {
    kx: 20
  }
},
{title: `5.1最后修改：[4.24重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs98ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]
