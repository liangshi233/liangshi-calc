import { Format , LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs35ranking = cfg.gs35ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '仙法·寒病鬼差'
let eNameT = 'E'
let qName = '仙法·救苦度厄'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '云来古剑法'
  eNameT = '仙法·寒病鬼差'
  qNameT = '仙法·救苦度厄'
 }  else if ( NamePath == 3 ) {
  eNameT = '仙法·寒病鬼差'
  qNameT = '仙法·救苦度厄'
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
const miss = ['f', 'y']
let ranking = 'undefined'
if (!cfg.gs35ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'hps'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'hps'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'hps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[七七] 排名规则均未命中，已选择默认排名规则')
      ranking = 'hps'
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
  ranking = `${gs35ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}一段伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['二段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: 2 * z.dmg,
      avg: 2 * z.avg
    }
  }
},
{
  title: `${aName}三段伤害`,
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: 2 * z.dmg,
      avg: 2 * z.avg
    }
  }
},
{
  title: `${aName}四段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${aName}五段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['重击伤害'] / 3 , 'a2', 'phy')
    return {
      dmg: 3 * z.dmg,
      avg: 3 * z.avg
    }
  }
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
  title: `${eName}命中治疗`,
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['命中治疗量2'][0] * calc(attr.atk) / 100 + talent.e['命中治疗量2'][1] * 1)
},
{
  title: `${eName}持续治疗`,
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1)
},
{
  title: `${eName}普攻完整治疗`,
  dmg: ({ talent, attr, calc }, { heal }) => {
    let e1 = talent.e['命中治疗量2'][0] * calc(attr.atk) / 100 + talent.e['命中治疗量2'][1] * 1
    let e2 = e1 * 7 * 6
    return heal(e2)
  }
},
{
  title: `${eName}持续完整治疗`,
  dmg: ({ talent, attr, calc }, { heal }) => {
    let e1 = talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1
    let e2 = e1 * 4
    return heal(e2)
  }
},
{
  title: `${eName}释放伤害`,
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}释放融化`,
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: `${eName}持续伤害`,
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['寒病鬼差伤害'], 'e')
},
{
  title: `${eName}持续融化`,
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['寒病鬼差伤害'], 'e', 'melt')
},
{
  title: `${eName}完整伤害`,
  dmg: ({ talent, attr, calc }, dmg) => {
    let e1 = dmg(talent.e['技能伤害'], 'e')
    let e2 = dmg(talent.e['寒病鬼差伤害'], 'e')
    return {
      dmg: e1.dmg + e2.dmg * 10 ,
      avg: e1.avg + e2.avg * 10
    }
  }
},
{
  title: `${eName}完整融化`,
  dmg: ({ talent, attr, calc }, dmg) => {
    let e1 = dmg(talent.e['技能伤害'], 'e', 'melt')
    let e2 = dmg(talent.e['寒病鬼差伤害'], 'e')
    let e3 = dmg(talent.e['寒病鬼差伤害'], 'e', 'melt')
    return {
      dmg: e1.dmg + e2.dmg * 5 + e3.dmg * 5 ,
      avg: e1.avg + e2.avg * 5 + e3.avg * 5
    }
  }
},
{
  title: `${qName}每跳治疗`,
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1)
},
{
  title: `${qName}完整治疗`,
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => {
    let q1 = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
    let q2 = q1 * 13
    return heal(q2)
  }
},
{
  title: `${qName}伤害`,
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}融化`,
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
},
{
  title: '单人站场30秒',
  dmg: ({ talent, attr, calc }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['技能伤害'], 'e')
    let e2 = dmg(talent.e['寒病鬼差伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    return {
      dmg: q1.dmg + e1.dmg + e2.dmg * 10 + 12 * ( a1.dmg + a2.dmg + a3.dmg * 2 + a4.dmg * 2 + a5.dmg ),
      avg: q1.avg + e1.avg + e2.avg * 10 + 12 * ( a1.avg + a2.avg + a3.avg * 2 + a4.avg * 2 + a5.avg )
    }
  }
},
{
  title: '单人站场30秒融化',
  dmgKey: 'dph',
  dmg: ({ talent, attr, calc }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['技能伤害'], 'e', 'melt')
    let e2 = dmg(talent.e['寒病鬼差伤害'], 'e')
    let e3 = dmg(talent.e['寒病鬼差伤害'], 'e', 'melt')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'melt')
    return {
      dmg: q1.dmg + e1.dmg + e2.dmg * 5 + e3.dmg * 5 + 12 * ( a1.dmg + a2.dmg + a3.dmg * 2 + a4.dmg * 2 + a5.dmg ),
      avg: q1.avg + e1.avg + e2.avg * 5 + e3.avg * 5 + 12 * ( a1.avg + a2.avg + a3.avg * 2 + a4.avg * 2 + a5.avg )
    }
  }
},
{
  title: '单人站场30秒治疗',
  dmgKey: 'hph',
  dmg: ({ talent, attr, calc }, { heal }) => {
    let e1 = talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1
    let e2 = talent.e['命中治疗量2'][0] * calc(attr.atk) / 100 + talent.e['命中治疗量2'][1] * 1
    let q1 = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
    let q2 = q1 * 13 + e1 * 4 + e2 * 7 * 6
    return heal(q2)
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
  if (cons >= 1) {
    consn = 2 * 10
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * weaponn + ( 0.2212 * ( 60 + weaponconsn ) ) ) / ( 80 - consn - weaponnn ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['技能伤害'], 'e')
    let e2 = dmg(talent.e['寒病鬼差伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
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
    if (cons >= 1) {
      consn = 2 * 10
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( weaponn + energy ) + ( 0.2212 * ( 60 + weaponconsn ) ) ) / ( 80 - consn - weaponnn ) )
    return {
      dmg: ( qcn * q1.dmg + e1.dmg + e2.dmg * 10 + 12 * ( a1.dmg + a2.dmg + a3.dmg * 2 + a4.dmg * 2 + a5.dmg ) ) / 30 ,
      avg: ( qcn * q1.avg + e1.avg + e2.avg * 10 + 12 * ( a1.avg + a2.avg + a3.avg * 2 + a4.avg * 2 + a5.avg ) ) / 30
    }
  }
},
{
  title: '单人站场期望DPS融化',
  dmgKey: 'dps',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['技能伤害'], 'e', 'melt')
    let e2 = dmg(talent.e['寒病鬼差伤害'], 'e')
    let e3 = dmg(talent.e['寒病鬼差伤害'], 'e', 'melt')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'melt')
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
    if (cons >= 1) {
     consn = 2 * 10
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( weaponn + energy ) + ( 0.2212 * ( 60 + weaponconsn ) ) ) / ( 80 - consn - weaponnn ) )
    return {
      dmg: ( qcn * q1.dmg + e1.dmg + e2.dmg * 5 + e3.dmg * 5 + 12 * ( a1.dmg + a2.dmg + a3.dmg * 2 + a4.dmg * 2 + a5.dmg ) ) / 30 ,
      avg: ( qcn * q1.avg + e1.avg + e2.avg * 5 + e3.avg * 5 + 12 * ( a1.avg + a2.avg + a3.avg * 2 + a4.avg * 2 + a5.avg ) ) / 30
    }
  }
},
{
  title: '单人站场期望HPS',
  dmgKey: 'hps',
  dmg: ({ talent , calc , attr , weapon , cons }, { heal }) => {
    let e1 = talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1
    let e2 = talent.e['命中治疗量2'][0] * calc(attr.atk) / 100 + talent.e['命中治疗量2'][1] * 1
    let q1 = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
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
    if (cons >= 1) {
      consn = 2 * 10
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( weaponn + energy ) + ( 0.2212 * ( 60 + weaponconsn ) ) ) / ( 80 - consn - weaponnn ) )
    let q2 = ( qcn * q1 * 13 + e1 * 4 + e2 * 7 * 6 ) / 30
    return heal(q2)
  }
},
{
  title: '七丽辛班 普攻五段伤害',
  params: { team: true },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: '七丽辛班 重击伤害',
  params: { team: true },
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,recharge'
export const enemyName = '魔偶/女士/雷神'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '七七天赋：[延命妙法] 处于仙法·寒病鬼差状态下的角色触发元素反应时，受治疗加成提升[healInc]%',
  data: {
    healInc: 20
  }
},
{
  title: '七七1命：[寒苦回向] 寒病鬼差命中被度厄真符标记的敌人时,为七七恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 4
  }
},
{
  title: '七七2命：[冰寒蚀骨] 对受到冰元素影响的敌人,普通攻击与重击造成的伤害提升[a2Dmg]%',
  cons: 2,
  data: {
    aDmg: 15,
    a2Dmg: 15
  }
},
{
  title: '七七4命：[天威压众] 被度厄真符标记的目标，攻击力下降[_enemyAtk]%',
  cons: 4,
  data: {
    _enemyAtk: 20
  }
},
{
  title: '七七6命：[起死回骸] 施放仙法·救苦度厄时，复苏附近队伍中所有倒下的角色，并将其生命值恢复至50%。',
  cons: 6
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
  title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
  check: ({ params , artis }) => params.teamA === true && artis.昔日宗室之仪 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '丽莎武器：[讨龙英杰谭-精5] 主动切换角色时,新登场的角色攻击力提升[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 48
  }
},
{
  title: '丽莎天赋：[静电场力] 敌人受到蔷薇的雷光攻击后，降低[enemyDef]%防御力 ',
  check: ({ params}) => params.teamA === true ,
  sort: 1,
  data: {
    enemyDef: 15
  }
},
{
  check: ({ cons, params }) => params.teamA === true,
  title: '辛焱圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  check: ({ cons , params }) => (cons < 6 && cons > 1) && params.teamA === true,
  title: '辛焱武器：[狼的末路-精1] 攻击命中生命值低于30%的敌人时队伍中所有成员的攻击力提高[atkPct]%',
  sort: 1,
  data: {
    atkPct: 40
  }
},
{
  check: ({ cons , params }) => cons >= 6 && params.teamA === true,
  title: '辛焱武器：[狼的末路-精5] 攻击命中生命值低于30%的敌人时队伍中所有成员的攻击力提高[atkPct]%',
  sort: 1,
  data: {
    atkPct: 80
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '辛焱天赋：[「这才是摇滚!」] 处于热情拂扫的护盾保护下的角色造成的物理伤害提高[phy]%',
  data: {
    phy: 15
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '辛焱4命：[节奏的传染] 热情拂扫的伤害，会使敌人的物理抗性降低[phyKx]%',
  data: {
    phyKx: 15
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
{
  title: '元素反应：[超导] 冰元素触及雷元素时会造成冰元素的范围伤害,并降低受超导影响生物[phyKx]%的物理抗性 ',
  check: ({ params }) => params.teamA === true,
  data: {
    phyKx: 25
  }
},
{title: `5.21最后修改：[12.17重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs35ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]


