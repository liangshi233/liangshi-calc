import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs42ranking = cfg.gs42ranking
let energy = cfg.energymodel
let c1Dmg = { dmg: 0 , avg: 0 }
let c1jDmg = { dmg: 0 , avg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '星斗归位'
let eNameT = 'E'
let qName = '天街巡游'
let qNameT = 'Q'
let c1Name = '一命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '云来剑法'
  eNameT = '星斗归位'
  c1Name = '一命座'
  qNameT = '天街巡游'
 }  else if ( NamePath == 3 ) {
  eNameT = '星斗归位'
  qNameT = '天街巡游'
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
  c1Name = 'C1'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['c', 'h', 'f', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs42ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[刻晴] 排名规则均未命中，已选择默认排名规则')
      ranking = 'dps'
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
  ranking = `${gs42ranking}`
}
if (!cfg.energymodel) {
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
  title: `${eNameT}后${aName}一段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${eNameT}后${aName}一段激化`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['一段伤害'], 'a', 'aggravate')
},
{
  title: `${aName}二段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${eNameT}后${aName}二段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${eNameT}后${aName}二段激化`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['二段伤害'], 'a', 'aggravate')
},
{
  title: `${aName}三段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${eNameT}后${aName}三段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${eNameT}后${aName}三段激化`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['三段伤害'], 'a', 'aggravate')
},
{
  title: `${aName}四段`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['四段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${aName}四段`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['四段伤害'] / 2 , 'a')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${aName}四段激化`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['四段伤害'] / 2 , 'a', 'aggravate')
    let a2 = dmg(talent.a['四段伤害'] / 2 , 'a')
    return {
      dmg: a1.dmg + a2.dmg  ,
      avg: a1.avg + a2.avg
    }
  }
},
{
  title: `${aName}五段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${eNameT}后${aName}五段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${eNameT}后${aName}五段激化`,
  dmgKey: 'a',
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['五段伤害'], 'a', 'aggravate')
},
{
  title: `${a2Name}伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${a2Name}伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${a2Name}激化`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    let a2 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'aggravate')
    return {
      dmg: a1.dmg + a2.dmg ,
      avg: a1.avg + a2.avg
    }
  }
},
{
  title: `${a3Name}期间伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `${eNameT}后${a3Name}期间伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `低空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `${eNameT}后低空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `${eNameT}后低空${a3Name}激化`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'aggravate')
},
{
  title: `高空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${eNameT}后高空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${eNameT}后高空${a3Name}激化`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'aggravate')
},
{
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['雷楔伤害'], 'e')
},
{
  title: `${eName}激化`,
  dmg: ({ talent }, dmg) => dmg(talent.e['雷楔伤害'], 'e', 'aggravate')
},
{
  title: `${eName}归位伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['斩击伤害'], 'e')
},
{
  title: `${eName}归位激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['斩击伤害'], 'e', 'aggravate')
},
{
  title: `${eName}雷暴伤害`,
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['雷暴连斩伤害'] / 2 , 'e')
    return {
      dmg: e1.dmg * 2 ,
      avg: e1.avg * 2
    }
  }
},
{
  title: `${eName}雷暴激化`,
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['雷暴连斩伤害'] / 2 , 'e')
    let e2 = dmg(talent.e['雷暴连斩伤害'] / 2 , 'e', 'aggravate')
    return {
      dmg: e1.dmg + e2.dmg ,
      avg: e1.avg + e2.avg
    }
  }
},
{
  title: `${c1Name}归位额外伤害`,
  check: ({ cons }) => cons >= 1,
  dmg: ({ attr, calc }, { basic }) => {
    c1Dmg = basic(calc(attr.atk) * 50 / 100, 'e')
    return c1Dmg
  }
},
{
  title: `${c1Name}归位额外激化`,
  check: ({ cons }) => cons >= 1,
  dmg: ({ attr, calc }, { basic }) => {
    c1jDmg = basic(calc(attr.atk) * 50 / 100, 'e', 'aggravate')
    return c1jDmg
  }
},
{
  title: `${qName}启动伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}启动激化`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  title: `${qName}单段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['连斩伤害2'][0], 'q')
},
{
  title: `${qName}单段激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['连斩伤害2'][0], 'q', 'aggravate')
},
{
  title: `${qName}斩击伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['最后一击伤害'], 'q')
},
{
  title: `${qName}斩击激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['最后一击伤害'], 'q', 'aggravate')
},
{
  title: `${qName}完整伤害`,
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['连斩伤害2'][0], 'q')
    let q3 = dmg(talent.q['最后一击伤害'], 'q')
    return {
      dmg: q1.dmg + q2.dmg * 8 + q3.dmg ,
      avg: q1.avg + q2.avg * 8 + q3.avg
    }
  }
},
{
  title: `${qName}完整激化`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['连斩伤害2'][0], 'q')
    let qj2 = dmg(talent.q['连斩伤害2'][0], 'q', 'aggravate')
    let q3 = dmg(talent.q['最后一击伤害'], 'q')
    return {
      dmg: q1.dmg + q2.dmg * 5 + qj2.dmg * 3 + q3.dmg ,
      avg: q1.avg + q2.avg * 5 + qj2.avg * 3 + q3.avg
    }
  }
},
{
  title: '单人站场15秒',
  dmg: ({ talent , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'phy')
    let e1 = dmg(talent.e['雷楔伤害'], 'e')
    let e2 = dmg(talent.e['斩击伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['连斩伤害2'][0], 'q')
    let q3 = dmg(talent.q['最后一击伤害'], 'q')
    let cons1 = cons >= 1 ? 4 : 0
    let c1 = c1Dmg
    return {
      dmg: c1.dmg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 8 * ( a1.dmg + a2.dmg * 2 ) + 2 * ( e1.dmg + e2.dmg ) + q1.dmg + q2.dmg * 8 + q3.dmg ,
      avg: c1.avg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 8 * ( a1.dmg + a2.dmg * 2 ) + 2 * ( e1.avg + e2.avg ) + q1.avg + q2.avg * 8 + q3.avg
    }
  }
},
{
  title: '单人站场15秒激化',
  dmgKey: 'dph',
  dmg: ({ talent , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a1j = dmg(talent.a['一段伤害'], 'a', 'aggravate')
    let a2 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    let a2j = dmg(talent.a['重击伤害'] / 2 , 'a2', 'aggravate')
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'phy')
    let e1 = dmg(talent.e['雷楔伤害'], 'e', 'aggravate')
    let e2 = dmg(talent.e['斩击伤害'], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['连斩伤害2'][0], 'q')
    let q2j = dmg(talent.q['连斩伤害2'][0], 'q', 'aggravate')
    let q3 = dmg(talent.q['最后一击伤害'], 'q')
    let cons1 = cons >= 1 ? 4 : 0
    let c1 = c1Dmg
    return {
      dmg: c1.dmg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 4 * ( a1.dmg + a2.dmg * 3 + a1j.dmg + a2j.dmg ) + 2 * ( e1.dmg + e2.dmg ) + q1.dmg + q2.dmg * 5 + q2j.dmg * 3 + q3.dmg ,
      avg: c1.avg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 4 * ( a1.dmg + a2.dmg * 3 + a1j.dmg + a2j.dmg ) + 2 * ( e1.avg + e2.avg ) + q1.avg + q2.avg * 5 + q2j.avg * 3 + q3.avg
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
  if (weapon.name === '祭礼剑') {
   weaponn = 2.5 * 3
  }
  if (cons >= 2) {
   consn = 1 * 3
  }
  if (weapon.name === '天空之刃') {
    weaponconsn = 1
  }
  return {
    avg: Format.percent( ( calc(attr.recharge) / 100 * ( 2.5 * 3 * 2 + weaponn + consn + energy ) ) / ( 40 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'phy')
    let e1 = dmg(talent.e['雷楔伤害'], 'e')
    let e2 = dmg(talent.e['斩击伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['连斩伤害2'][0], 'q')
    let q3 = dmg(talent.q['最后一击伤害'], 'q')
    let cons1 = cons >= 1 ? 4 : 0
    let c1 = c1Dmg
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
    if (weapon.name === '祭礼剑') {
     weaponn = 2.5 * 3
    }
    if (cons >= 2) {
     consn = 1 * 3
    }
    if (weapon.name === '天空之刃') {
      weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( 2.5 * 3 * 2 + weaponn + consn + energy ) ) / ( 40 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) ) )
    return {
      dmg: ( c1.dmg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 8 * ( a1.dmg + a2.dmg * 2 ) + 2 * ( e1.dmg + e2.dmg ) + qcn * ( q1.dmg + q2.dmg * 8 + q3.dmg ) ) / 15 ,
      avg: ( c1.avg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 8 * ( a1.dmg + a2.dmg * 2 ) + 2 * ( e1.avg + e2.avg ) + qcn * ( q1.avg + q2.avg * 8 + q3.avg ) ) / 15
    }
  }
},
{
  title: '单人站场期望DPS激化',
  dmgKey: 'dps',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a1j = dmg(talent.a['一段伤害'], 'a', 'aggravate')
    let a2 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    let a2j = dmg(talent.a['重击伤害'] / 2 , 'a2', 'aggravate')
    let a3 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'phy')
    let e1 = dmg(talent.e['雷楔伤害'], 'e', 'aggravate')
    let e2 = dmg(talent.e['斩击伤害'], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['连斩伤害2'][0], 'q')
    let q2j = dmg(talent.q['连斩伤害2'][0], 'q', 'aggravate')
    let q3 = dmg(talent.q['最后一击伤害'], 'q')
    let cons1 = cons >= 1 ? 4 : 0
    let c1 = c1Dmg
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
    if (weapon.name === '祭礼剑') {
     weaponn = 2.5 * 3
    }
    if (cons >= 2) {
     consn = 1 * 3
    }
    if (weapon.name === '天空之刃') {
      weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( 2.5 * 3 * 2 + weaponn + consn + energy ) ) / ( 40 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) ) )
    return {
      dmg: ( c1.dmg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 4 * ( a1.dmg + a2.dmg * 3 + a1j.dmg + a2j.dmg ) + 2 * ( e1.dmg + e2.dmg ) + qcn * ( q1.dmg + q2.dmg * 5 + q2j.dmg * 3 + q3.dmg ) ) / 15 ,
      avg: ( c1.avg * cons1 + 2 * ( a3.dmg + a4.dmg * 2 ) + 4 * ( a1.dmg + a2.dmg * 3 + a1j.dmg + a2j.dmg ) + 2 * ( e1.avg + e2.avg ) + qcn * ( q1.avg + q2.avg * 5 + q2j.avg * 3 + q3.avg ) ) / 15
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '刻晴天赋：[玉衡之贵] 施放天街巡游时,暴击率提升[cpct]%,元素充能效率提升[recharge]%',
  data: {
    cpct: 15,
    recharge: 15
  }
},
{
  title: '刻晴1命：[雷厉] 雷楔存在期间再次施放星斗归位时，在消失与出现的位置造成雷元素范围伤害。',
  cons: 1
},
{
  title: '刻晴4命：[调律] 触发雷元素相关反应后，攻击力提升[atkPct]%',
  cons: 4,
  data: {
    atkPct: 25
  }
},
{
  title: '刻晴6命：[调律] 进行普通攻击、重击、施放元素战技或元素爆发时，获得[dmg]%雷元素伤害加成',
  cons: 6,
  data: {
    dmg: 6 * 4
  }
},
{title: `5.19最后修改：[5.19重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs42ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

