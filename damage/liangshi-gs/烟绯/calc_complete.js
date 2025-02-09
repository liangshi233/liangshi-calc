import { Format , LSconfig } from '#liangshi'
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
const miss = ['c', 'h', 'f', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs48ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[烟绯] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs48ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${aName}二段`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${aName}三段`,
  dmgKey: 'a',
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `0层丹火印${a2Name}`,
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2')
},
{
  title: `0层丹火印${a2Name}蒸发`,
  dmgKey: 'undefined',
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2', 'vaporize')
},
{
  title: `1层丹火印${a2Name}`,
  params: { gltk: 1 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][1], 'a2')
},
{
  title: `1层丹火印${a2Name}蒸发`,
  params: { gltk: 1 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][1], 'a2', 'vaporize')
},
{
  title: `2层丹火印${a2Name}`,
  params: { gltk: 2 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][2], 'a2')
},
{
  title: `2层丹火印${a2Name}蒸发`,
  params: { gltk: 2 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][2], 'a2', 'vaporize')
},
{
  title: `3层丹火印${a2Name}`,
  params: { gltk: 3 },
  dmg: ({ talent, cons }, dmg) => {
    zj3Dmg = dmg(talent.a['重击伤害2'][3], 'a2')
    return zj3Dmg
  }
},
{
  title: `3层丹火印${a2Name}蒸发`,
  params: { gltk: 3 },
  dmg: ({ talent, cons }, dmg) => {
    z3Dmg = dmg(talent.a['重击伤害2'][3], 'a2', 'vaporize')
    return z3Dmg
  }
},
{
  title: `4层丹火印${a2Name}`,
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 },
  dmg: ({ talent, cons }, dmg) => {
    zj4Dmg = dmg(talent.a['重击伤害2'][4], 'a2')
    return zj4Dmg
  }
},
{
  title: `4层丹火印${a2Name}蒸发`,
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 },
  dmg: ({ talent, cons }, dmg) => {
    z4Dmg = dmg(talent.a['重击伤害2'][4], 'a2', 'vaporize')
    return z4Dmg
  }
},
{
  title: `${qNameT}后0层丹火印${a2Name}`,
  params: { q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2')
},
{
  title: `${qNameT}后0层丹火印${a2Name}蒸发`,
  params: { q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][0], 'a2', 'vaporize')
},
{
  title: `${qNameT}后1层丹火印${a2Name}`,
  params: { gltk: 1 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][1], 'a2')
},
{
  title: `${qNameT}后1层丹火印${a2Name}蒸发`,
  params: { gltk: 1 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][1], 'a2', 'vaporize')
},
{
  title: `${qNameT}后2层丹火印${a2Name}`,
  params: { gltk: 2 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][2], 'a2')
},
{
  title: `${qNameT}后2层丹火印${a2Name}蒸发`,
  params: { gltk: 2 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][2], 'a2', 'vaporize')
},
{
  title: `${qNameT}后3层丹火印${a2Name}`,
  params: { gltk: 3 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][3], 'a2')
},
{
  title: `${qNameT}后3层丹火印${a2Name}蒸发`,
  dmgKey: 'z',
  params: { gltk: 3 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][3], 'a2', 'vaporize')
},
{
  title: `${qNameT}后4层丹火印${a2Name}`,
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][4], 'a2')
},
{
  title: `${qNameT}后4层丹火印${a2Name}蒸发`,
  check: ({ cons }) => cons >= 6,
  dmgKey: 'z',
  params: { gltk: 4 , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][4], 'a2', 'vaporize')
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
},
{
  title: `${qName}护盾量`,
  params: { hd: true },
  check: ({ cons }) => cons >= 4,
  dmg: ({ attr, calc }, { shield }) => shield( calc(attr.hp) * 45 / 100)
},
{
  title: '法兽灼眼伤害',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 80 / 100, 'a2')
},
{
  title: '法兽灼眼伤害',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 80 / 100, 'a2')
},
{
  title: '法兽灼眼蒸发',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 80 / 100, 'a2', 'vaporize')
},
{
  title: '法兽灼眼蒸发',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 80 / 100, 'a2', 'vaporize')
},
{
  title: '法兽灼眼期望伤害',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 },
  dmg: ({ attr, calc }, { basic }) => {
   t3Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2')
   return t3Dmg
  }
},
{
  title: '法兽灼眼期望蒸发',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 },
  dmg: ({ attr, calc }, { basic }) => {
   tz3Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2', 'vaporize')
   return tz3Dmg
  }
},
{
  title: '法兽灼眼期望伤害',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 },
  dmg: ({ attr, calc }, { basic }) => {
   t4Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2')
   return t4Dmg
  }
},
{
  title: '法兽灼眼期望蒸发',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 },
  dmg: ({ attr, calc }, { basic }) => {
   tz4Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2', 'vaporize')
   return tz4Dmg
  }
},
{
  title: `${qNameT}后法兽灼眼期望伤害`,
  check: ({ cons }) => cons < 6,
  params: { gltk: 4 , q: true },
  dmg: ({ attr, calc }, { basic }) => {
   qt3Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2')
   return qt3Dmg
  }
},
{
  title: `${qNameT}后法兽灼眼期望蒸发`,
  check: ({ cons }) => cons < 6,
  params: { gltk3: true , q: true },
  dmg: ({ attr, calc }, { basic }) => {
   qtz3Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2', 'vaporize')
   return qtz3Dmg
  }
},
{
  title: `${qNameT}后法兽灼眼期望伤害`,
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , q: true },
  dmg: ({ attr, calc }, { basic }) => {
   qt4Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2')
   return qt4Dmg
  }
},
{
  title: `${qNameT}后法兽灼眼期望蒸发`,
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , q: true },
  dmg: ({ attr, calc }, { basic }) => {
   qtz4Dmg = basic(calc(attr.atk) * 80 / 100 * calc(attr.cpct) / 100, 'a2', 'vaporize')
   return qtz4Dmg
  }
},
{
  title: '单人站场20秒',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 , q: true },
  dmg: ({ attr , talent , calc , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e')
    let q = dmg(talent.q['技能伤害'], 'q')
    let zq = dmg(talent.a['重击伤害2'][3], 'a2')
    let z = zj3Dmg
    let t = t3Dmg
    let qt = qt3Dmg
    return {
      dmg: q.dmg + e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( zq.dmg + qt.dmg ) * 5 + ( z.dmg + t.dmg ) * 2 ,
      avg: q.avg + e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( zq.avg + qt.avg ) * 5 + ( z.avg + t.avg ) * 2
    }
  }
},
{
  title: '单人站场20秒',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , q: true },
  dmg: ({ attr , talent , calc , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e')
    let q = dmg(talent.q['技能伤害'], 'q')
    let zq = dmg(talent.a['重击伤害2'][4], 'a2')
    let z = zj4Dmg
    let t = t4Dmg
    let qt = qt4Dmg
    return {
      dmg: q.dmg + e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( zq.dmg + qt.dmg ) * 5 + ( z.dmg + t.dmg ) * 2 ,
      avg: q.avg + e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( zq.avg + qt.avg ) * 5 + ( z.avg + t.avg ) * 2
    }
  }
},
{
  title: '单人站场20秒蒸发',
  check: ({ cons }) => cons < 6,
  dmgKey: 'dph',
  params: { gltk: 3 , q: true },
  dmg: ({ attr , talent , calc , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e', 'vaporize')
    let q = dmg(talent.q['技能伤害'], 'q', 'vaporize')
    let zq = dmg(talent.a['重击伤害2'][3], 'a2', 'vaporize')
    let z = z3Dmg
    let t = tz3Dmg
    let qt = qtz3Dmg
    return {
      dmg: q.dmg + e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( zq.dmg + qt.dmg ) * 5 + ( z.dmg + t.dmg ) * 2 ,
      avg: q.avg + e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( zq.avg + qt.avg ) * 5 + ( z.avg + t.avg ) * 2
    }
  }
},
{
  title: '单人站场20秒蒸发',
  check: ({ cons }) => cons >= 6,
  dmgKey: 'dph',
  params: { gltk: 4 , q: true },
  dmg: ({ attr , talent , calc , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e', 'vaporize')
    let q = dmg(talent.q['技能伤害'], 'q', 'vaporize')
    let zq = dmg(talent.a['重击伤害2'][4], 'a2', 'vaporize')
    let z = z4Dmg
    let t = tz4Dmg
    let qt = qtz4Dmg
    return {
      dmg: q.dmg + e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( zq.dmg + qt.dmg ) * 5 + ( z.dmg + t.dmg ) * 2 ,
      avg: q.avg + e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( zq.avg + qt.avg ) * 5 + ( z.avg + t.avg ) * 2
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
  if (weapon.name === '祭礼残章') {
   weaponn = 3 * 3
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
    weaponnn = 0.6 * 9
  }
  if (weapon.name === '图莱杜拉的回忆') {
   weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 80 - weaponnn - ( 0.2732 * ( 18 + weaponconsn ) ) ) ),
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 , q: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e')
    let q = dmg(talent.q['技能伤害'], 'q')
    let zq = dmg(talent.a['重击伤害2'][3], 'a2')
    let z = zj3Dmg
    let t = t3Dmg
    let qt = qt3Dmg
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn= 0
    if (weapon.name === '西风秘典') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼残章') {
      weaponn = 3 * 3
    }
    if (weapon.name === '试作金珀') {
      if (weapon.affix == 1) {
        weaponnn = 4 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 4.5* 3
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
      weaponnn = 0.6 * 9
    }
    if (weapon.name === '图莱杜拉的回忆') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 80 - weaponnn - ( 0.2732 * ( 18 + weaponconsn ) ) ) )
    return {
      dmg: ( e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( z.dmg + t.dmg ) * 7 + ( q.dmg + 5 * ( zq.dmg - z.dmg + qt.dmg - t.dmg ) ) * qcn ) / 20,
      avg: ( e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( z.avg + t.avg ) * 7 + ( q.avg + 5 * ( zq.avg - z.avg + qt.avg - t.dmg ) ) * qcn ) / 20
    }
  }
},
{
  title: '单人站场期望DPS',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , q: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e')
    let q = dmg(talent.q['技能伤害'], 'q')
    let zq = dmg(talent.a['重击伤害2'][4], 'a2')
    let z = zj4Dmg
    let t = t4Dmg
    let qt = qt4Dmg
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn= 0
    if (weapon.name === '西风秘典') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼残章') {
      weaponn = 3 * 3
    }
    if (weapon.name === '试作金珀') {
      if (weapon.affix == 1) {
        weaponnn = 4 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 4.5* 3
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
      weaponnn = 0.6 * 9
    }
    if (weapon.name === '图莱杜拉的回忆') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 80 - weaponnn - ( 0.2732 * ( 18 + weaponconsn ) ) ) )
    return {
      dmg: ( e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( z.dmg + t.dmg ) * 7 + ( q.dmg + 5 * ( zq.dmg - z.dmg + qt.dmg - t.dmg ) ) * qcn ) / 20,
      avg: ( e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( z.avg + t.avg ) * 7 + ( q.avg + 5 * ( zq.avg - z.avg + qt.avg - t.dmg ) ) * qcn ) / 20
    }
  }
},
{
  title: '单人站场期望DPS蒸发',
  dmgKey: 'dps',
  check: ({ cons }) => cons < 6,
  params: { gltk: 3 , q: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e', 'vaporize')
    let q = dmg(talent.q['技能伤害'], 'q', 'vaporize')
    let zq = dmg(talent.a['重击伤害2'][3], 'a2', 'vaporize')
    let z = z3Dmg
    let t = tz3Dmg
    let qt = qtz3Dmg
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn= 0
    if (weapon.name === '西风秘典') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼残章') {
      weaponn = 3 * 3
    }
    if (weapon.name === '试作金珀') {
      if (weapon.affix == 1) {
        weaponnn = 4 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 4.5* 3
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
      weaponnn = 0.6 * 9
    }
    if (weapon.name === '图莱杜拉的回忆') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 80 - weaponnn - ( 0.2732 * ( 18 + weaponconsn ) ) ) )
    return {
      dmg: ( e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( z.dmg + t.dmg ) * 7 + ( q.dmg + 5 * ( zq.dmg - z.dmg + qt.dmg - t.dmg ) ) * qcn ) / 20,
      avg: ( e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( z.avg + t.avg ) * 7 + ( q.avg + 5 * ( zq.avg - z.avg + qt.avg - t.dmg ) ) * qcn ) / 20
    }
  }
},
{
  title: '单人站场期望DPS蒸发',
  dmgKey: 'dps',
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , q: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['技能伤害'], 'e', 'vaporize')
    let q = dmg(talent.q['技能伤害'], 'q', 'vaporize')
    let zq = dmg(talent.a['重击伤害2'][4], 'a2', 'vaporize')
    let z = z4Dmg
    let t = tz4Dmg
    let qt = qtz4Dmg
    let weaponn = 0
    let weaponnn = 0
    let weaponconsn= 0
    if (weapon.name === '西风秘典') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼残章') {
      weaponn = 3 * 3
    }
    if (weapon.name === '试作金珀') {
      if (weapon.affix == 1) {
        weaponnn = 4 * 3
      }
      if (weapon.affix == 2) {
        weaponnn = 4.5* 3
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
      weaponnn = 0.6 * 9
    }
    if (weapon.name === '图莱杜拉的回忆') {
     weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 80 - weaponnn - ( 0.2732 * ( 18 + weaponconsn ) ) ) )
    return {
      dmg: ( e.dmg * 2 + ( a1.dmg + a2.dmg + a3.dmg ) * 6 + ( z.dmg + t.dmg ) * 7 + ( q.dmg + 5 * ( zq.dmg - z.dmg + qt.dmg - t.dmg ) ) * qcn ) / 20,
      avg: ( e.avg * 2 + ( a1.avg + a2.avg + a3.avg ) * 6 + ( z.avg + t.avg ) * 7 + ( q.avg + 5 * ( zq.avg - z.avg + qt.avg - t.dmg ) ) * qcn ) / 20
    }
  }
},
{
  title: `烟万行班 ${qNameT}后3层${a2Name}蒸发`,
  check: ({ cons }) => cons !== 6,
  params: { gltk: 3 , teamA: true , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][3], 'a2', 'vaporize')
},
{
  title: `烟万行班 ${qNameT}后4层${a2Name}蒸发`,
  check: ({ cons }) => cons >= 6,
  params: { gltk: 4 , teamA: true , q: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][4], 'a2', 'vaporize')
},
{
  title: `烟万行班 ${eNameT}蒸发`,
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
},
{
  title: `烟万行班 ${qNameT}蒸发`,
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  check: ({ params }) => params.hd === true,
  title: '凭此结契护盾：[属性 - 火] 对火元素伤害有[_pyroShieldInc]%的额外吸收效果。',
  data: {
    _pyroShieldInc: 150
  }
},
{
  check: ({ params }) => params.gltk !== undefined,
  title: '烟绯天赋：[关联条款] 通过重击消耗丹火印,烟绯会提升[a2Dmg]%火伤',
  data: {
    a2Dmg: ({ params }) => params.gltk * 5
  }
},
{
  check: ({ params }) => params.q === true,
  title: '烟绯技能：[凭此结契] 为烟绯自己赋予最大数量的丹火印每间隔一段时间为烟绯赋予一枚丹火印并提高重击[a2Dmg]%的伤害',
  data: {
    a2Dmg: ({ talent }) => talent.q['重击伤害额外加成']
  }
},
{
  check: ({ params }) => params.gltk >= 1 ,
  title: '烟绯技能：[普通攻击·火漆制印] 每枚丹火印都会降低烟绯[_stamina]%的体力消耗',
  data: {
    _stamina: 15
  }
},
{
  check: ({ params }) => params.gltk >= 1 ,
  title: '烟绯1命：[占理不饶人] 烟绯进行重击时,每持有一枚丹火印,都会提高烟绯在咏唱期间[_interruption]%的抗打断能力,并额外降低本次重击[_a2StaminaPct]%的体力消耗',
  cons: 1,
  data: {
    _interruption: 10,
    _a2StaminaPct: 10
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
{
  title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
  check: ({ params }) => params.teamA === true,
  data: {
    kx: 40
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升和[atkPct]%攻击力',
  check: ({ params , cons }) => cons >= 6 && params.teamA === true,
  sort: 1,
  data: {
    atkPct: 20,
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16
  }
},
{
  title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
  check: ({ params }) => params.teamA === true,
  data: {
    dmg: 40
  }
},
{
  title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPlus: 1202.35
  }
},
{
  title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '行秋技能：[古华剑·画雨笼山] 场上角色的抗打断能力提升[_interruption]%受到伤害降低[_reduction]%',
  check: ({ params }) => params.teamA === true,
  data: {
    _interruption: 70 ,
    _reduction: 45.32
  }
},
{
  title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 25
  }
},
{title: `5.15最后修改：[10.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs48ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]
