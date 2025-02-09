import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs79ranking = cfg.gs79ranking
let energy = cfg.energymodel
let q1Dmg = { dmg: 0 , avg: 0 }
let q2Dmg = { dmg: 0 , avg: 0 }
let q3Dmg = { dmg: 0 , avg: 0 }
let qz1Dmg = { dmg: 0 , avg: 0 }
let qz2Dmg = { dmg: 0 , avg: 0 }
let qz3Dmg = { dmg: 0 , avg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '熔铁流狱'
let eNameT = 'E'
let qName = '炎啸狮子咬'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '拂金剑斗术'
  eNameT = '熔铁流狱'
  qNameT = '炎啸狮子咬'
 }  else if ( NamePath == 3 ) {
  eNameT = '熔铁流狱'
  qNameT = '炎啸狮子咬'
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
const miss = ['h', 'f', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs79ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[迪希雅] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs79ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${aName}二段`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${aName}三段`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${aName}四段`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${a2Name}循环伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
},
{
  title: `${a2Name}终结伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
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
  title: '净焰昂藏伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['净焰昂藏伤害'], 'e')
},
{
  title: '净焰昂藏蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['净焰昂藏伤害'], 'e', 'vaporize')
},
{
  title: '剑域炽焰伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['剑域炽焰伤害'], 'e')
},
{
  title: '剑域炽焰蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['剑域炽焰伤害'], 'e', 'vaporize')
},
{
  title: '净焰剑狱协同攻击',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e')
  }
},
{
  title: '领域伤害蒸发',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e', 'vaporize')
  }
},
{
  title: `${eName}完整伤害`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td1 = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let e1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'e')
    let e2 = basic(talent.e['净焰昂藏伤害'] * atk / 100 , 'e')
    let e3 = basic(talent.e['剑域炽焰伤害'] * atk / 100 , 'e')
    return {
      dmg: e1.dmg * 5 + e2.dmg + e3.dmg + cons2 * ( e1.dmg * 2 ),
      avg: e1.avg * 5 + e2.avg + e3.avg + cons2 * ( e1.avg * 2 )
    }
  }
},
{
  title: `${eName}完整蒸发`,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td1 = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let e1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'e', 'vaporize')
    let e2 = basic(talent.e['净焰昂藏伤害'] * atk / 100 , 'e', 'vaporize')
    let e3 = basic(talent.e['剑域炽焰伤害'] * atk / 100 , 'e', 'vaporize')
    return {
      dmg: e1.dmg * 5 + e2.dmg + e3.dmg + cons2 * ( e1.dmg * 2 ),
      avg: e1.avg * 5 + e2.avg + e3.avg + cons2 * ( e1.avg * 2 )
    }
  }
},
{
  title: '消解伤害上限',
  dmg: ({ attr, calc, talent }) => {
    return {
      avg: Format.number(calc(attr.hp) * 2 / 0.4 / ( ( 100 - talent.e['消解减免'] ) / 100 ) ),
      type: 'text'
    }
  }
},
{
  title: '炽鬃拳伤害',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
},
{
  title: '炽鬃拳蒸发',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
  }
},
{
  title: '炽鬃拳一段',
  params: { q: 1 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    q1Dmg = basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
    return q1Dmg
  }
},
{
  title: '炽鬃拳一段蒸发',
  params: { q: 1 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    qz1Dmg = basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
    return qz1Dmg
  }
},
{
  title: '炽鬃拳二段',
  params: { q: 2 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    q2Dmg = basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
    return q2Dmg
  }
},
{
  title: '炽鬃拳二段蒸发',
  params: { q: 2 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    qz2Dmg = basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
    return qz2Dmg
  }
},
{
  title: '炽鬃拳三段',
  params: { q: 3 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    q3Dmg = basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
    return q3Dmg
  }
},
{
  title: '炽鬃拳三段蒸发',
  params: { q: 3 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    qz3Dmg = basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
    return qz3Dmg
  }
},
{
  title: '焚落踢伤害',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['焚落踢伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
},
{
  title: '焚落踢蒸发',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['焚落踢伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
  }
},
{
  title: `${qName}完整伤害`,
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td1 = talent.q['炽鬃拳伤害2']
    const td2 = talent.q['焚落踢伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    let cons6 = cons * 1 >= 6 ? 1 : 0
    let q1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q')
    let q2 = basic(td2[0] * atk / 100 + td2[1] * hp / 100, 'q')
    let q3 = q1Dmg
    let q4 = q2Dmg
    let q5 = q3Dmg
    return {
      dmg: q1.dmg * 10 + q2.dmg + cons6 * ( q1.dmg * 2 + q3.dmg + q4.dmg + q5.dmg ),
      avg: q1.avg * 10 + q2.avg + cons6 * ( q1.avg * 2 + q3.avg + q4.avg + q5.avg )
    }
  }
},
{
  title: `${qName}完整蒸发`,
  dmgKey: 'q',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td1 = talent.q['炽鬃拳伤害2']
    const td2 = talent.q['焚落踢伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    let cons6 = cons * 1 >= 6 ? 1 : 0
    let q1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q')
    let q2 = basic(td2[0] * atk / 100 + td2[1] * hp / 100, 'q', 'vaporize')
    let q6 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q', 'vaporize')
    let q3 = qz1Dmg
    let q4 = q2Dmg
    let q5 = q3Dmg
    return {
      dmg: q1.dmg * 6 + q6.dmg * 4 + q2.dmg + cons6 * ( q1.dmg * 2 + q3.dmg + q4.dmg + q5.dmg ),
      avg: q1.avg * 6 + q6.avg * 4 + q2.avg + cons6 * ( q1.avg * 2 + q3.avg + q4.avg + q5.avg )
    }
  }
},
{
  title: '单人站场20秒',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let q3 = q1Dmg
    let q4 = q2Dmg
    let q5 = q3Dmg
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    const te1 = talent.e['领域伤害2']
    const td1 = talent.q['炽鬃拳伤害2']
    const td2 = talent.q['焚落踢伤害2']
    let cons6 = cons * 1 >= 6 ? 1 : 0
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let e2 = basic(talent.e['净焰昂藏伤害'] * atk / 100 , 'e')
    let e3 = basic(talent.e['剑域炽焰伤害'] * atk / 100 , 'e')
    let a1 = basic(talent.a['一段伤害'] * atk / 100 , 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * atk / 100 , 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * atk / 100 , 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * atk / 100 , 'a', 'phy')
    let q1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q')
    let q2 = basic(td2[0] * atk / 100 + td2[1] * hp / 100, 'q')
    let e1 = basic(te1[0] * atk / 100 + te1[1] * hp / 100, 'e')
    return {
      dmg: 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + q1.dmg * 10 + q2.dmg + cons6 * ( q1.dmg * 2 + q3.dmg + q4.dmg + q5.dmg - ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) ) + e1.dmg * 5 + e2.dmg + e3.dmg + cons2 * ( e1.dmg * 2 ),
      avg: 3 * ( a1.avg + a2.avg + a3.avg + a4.avg ) + q1.avg * 10 + q2.avg + cons6 * ( q1.avg * 2 + q3.avg + q4.avg + q5.avg - ( a1.avg + a2.avg + a3.avg + a4.avg ) ) + e1.avg * 5 + e2.avg + e3.avg + cons2 * ( e1.avg * 2 )
    }
  }
},
{
  title: '单人站场20秒蒸发',
  params: { q: 4 },
  dmgKey: 'dph',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let q3 = qz1Dmg
    let q4 = q2Dmg
    let q5 = q3Dmg
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    const te1 = talent.e['领域伤害2']
    const td1 = talent.q['炽鬃拳伤害2']
    const td2 = talent.q['焚落踢伤害2']
    let cons6 = cons * 1 >= 6 ? 1 : 0
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let a1 = basic(talent.a['一段伤害'] * atk / 100 , 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * atk / 100 , 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * atk / 100 , 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * atk / 100 , 'a', 'phy')
    let q1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q')
    let e2 = basic(talent.e['净焰昂藏伤害'] * atk / 100 , 'e', 'vaporize')
    let e3 = basic(talent.e['剑域炽焰伤害'] * atk / 100 , 'e', 'vaporize')
    let e1 = basic(te1[0] * atk / 100 + te1[1] * hp / 100, 'e', 'vaporize')
    let q2 = basic(td2[0] * atk / 100 + td2[1] * hp / 100, 'q', 'vaporize')
    let q6 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q', 'vaporize')
    return {
      dmg: 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + q1.dmg * 6 + q6.dmg * 4 + q2.dmg + cons6 * ( q1.dmg * 2 + q3.dmg + q4.dmg + q5.dmg - ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) ) + e1.dmg * 5 + e2.dmg + e3.dmg + cons2 * ( e1.dmg * 2 ),
      avg: 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + q1.avg * 6 + q6.avg * 4 + q2.avg + cons6 * ( q1.avg * 2 + q3.avg + q4.avg + q5.avg - ( a1.avg + a2.avg + a3.avg + a4.avg ) ) + e1.avg * 5 + e2.avg + e3.avg + cons2 * ( e1.avg * 2 )
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let consn = 0
  let consnn = 0
  let weaponnn = 0
  let weaponconsn = 0
  let weaponconsnn = 0
  if (weapon.name === '便携动力锯') {
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
  if (weapon.name === '桂木斩长正') {
    if (weapon.affix == 1) {
      weaponnn = 3 * 3 * 2 -3
    }
    if (weapon.affix == 2) {
      weaponnn = 3.5 * 3 * 2 -3
    }
    if (weapon.affix == 3) {
      weaponnn = 4 * 3 * 2 -3
    }
    if (weapon.affix == 4) {
      weaponnn = 4.5 * 3 * 2 - 3
    }
    if (weapon.affix == 5) {
      weaponnn = 5 * 3 * 2 - 3
    }
  }
  if (weapon.name === '西风大剑') {
    weaponn = 3 * 2 * 2
  }
  if (cons >= 4) {
    consn = 1.5 * 10
    if (cons >= 6) {
      consn = 1.5 * 15
    }
  }
  if (cons >= 2) {
   consnn = 2
  }
  if (cons >= 6) {
   weaponconsnn = -4
  }
  if (weapon.name === '松籁响起之时') {
  weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  return {
    avg: Format.percent( ( calc(attr.recharge) / 100 * ( ( 5 + consnn ) * 3 + weaponn + energy ) ) / ( 70 - consn - weaponnn - ( 0.2732 * ( 12 + weaponconsn + weaponconsnn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons, weapon }, { basic }) => {
    let q3 = q1Dmg
    let q4 = q2Dmg
    let q5 = q3Dmg
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    const te1 = talent.e['领域伤害2']
    const td1 = talent.q['炽鬃拳伤害2']
    const td2 = talent.q['焚落踢伤害2']
    let cons6 = cons * 1 >= 6 ? 1 : 0
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let e2 = basic(talent.e['净焰昂藏伤害'] * atk / 100 , 'e')
    let e3 = basic(talent.e['剑域炽焰伤害'] * atk / 100 , 'e')
    let a1 = basic(talent.a['一段伤害'] * atk / 100 , 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * atk / 100 , 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * atk / 100 , 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * atk / 100 , 'a', 'phy')
    let q1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q')
    let q2 = basic(td2[0] * atk / 100 + td2[1] * hp / 100, 'q')
    let e1 = basic(te1[0] * atk / 100 + te1[1] * hp / 100, 'e')
    let weaponn = 0
    let consn = 0
    let consnn = 0
    let weaponnn = 0
    let weaponconsn = 0
    let weaponconsnn = 0
    if (weapon.name === '便携动力锯') {
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
    if (weapon.name === '桂木斩长正') {
      if (weapon.affix == 1) {
        weaponnn = 3 * 3 * 2 -3
      }
      if (weapon.affix == 2) {
        weaponnn = 3.5 * 3 * 2 -3
      }
      if (weapon.affix == 3) {
        weaponnn = 4 * 3 * 2 -3
      }
      if (weapon.affix == 4) {
        weaponnn = 4.5 * 3 * 2 - 3
      }
      if (weapon.affix == 5) {
        weaponnn = 5 * 3 * 2 - 3
      }
    }
    if (weapon.name === '西风大剑') {
      weaponn = 3 * 2 * 2
    }
    if (cons >= 4) {
      consn = 1.5 * 10
      if (cons >= 6) {
        consn = 1.5 * 15
      }
    }
    if (cons >= 2) {
     consnn = 2
    }
    if (cons >= 6) {
     weaponconsnn = -4
    }
    if (weapon.name === '松籁响起之时') {
    weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( ( calc(attr.recharge) / 100 * ( ( 5 + consnn ) * 3 + weaponn + energy ) ) / ( 70 - consn - weaponnn - ( 0.2732 * ( 12 + weaponconsn + weaponconsnn ) ) ) ) )
    return {
      dmg: ( ( 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + qcn * ( q1.dmg * 10 + q2.dmg + cons6 * ( q1.dmg * 2 + q3.dmg + q4.dmg + q5.dmg - ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) ) ) ) + e1.dmg * 5 + e2.dmg + e3.dmg + cons2 * ( e1.dmg * 2 ) ) / 20,
      avg: ( ( 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + qcn * ( q1.avg * 10 + q2.avg + cons6 * ( q1.avg * 2 + q3.avg + q4.avg + q5.avg - ( a1.avg + a2.avg + a3.avg + a4.avg ) ) ) ) + e1.avg * 5 + e2.avg + e3.avg + cons2 * ( e1.avg * 2 ) ) / 20
    }
  }
},
{
  title: '单人站场期望DPS蒸发',
  dmgKey: 'dps',
  params: { q: 4 },
  dmg: ({ talent, calc, attr, cons, weapon }, { basic }) => {
    let q3 = qz1Dmg
    let q4 = q2Dmg
    let q5 = q3Dmg
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    const te1 = talent.e['领域伤害2']
    const td1 = talent.q['炽鬃拳伤害2']
    const td2 = talent.q['焚落踢伤害2']
    let cons6 = cons * 1 >= 6 ? 1 : 0
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let a1 = basic(talent.a['一段伤害'] * atk / 100 , 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * atk / 100 , 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * atk / 100 , 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * atk / 100 , 'a', 'phy')
    let q1 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q')
    let e2 = basic(talent.e['净焰昂藏伤害'] * atk / 100 , 'e', 'vaporize')
    let e3 = basic(talent.e['剑域炽焰伤害'] * atk / 100 , 'e', 'vaporize')
    let e1 = basic(te1[0] * atk / 100 + te1[1] * hp / 100, 'e', 'vaporize')
    let q2 = basic(td2[0] * atk / 100 + td2[1] * hp / 100, 'q', 'vaporize')
    let q6 = basic(td1[0] * atk / 100 + td1[1] * hp / 100, 'q', 'vaporize')
    let weaponn = 0
    let consn = 0
    let consnn = 0
    let weaponnn = 0
    let weaponconsn = 0
    let weaponconsnn = 0
    if (weapon.name === '便携动力锯') {
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
    if (weapon.name === '桂木斩长正') {
      if (weapon.affix == 1) {
        weaponnn = 3 * 3 * 2 -3
      }
      if (weapon.affix == 2) {
        weaponnn = 3.5 * 3 * 2 -3
      }
      if (weapon.affix == 3) {
        weaponnn = 4 * 3 * 2 -3
      }
      if (weapon.affix == 4) {
        weaponnn = 4.5 * 3 * 2 - 3
      }
      if (weapon.affix == 5) {
        weaponnn = 5 * 3 * 2 - 3
      }
    }
    if (weapon.name === '西风大剑') {
      weaponn = 3 * 2 * 2
    }
    if (cons >= 4) {
      consn = 1.5 * 10
      if (cons >= 6) {
        consn = 1.5 * 15
      }
    }
    if (cons >= 2) {
     consnn = 2
    }
    if (cons >= 6) {
     weaponconsnn = -4
    }
    if (weapon.name === '松籁响起之时') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( ( ( calc(attr.recharge) / 100 * ( ( 5 + consnn ) * 3 + weaponn + energy ) ) ) / ( 70 - consn - weaponnn - ( 0.2732 * ( 12 + weaponconsn + weaponconsnn ) ) ) ) )
    return {
      dmg: ( 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + qcn * ( q1.dmg * 6 + q6.dmg * 4 + q2.dmg + cons6 * ( q1.dmg * 2 + q3.dmg + q4.dmg + q5.dmg - ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) ) ) + e1.dmg * 5 + e2.dmg + e3.dmg + cons2 * ( e1.dmg * 2 ) ) / 20,
      avg: ( 3 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + qcn * ( q1.avg * 6 + q6.avg * 4 + q2.avg + cons6 * ( q1.avg * 2 + q3.avg + q4.avg + q5.avg - ( a1.avg + a2.avg + a3.avg + a4.avg ) ) ) + e1.avg * 5 + e2.avg + e3.avg + cons2 * ( e1.avg * 2 ) ) / 20
    }
  }
},
{
  title: `迪甘莫妲 ${eNameT}协同伤害`,
  params: { teamA: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.e['领域伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'e')
  }
},
{
  title: '迪甘莫妲 炽鬃拳伤害',
  params: { teamA: true , q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q')
  }
},
{
  title: '迪甘莫妲 炽鬃拳蒸发',
  params: { teamA: true , q: 4 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    const td = talent.q['炽鬃拳伤害2']
    const hp = calc(attr.hp)
    const atk = calc(attr.atk)
    return basic(td[0] * atk / 100 + td[1] * hp / 100, 'q', 'vaporize')
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '迪希雅天赋：[不吝佑助] 施放熔铁流狱·净焰昂藏后将获得额外的[_interruption]%抗打断能力,承担来自赤鬃之血的伤害时,受到的伤害降低60%.',
  data: {
    _interruption: 100
  }
},
{
  title: '迪希雅1命：[皎洁之火铓辉灿漫] 生命值上限提升[hpPct]%',
  cons: 1,
  data: {
    hpPct: 20
  }
},
{
  title: '迪希雅1命：[皎洁之火铓辉灿漫] 熔铁流狱伤害提高[ePlus]，炎啸狮子咬伤害提高[qPlus]',
  sort: 9,
  cons: 1,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.036,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 0.06
  }
},
{
  title: '迪希雅2命：[净沙利刃明映万乘] 重新产生的净焰剑狱领域持续时间延长6秒,领域内的当前场上角色受到攻击时,将使净焰剑狱协同攻击造成的伤害提升[eDmg]%',
  cons: 2,
  data: {
    eDmg: 50
  }
},
{
  title: '迪希雅4命：[服膺誓禁恪守无失] 炽鬃拳与焚落踢命中敌人时，将为迪希雅恢复[_energyevery]点元素能量，并恢复生命值',
  cons: 2,
  data: {
    _energyevery: 1.5
  }
},
{
  check: ({ params }) => params.q !== undefined,
  title: '迪希雅6命：[燎燃利爪裂帛斫金] 炎啸狮子咬的暴击率提升[qCpct]%，炽鬃拳命中敌人并造成暴击后,炎啸狮子咬的暴击伤害提升[qCdmg]%,持续时间延长2秒',
  cons: 6,
  data: {
   qCpct: 10,
   qCdmg: ({ params }) => params.q * 15
  }
},
{
  check: ({ cons,params }) => cons >= 4 && params.teamA === true ,
  title: '甘雨4命：[西狩] 在降众天华的领域内，敌人受到的伤害会增加[dmg]%',
  data: {
   dmg: 25 ,
 }
},
{
  title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时,暴击率提升[cpct]%',
  check: ({ params , cons }) => cons >= 4 && params.teamA === true,
  data: {
    cpct: 15
  }
},
{
  title: '莫娜技能：[星命定轨] 对敌人施加星异的伤害加成效果,并以此提高[dmg]%这一次造成的伤害',
  check: ({ params }) => params.teamA === true,
  data: {
    dmg: 60
  }
},
{
  title: '莫娜武器：[讨龙英杰谭-精5] 主动切换角色时,新登场的角色攻击力提升[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 48
  }
},
{
  title: '莫娜圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
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
  title: '纳西妲2命：[正等善见之根] 处于纳西妲施加的蕴种印状态下的敌人,触发燃烧、绽放、超绽放、烈绽放反应伤害能够造成暴击,暴击率固定为[_fusionCpct]%，暴击伤害固定为[_fusionCdmg]%',
  check: ({ params , cons }) => cons >= 2 && params.teamA === true,
  data: {
    _fusionCpct: 20,
    _fusionCdmg: 100
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '元素共鸣：[交织之护] 全元素与物理抗性提升[_res]%',
  data: {
  	_res: 15
  }
},
'vaporize',
{title: `6.9最后修改：[12.11重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs79ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

