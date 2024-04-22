import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs94ranking = cfg.gs94ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '羽袖一触'
let eNameT = 'E'
let qName = '二刀之形·比翼'
let qNameT = 'Q'
let c2Name = '二命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '心织刀流'
  c2Name = '二命座'
  eNameT = '羽袖一触'
  qNameT = '二刀之形·比翼'
 } else if ( NamePath == 3 ) {
  eNameT = '羽袖一触'
  qNameT = '二刀之形·比翼'
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
  c2Name = 'C2'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f', 'h', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs36ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[千织] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${gs94ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${aName}三段伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${aName}四段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${eNameT}后${aName}一段`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${eNameT}后${aName}二段`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${eNameT}后${aName}三段`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['三段伤害'] / 2, 'a')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${aName}四段`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
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
  title: `${eNameT}后${a2Name}`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: '下落期间伤害',
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
  title: `${eNameT}后低空${a3Name}伤害`,
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害2'][0], 'a3')
},
{
  title: `${eNameT}后高空${a3Name}伤害`,
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害2'][1], 'a3')
},
{
  title: `${eName}释放伤害`,
  dmgKey: 'e',
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
},
{
  title: `${eName}人偶伤害`,
  dmgKey: 'e2',
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
},
{
  title: `${c2Name}人偶切斩伤害`,
  check: ({ cons }) => cons >= 2,
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
},
{
  title: `${eName}人偶完整伤害`,
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    return {
      dmg: e1.dmg * 5 ,
      avg: e1.avg * 5
    }
  }
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent, calc, attr, cons }, { basic }) => basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100 , 'q')
},
{
  title: '结晶护盾吸收量',
  dmg: ({}, { reaction }) => reaction('crystallize')
},
{
  title: '单人站场16秒',
  dmgKey: 'dph',
  check: ({ cons }) => cons < 6,
  params: { GeoConstruct: false },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100 , 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100 , 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2 , 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100 , 'a', 'phy')
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2 , 'a')
    let ae4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100 , 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100 , 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    return {
      dmg: ( 2 * a1.dmg + 3 * a2.dmg + 3 * 2 * a3.dmg + 3 * a4.dmg ) + ( 3 * ae1.dmg + 2 * ae2.dmg + 2 * 2 * ae3.dmg + 2 * ae4.dmg ) + ( e1.dmg * 5 ) * cons1 + ( e2.dmg * cons2 ) + ( e2.dmg * cons4 ) + e0.dmg + q1.dmg ,
      avg: ( 2 * a1.avg + 3 * a2.avg + 3 * 2 * a3.avg + 3 * a4.avg ) + ( 3 * ae1.avg + 2 * ae2.avg + 2 * 2 * ae3.avg + 2 * ae4.avg ) + ( e1.avg * 5 ) * cons1 + ( e2.dmg * cons2 ) + ( e2.dmg * cons4 ) + e0.avg + q1.avg
    }
  }
},
{
  title: '单人站场16秒',
  dmgKey: 'dph',
  check: ({ cons }) => cons >= 6,
  params: { GeoConstruct: false },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2 , 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100 , 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    return {
      dmg: ( 4 * ae1.dmg + 4 * ae2.dmg + 4 * 2 * ae3.dmg ) * 2 + ( e1.dmg * 5 ) * cons1 + ( e2.dmg * cons2 ) + ( e2.dmg * cons4 ) + e0.dmg * 4 + q1.dmg ,
      avg: ( 4 * ae1.avg + 4 * ae2.avg + 4 * 2 * ae3.avg ) * 2 + ( e1.avg * 5 ) * cons1 + ( e2.dmg * cons2 ) + ( e2.dmg * cons4 ) + e0.avg * 4 + q1.avg
    }
  }
},
{
  title: '双人后台16秒',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e3 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
    let cons4 = cons * 4 >= 1 ? 3 : 0
    return {
      dmg: e1.dmg * 3 + e2.dmg * 10 + e3.dmg * cons4 ,
      avg: e1.avg * 3 + e2.avg * 10 + e3.avg * cons4
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
    if (weapon.affix = 1) {
      weaponnn = 2 * 3
    }
    if (weapon.affix = 2) {
      weaponnn = 2.5 * 3
    }
    if (weapon.affix = 3) {
      weaponnn = 3 * 3
    }
    if (weapon.affix = 4) {
      weaponnn = 3.5 * 3
    }
    if (weapon.affix = 5) {
      weaponnn = 4 * 3
    }
  }
  if (weapon.name === '天目影打刀') {
    if (weapon.affix = 1) {
      weaponnn = 6
    }
    if (weapon.affix = 2) {
      weaponnn = 7.5
    }
    if (weapon.affix = 3) {
      weaponnn = 9
    }
    if (weapon.affix = 4) {
      weaponnn = 10.5
    }
    if (weapon.affix = 5) {
      weaponnn = 12
    }
  }
  if (weapon.name === '西风剑') {
  weaponn = 3 * 2 * 2
  }
  if (cons >= 4) {
  consn = 4 * 3
  }
  if (weapon.name === '天空之刃') {
  weaponconsn = 1
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 50 - consn - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场DPS',
  dmgKey: 'dps',
  check: ({ cons }) => cons < 6,
  params: { GeoConstruct: false },
  dmg: ({ talent, calc, attr, cons , weapon }, { basic }) => {
    let a1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100 , 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100 , 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2 , 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100 , 'a', 'phy')
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2 , 'a')
    let ae4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100 , 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100 , 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    let weaponn = 0
    let consn = 0
    let weaponnn = 0
    let weaponconsn = 0
    if (weapon.name === '船坞长剑') {
      if (weapon.affix = 1) {
        weaponnn = 2 * 3
      }
      if (weapon.affix = 2) {
        weaponnn = 2.5 * 3
      }
      if (weapon.affix = 3) {
        weaponnn = 3 * 3
      }
      if (weapon.affix = 4) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix = 5) {
        weaponnn = 4 * 3
      }
    }
    if (weapon.name === '天目影打刀') {
      if (weapon.affix = 1) {
        weaponnn = 6
      }
      if (weapon.affix = 2) {
        weaponnn = 7.5
      }
      if (weapon.affix = 3) {
        weaponnn = 9
      }
      if (weapon.affix = 4) {
        weaponnn = 10.5
      }
      if (weapon.affix = 5) {
        weaponnn = 12
      }
    }
    if (weapon.name === '西风剑') {
    weaponn = 3 * 2 * 2
    }
    if (cons >= 4) {
    consn = 4 * 3
    }
    if (weapon.name === '天空之刃') {
    weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 50 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) )
    return {
      dmg: ( ( 2 * a1.dmg + 3 * a2.dmg + 3 * 2 * a3.dmg + 3 * a4.dmg ) + ( 3 * ae1.dmg + 2 * ae2.dmg + 2 * 2 * ae3.dmg + 2 * ae4.dmg ) + ( e1.dmg * 5 ) * cons1 + ( e2.dmg * cons2 ) * qcn + ( e2.dmg * cons4 ) + e0.dmg + q1.dmg * qcn ) / 16  ,
      avg: ( ( 2 * a1.avg + 3 * a2.avg + 3 * 2 * a3.avg + 3 * a4.avg ) + ( 3 * ae1.avg + 2 * ae2.avg + 2 * 2 * ae3.avg + 2 * ae4.avg ) + ( e1.avg * 5 ) * cons1 + ( e2.avg * cons2 ) * qcn + ( e2.avg * cons4 ) + e0.avg + q1.avg * qcn ) / 16
    }
  }
},
{
  title: '单人站场DPS',
  dmgKey: 'dps',
  check: ({ cons }) => cons >= 6,
  params: { GeoConstruct: false },
  dmg: ({ talent, calc, attr, cons , weapon }, { basic }) => {
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100 , 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2 , 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100 , 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    let weaponn = 0
    let consn = 0
    let weaponnn = 0
    let weaponconsn = 0
    if (weapon.name === '船坞长剑') {
      if (weapon.affix = 1) {
        weaponnn = 2 * 3
      }
      if (weapon.affix = 2) {
        weaponnn = 2.5 * 3
      }
      if (weapon.affix = 3) {
        weaponnn = 3 * 3
      }
      if (weapon.affix = 4) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix = 5) {
        weaponnn = 4 * 3
      }
    }
    if (weapon.name === '天目影打刀') {
      if (weapon.affix = 1) {
        weaponnn = 6
      }
      if (weapon.affix = 2) {
        weaponnn = 7.5
      }
      if (weapon.affix = 3) {
        weaponnn = 9
      }
      if (weapon.affix = 4) {
        weaponnn = 10.5
      }
      if (weapon.affix = 5) {
        weaponnn = 12
      }
    }
    if (weapon.name === '西风剑') {
    weaponn = 3 * 2 * 2
    }
    if (cons >= 4) {
    consn = 4 * 3
    }
    if (weapon.name === '天空之刃') {
    weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 6 * 3 + weaponn + energy ) ) / ( 50 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) )

    return {
      dmg: ( ( 4 * ae1.dmg + 4 * ae2.dmg + 4 * 2 * ae3.dmg ) * 2 + ( e1.dmg * 5 ) * cons1 + ( e2.dmg * cons2 ) * qcn + ( e2.dmg * cons4 ) + e0.dmg * 4 + q1.dmg * qcn ) / 16 ,
      avg: ( ( 4 * ae1.avg + 4 * ae2.avg + 4 * 2 * ae3.avg ) * 2 + ( e1.avg * 5 ) * cons1 + ( e2.avg * cons2 ) * qcn + ( e2.avg * cons4 ) + e0.avg * 4 + q1.avg * qcn ) / 16
    }
  }
},
{
  title: '双人后台DPS',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e3 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7 , 'e')
    let cons4 = cons * 4 >= 1 ? 3 : 0
    return {
      dmg: ( e1.dmg * 3 + e2.dmg * 10 + e3.dmg * cons4 ) / 16 ,
      avg: ( e1.avg * 3 + e2.avg * 10 + e3.avg * cons4 ) / 16
    }
  }
},
{
  title: `一五千钟 后台10斩2协`,
  check: ({ cons }) => cons < 4,
  params: { team: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    return {
      dmg: e1.dmg * 3 + e2.dmg * 10,
      avg: e1.avg * 3 + e2.avg * 10
    }
  }
},
{
  title: `一五千钟 后台10斩2协3绢`,
  check: ({ cons }) => cons >= 4,
  params: { team: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100 , 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 , 'e')
    return {
      dmg: e1.dmg * 3 + e2.dmg * 10 + e2.dmg * 3 * 1.7 ,
      avg: e1.avg * 3 + e2.avg * 10 + e2.avg * 3 * 1.7
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [
{
  check: ({ params }) => params.GeoConstruct !== false,
  title: '千织天赋：[锦上添花] 队伍中附近的角色创造岩元素创造物时，获得[dmg]%岩元素伤害加成',
  data: {
    dmg: 20
  }
},
{
  title: '千织2命：[落染五色] 施放二刀之形·比翼后，将在当前场上自己的角色身边唤出简易型自律人形 · 绢，对附近的敌人发起攻击，造成岩元素范围伤害',
  cons: 2
},
{
  title: '千织6命：[万理一空] 触发固有天赋「量体裁衣」的裁锦后，羽袖一触的冷却时间减少[_eCdPlus]秒。此外，普通攻击造成的伤害提升[aPlus] ',
  cons: 6,
  data: {
    _eCdPlus: 12,
    aPlus: ({ attr, calc }) => calc(attr.def) * 235 / 100
  }
}, {
  check: ({ params }) => params.team === true,
  title: '6命五郎：增加[defPct]%防御力，增加[cdmg]%暴击伤害',
  data: {
    cdmg: 40,
    defPct: 25
  }
}, {
   check: ({ params }) => params.team === true,
   title: '钟离：降低敌人[kx]%全抗',
   data: {
     kx: 20
   }
},
 {title: `4.22最后修改：[4.22重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs94ranking} 魔物产球设置:${energy} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

