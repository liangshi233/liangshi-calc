import { Format , LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs41ranking = cfg.gs41ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '水中幻愿'
let eNameT = 'E'
let tName = '虚实流动'
let qName = '星命定轨'
let qNameT = 'Q'
let c6Name = '六命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '因果点破'
  eNameT = '水中幻愿'
  qNameT = '星命定轨'
  c6Name = '六命座'
 }  else if ( NamePath == 3 ) {
  eNameT = '水中幻愿'
  qNameT = '星命定轨'
 }  else if ( NamePath == 4 ) {
  eName = '元素战技'
  tName = '替代冲刺'
  qName = '元素爆发'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  tName = '冲刺'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  a2Name = 'Z'
  a3Name = '戳'
  eName = 'E'
  tName = 'T'
  qName = 'Q'
  c6Name = 'c6'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['c', 'h', 'f', 'y', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs41ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'dph'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'dph'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'dph'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[莫娜] 排名规则均未命中，已选择默认排名规则')
      ranking = 'dph'
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
  ranking = `${gs41ranking}`
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
  title: `${aName}一段蒸发`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${aName}二段蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: `${aName}三段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${aName}三段蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  title: `${aName}四段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${aName}四段蒸发`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'vaporize')
},
{
  title: `${a2Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${a2Name}蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${qNameT}后${a2Name}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${qNameT}后${a2Name}蒸发`,
  dmgKey: 'z',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${c6Name}强化${a2Name}伤害`,
  params: { time: 3 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${c6Name}强化${a2Name}蒸发`,
  params: { time: 3 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${qNameT}后${c6Name}强化${a2Name}伤害`,
  params: { time: 3 , q: true },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${qNameT}后${c6Name}强化${a2Name}蒸发`,
  dmgKey: 'z',
  params: { time: 3 , q: true },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
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
  title: `${tName}爆裂伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'] * 0.5 , 'e')
},
{
  title: `${tName}爆裂蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'] * 0.5 , 'e', 'vaporize')
},
{
  title: `${eName}持续伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e')
},
{
  title: `${eName}持续蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e', 'vaporize')
},
{
  title: `${eName}爆裂伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'], 'e')
},
{
  title: `${eName}爆裂蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'], 'e', 'vaporize')
},
{
  title: `${eName}完整伤害`,
  dmg: ({ talent, cons }, dmg) => {
    let e1 = dmg(talent.e['持续伤害'], 'e')
    let e2 = dmg(talent.e['爆裂伤害'], 'e')
    return {
      dmg: 4 * e1.dmg + e2.dmg ,
      avg: 4 * e1.avg + e2.avg
    }
  }
},
{
  title: `${eName}完整蒸发`,
  dmgKey: 'e',
  dmg: ({ talent, cons }, dmg) => {
    let e1 = dmg(talent.e['持续伤害'], 'e', 'vaporize')
    let e2 = dmg(talent.e['爆裂伤害'], 'e', 'vaporize')
    let e3 = dmg(talent.e['持续伤害'], 'e')
    return {
      dmg: 2 * ( e1.dmg + e3.dmg ) + e2.dmg ,
      avg: 2 * ( e1.avg + e3.dmg ) + e2.dmg
    }
  }
},
{
  title: `${qName}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q')
},
{
  title: `${qName}蒸发`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q', 'vaporize')
},
{
  title: '草原核伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('bloom')
},
{
  title: '单人站场15秒',
  params: { time: 3 , q: true },
  dmg: ({ talent, cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'], 'a')
    let z1 = dmg(talent.a['重击伤害'], 'a2')
    let e1 = dmg(talent.e['持续伤害'], 'e')
    let e2 = dmg(talent.e['爆裂伤害'], 'e')
    let e3 = dmg(talent.e['爆裂伤害'] * 0.5 , 'e')
    let q1 = dmg(talent.q['泡影破裂伤害'], 'q')
    let cons2 = cons * 1 >= 2 ? 3 : 0
    let cons6 = cons * 1 >= 6 ? 1 : 0
    return {
      dmg: cons2 * z1.dmg + 5 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) + 4 * e1.dmg + e2.dmg + q1.dmg + cons6 * 3 * e3.dmg - cons6 * 2 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg ) ,
      avg: cons2 * z1.avg + 5 * ( a1.avg + a2.avg + a3.avg + a4.avg ) + 4 * e1.avg + e2.avg + q1.avg + cons6 * 3 * e3.avg - cons6 * 2 * ( a1.avg + a2.avg + a3.avg + a4.avg )
    }
  }
},
{
  title: '单人站场15秒蒸发',
  dmgKey: 'dph',
  params: { time: 3 , q: true },
  dmg: ({ talent, cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let az1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let az2 = dmg(talent.a['二段伤害'], 'a', 'vaporize')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let az3 = dmg(talent.a['三段伤害'], 'a', 'vaporize')
    let a4 = dmg(talent.a['四段伤害'], 'a')
    let az4 = dmg(talent.a['四段伤害'], 'a', 'vaporize')
    let z1 = dmg(talent.a['重击伤害'], 'a2', 'vaporize')
    let e1 = dmg(talent.e['持续伤害'], 'e', 'vaporize')
    let e2 = dmg(talent.e['爆裂伤害'], 'e', 'vaporize')
    let e3 = dmg(talent.e['持续伤害'], 'e')
    let e4 = dmg(talent.e['爆裂伤害'] * 0.5 , 'e', 'vaporize')
    let q1 = dmg(talent.q['泡影破裂伤害'], 'q', 'vaporize')
    let cons2 = cons * 1 >= 2 ? 3 : 0
    let cons6 = cons * 1 >= 6 ? 1 : 0
    return {
      dmg: cons2 * z1.dmg + ( 3 * a1.dmg + 2 * az1.dmg + 4 * a2.dmg + az2.dmg + 4 * a3.dmg + az3.dmg + 3 * a4.dmg + 2 * az4.dmg ) + 2 * ( e1.dmg + e3.dmg ) + e2.dmg + q1.dmg + e4.dmg * cons6 * 3 + cons6 * ( az1.dmg - 3 * a1.dmg - a2.dmg - az2.dmg - a3.dmg - az3.dmg - 3 * a4.dmg + az4.dmg ),
      avg: cons2 * z1.avg + ( 3 * a1.avg + 2 * az1.avg + 4 * a2.avg + az2.avg + 4 * a3.avg + az3.avg + 3 * a4.avg + 2 * az4.avg ) + 2 * ( e1.avg + e3.avg ) + e2.avg + q1.avg + e4.avg * cons6 * 3 + cons6 * ( az1.avg - 3 * a1.avg - a2.avg - az2.avg - a3.avg - az3.avg - 3 * a4.avg + az4.avg )
    }
  }
},
{
 	title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let consn = 1
  let weaponn = 0
  let weaponnn = 0
  let weaponconsn= 0
  if (weapon.name === '西风秘典') {
   weaponn = 3 * 2 * 2
  }
  if (weapon.name === '祭礼残章') {
   weaponn = 3.66 * 3
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
  if (cons >= 4) {
   consn = 2
  }
  if (weapon.name === '不灭月华') {
    weaponnn = 0.6 * 12
  }
  if (weapon.name === '图莱杜拉的回忆') {
   weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  let arec = 20
  if (cons >= 6) {
   arec = 12
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 3.66 * 3 * consn + weaponn + energy ) ) / ( 60 - weaponnn - ( 0.2732 * ( arec + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,recharge,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '莫娜天赋：[「托付于命运吧!」] 水元素伤害加成获得[dmg]%额外提升',
  sort: 9,
  data: {
    dmg: ({ calc, attr }) => calc(attr.recharge) * 0.2
  }
},
{
  title: '莫娜天赋：[「老太婆来抓我啊!」] 进入虚实流动状态2秒后凝聚一个虚影,破裂造成水元素范围伤害'
},
{
  check: ({ params }) => params.q === true ,
  title: '莫娜技能：[星命定轨] 处于泡影影响下的敌人受到伤害时,对敌人施加星异的伤害加成效果,并以此提高这一次造成的伤害[dmg]%',
  data: {
    dmg: ({ talent }) => talent.q['伤害加成']
  }
},
{
  check: ({ params }) => params.q === true ,
  title: '莫娜1命：[沉没的预言] 队伍中自己的角色攻击命中处于星异状态下的敌人后,感电反应造成的伤害提升[electroCharged]%,蒸发反应造成的伤害提升[vaporize]%,水元素扩散反应造成的伤害提升[swirl]%,冻结反应的持续时间延长[frozrntimePct]%。',
  cons: 1,
  data: {
    electroCharged: 15 ,
    vaporize: 15 ,
    swirl: 15 ,
    frozrntimePct: 15
  }
},
{
  title: '莫娜2命：[星月的连珠] 普通攻击命中时,自动施放一次重击',
  cons: 2,
},
{
  check: ({ params }) => params.q === true ,
  title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时，暴击率提升[cpct]%',
  cons: 4,
  data: {
    cpct: 15
  }
},
{
  title: '莫娜6命：[厄运的修辞] 进入虚实流动状态后,移动[buffCount]秒,重击伤害增加[a2Dmg]%',
  cons: 6,
  data: {
    buffCount: ({ params }) => ( params.time || 0 ) ,
    a2Dmg: ({ params }) => Math.min( ( ( params.time || 0 ) * 60 ) , 180 )
  }
},
{title: `5.18最后修改：[12.28重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs41ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

