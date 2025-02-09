import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

import { Format , LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs58ranking = cfg.gs58ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '野干役咒·杀生樱'
let eNameT = 'E'
let qName = '大密法·天狐显真'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '狐灵食罪式'
  eNameT = '野干役咒·杀生樱'
  qNameT = '大密法·天狐显真'
 }  else if ( NamePath == 3 ) {
  eNameT = '野干役咒·杀生樱'
  qNameT = '大密法·天狐显真'
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
const miss = ['c', 'h', 'f', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs58ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[八重神子] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs58ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${aName}一段激化`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'aggravate')
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${aName}二段激化`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'aggravate')
},
{
  title: `${aName}三段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${aName}三段激化`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'aggravate')
},
{
  title: `${a2Name}单段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${a2Name}单段激化`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'aggravate')
},
{
  title: `${a3Name}期间伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `低空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `高空${a3Name}伤害`,
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  check: ({ cons }) => cons < 2,
  title: `壹阶${eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·壹阶'], 'e')
},
{
  check: ({ cons }) => cons < 2,
  title: `壹阶${eName}激化`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·壹阶'], 'e', 'aggravate')
},
{
  title: `贰阶${eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·贰阶'], 'e')
},
{
  title: `贰阶${eName}激化`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·贰阶'], 'e', 'aggravate')
},
{
  title: `叁阶${eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e')
},
{
  title: `叁阶${eName}激化`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
},
{
  check: ({ cons }) => cons >= 2,
  title: `肆阶${eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e')
},
{
  check: ({ cons }) => cons >= 2,
  title: `肆阶${eName}激化`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate')
},
{
  title: `满阶3${eNameT}完整伤害`,
  dmg: ({ talent , cons }, dmg) => {
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    return {
      dmg: e1.dmg * 15 ,
      avg: e1.avg * 15
    }
  }
},
{
  title: `满阶3${eNameT}完整激化`,
  dmgKey: 'e',
  dmg: ({ talent , cons }, dmg) => {
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let e2 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate') : dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
    return {
      dmg: e1.dmg * 10 + e2.dmg * 5 ,
      avg: e1.avg * 10 + e2.avg * 5
    }
  }
},
{
  title: `${qName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  title: '天狐霆雷伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q')
},
{
  title: '天狐霆雷激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
},
{
  title: `${qName}完整伤害`,
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q')
    return {
      dmg: q1.dmg + q2.dmg * 3 ,
      avg: q1.avg + q2.avg * 3
    }
  }
},
{
  title: `${qName}完整激化`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
    return {
      dmg: q1.dmg + q2.dmg * 3 ,
      avg: q1.avg + q2.avg * 3
    }
  }
},
{
  title: '超绽放伤害',
  dmgKey: 'r',
  dmg: ({ calc, attr }, { reaction }) => reaction('hyperBloom')
},
{
  title: '单人站场22秒',
  dmg: ({ talent , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q')
    return {
      dmg: q1.dmg + q2.dmg * 3 + ( a1.dmg + a2.dmg + a3.dmg ) * 8 + e1.dmg * 18 ,
      avg: q1.avg + q2.avg * 3 + ( a1.avg + a2.avg + a3.avg ) * 8 + e1.avg * 18
    }
  }
},
{
  title: '单人站场22秒激化',
  dmgKey: 'dph',
  dmg: ({ talent , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'aggravate')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let aj3 = dmg(talent.a['三段伤害'], 'a', 'aggravate')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let e2 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate') : dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
    return {
      dmg: q1.dmg + q2.dmg * 3 + ( a1.dmg + a2.dmg ) * 8 + a3.dmg * 6 + aj3.dmg * 2 + e1.dmg * 12 + e2.dmg * 6 ,
      avg: q1.avg + q2.avg * 3 + ( a1.avg + a2.avg ) * 8 + a3.avg * 6 + aj3.dmg * 2 + e1.avg * 12 + e2.avg * 6
    }
  }
},
{
 	title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let weaponnn = 0
  let weaponconsn= 0
  if (weapon.name === '西风秘典') {
   weaponn = 3 * 2 * 2
  }
  if (weapon.name === '试作金珀') {
    if (weapon.affix == 1) {
      weaponnn = 4 * 3
    }
    if (weapon.affix == 2) {
      weaponnn = 4.5 * 3
    }
    if (weapon.affix == 3) {
      weaponnn = 5 * 3
    }
    if (weapon.affix == 4) {
      weaponnn = 5.5 * 3
    }
    if (weapon.affix == 5) {
      weaponnn = 6 * 3
    }
  }
  if (weapon.name === '碧落之珑') {
    if (weapon.affix == 1) {
      weaponnn = 4.5 * 2
    }
    if (weapon.affix == 2) {
      weaponnn = 5 * 2
    }
    if (weapon.affix == 3) {
      weaponnn = 5.5 * 2
    }
    if (weapon.affix == 4) {
      weaponnn = 6 * 2
    }
    if (weapon.affix == 5) {
      weaponnn = 6.5 * 2
    }
  }
  if (weapon.name === '万世流涌大典') {
    if (weapon.affix == 1) {
      weaponnn = 8
    }
    if (weapon.affix == 2) {
      weaponnn = 9
    }
    if (weapon.affix == 3) {
      weaponnn = 10
    }
    if (weapon.affix == 4) {
      weaponnn = 11
    }
    if (weapon.affix == 5) {
      weaponnn = 12
    }
  }
  if (weapon.name === '不灭月华') {
    weaponnn = 0.6 * 18
  }
  if (weapon.name === '图莱杜拉的回忆') {
   weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 90 - weaponnn - ( 0.2732 * ( 24 + weaponconsn ) ) ) ),
    type: 'text'
  }
 }
},
{
  title: '单人站场DPS',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q')
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn= 0
    if (weapon.name === '西风秘典') {
     weaponn = 3 * 2 * 2
    }
    if (weapon.name === '试作金珀') {
      if (weapon.affix == 1) {
        weaponnn = 4 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 4.5 * 3
      }
      if (weapon.affix == 3) {
        weaponnn = 5 * 3
      }
      if (weapon.affix == 4) {
        weaponnn = 5.5 * 3
      }
      if (weapon.affix == 5) {
        weaponnn = 6 * 3
      }
    }
    if (weapon.name === '碧落之珑') {
      if (weapon.affix == 1) {
        weaponnn = 4.5 * 2
      }
      if (weapon.affix == 2) {
        weaponnn = 5 * 2
      }
      if (weapon.affix == 3) {
        weaponnn = 5.5 * 2
      }
      if (weapon.affix == 4) {
        weaponnn = 6 * 2
      }
      if (weapon.affix == 5) {
        weaponnn = 6.5 * 2
      }
    }
    if (weapon.name === '万世流涌大典') {
      if (weapon.affix == 1) {
        weaponnn = 8
      }
      if (weapon.affix == 2) {
        weaponnn = 9
      }
      if (weapon.affix == 3) {
        weaponnn = 10
      }
      if (weapon.affix == 4) {
        weaponnn = 11
      }
      if (weapon.affix == 5) {
        weaponnn = 12
      }
    }
    if (weapon.name === '不灭月华') {
      weaponnn = 0.6 * 18
    }
    if (weapon.name === '图莱杜拉的回忆') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 90 - weaponnn - ( 0.2732 * ( 24 + weaponconsn ) ) ) ) )
    return {
      dmg: ( qcn * ( q1.dmg + q2.dmg * 3 ) + ( a1.dmg + a2.dmg + a3.dmg ) * 8 + e1.dmg * 18 ) / 22 ,
      avg: ( qcn * ( q1.avg + q2.avg * 3 ) + ( a1.avg + a2.avg + a3.avg ) * 8 + e1.avg * 18 ) / 22
    }
  }
},
{
  title: '单人站场DPS激化',
  dmgKey: 'dps',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'aggravate')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let aj3 = dmg(talent.a['三段伤害'], 'a', 'aggravate')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let e2 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate') : dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn= 0
    if (weapon.name === '西风秘典') {
     weaponn = 3 * 2 * 2
    }
    if (weapon.name === '试作金珀') {
      if (weapon.affix == 1) {
        weaponnn = 4 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 4.5 * 3
      }
      if (weapon.affix == 3) {
        weaponnn = 5 * 3
      }
      if (weapon.affix == 4) {
        weaponnn = 5.5 * 3
      }
      if (weapon.affix == 5) {
        weaponnn = 6 * 3
      }
    }
    if (weapon.name === '碧落之珑') {
      if (weapon.affix == 1) {
        weaponnn = 4.5 * 2
      }
      if (weapon.affix == 2) {
        weaponnn = 5 * 2
      }
      if (weapon.affix == 3) {
        weaponnn = 5.5 * 2
      }
      if (weapon.affix == 4) {
        weaponnn = 6 * 2
      }
      if (weapon.affix == 5) {
        weaponnn = 6.5 * 2
      }
    }
    if (weapon.name === '万世流涌大典') {
      if (weapon.affix == 1) {
        weaponnn = 8
      }
      if (weapon.affix == 2) {
        weaponnn = 9
      }
      if (weapon.affix == 3) {
        weaponnn = 10
      }
      if (weapon.affix == 4) {
        weaponnn = 11
      }
      if (weapon.affix == 5) {
        weaponnn = 12
      }
    }
    if (weapon.name === '不灭月华') {
      weaponnn = 0.6 * 18
    }
    if (weapon.name === '图莱杜拉的回忆') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 90 - weaponnn - ( 0.2732 * ( 24 + weaponconsn ) ) ) ) )
    return {
      dmg: ( qcn * ( q1.dmg + q2.dmg * 3 ) + ( a1.dmg + a2.dmg ) * 8 + a3.dmg * 6 + aj3.dmg * 2 + e1.dmg * 12 + e2.dmg * 6 ) / 22 ,
      avg: ( qcn * ( q1.avg + q2.avg * 3 ) + ( a1.avg + a2.avg ) * 8 + a3.avg * 6 + aj3.dmg * 2 + e1.avg * 12 + e2.avg * 6 ) / 22
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '八重神子天赋：[启蜇之祝词] 使杀生樱造成的伤害提升[eDmg]%',
  sort: 9,
  data: {
    eDmg: ({ attr, calc }) => calc(attr.mastery) * 0.15
  }
},
{
  title: '八重神子1命：[野狐供真篇] 大密法·天狐显真引发次天狐霆雷，会恢复[_energyevery]点元素能量。',
  cons: 1,
  data: {
    _energyevery: 24
  }
},
{
  title: '八重神子2命：[望月吼哕声] 杀生樱创造时的位阶上限提升至肆阶，攻击范围提升60%。',
  cons: 2
},
{
  title: '八重神子4命：[绯樱引雷章] 杀生樱的落雷命中敌人后，队伍中附近的所有角色获得[dmg]%雷元素伤害加成。',
  cons: 4,
  data: {
    dmg: 20
  }
},
{
  title: '八重神子6命：[大杀生咒禁] 杀生樱在攻击时无视敌人[ignore]%的防御力。',
  cons: 6,
  data: {
    ignore: 60
  }
},
{title: `5.18最后修改：[5.13重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs58ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

