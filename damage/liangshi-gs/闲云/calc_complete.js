import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs93ranking = cfg.gs93ranking
let energy = cfg.energymodel
let enqDmg = { dmg: 0 , avg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '朝起鹤云'
let e2Name = '步天梯'
let eNameT = 'E'
let qName = '暮集竹星'
let qNameT = 'Q'
let c4Name = '四命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '清风散花词'
  c4Name = '四命座'
  eNameT = '朝起鹤云'
  qNameT = '暮集竹星'
 } else if ( NamePath == 3 ) {
  eNameT = '朝起鹤云'
  qNameT = '暮集竹星'
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
  c4Name = 'C4'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['y', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs93ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'f'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'f'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'f'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[闲云] 排名规则均未命中，已选择默认排名规则')
      ranking = 'f'
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
 ranking = `${gs93ranking}`
}
if (!cfg.namemodel) {
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
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${aName}四段`,
  dmgKey: 'a',
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
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
  title: `${qNameT}后低空${a3Name}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `高空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${qNameT}后高空${a3Name}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${e2Name}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}一段跳伤害`,
  params: { btt: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][0], 'a3')
},
{
  title: `${qNameT}后${eName}一段跳伤害`,
  params: { btt: 1, q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][0], 'a3')
},
{
  title: `${eName}二段跳伤害`,
  params: { btt: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][1], 'a3')
},
{
  title: `${qNameT}后${eName}二段跳伤害`,
  params: { btt: 2, q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][1], 'a3')
},
{
  title: `${eName}三段跳伤害`,
  params: { btt: 3 },
  dmg: ({ talent }, dmg) => {
    enqDmg = dmg(talent.e['闲云冲击波伤害'][2], 'a3')
    return enqDmg
  }
},
{
  title: `${qNameT}后${eName}三段跳伤害`,
  dmgKey: 'c',
  params: { btt: 3, q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][2], 'a3')
},
{
  title: `${qName}释放伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}协同伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['竹星伤害'], 'q')
},
{
  title: `${qName}释放治疗`,
  dmgKey: 'h',
  dmg: ({ attr, calc, talent, cons }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1)
},
{
  title: `${qName}持续治疗`,
  dmgKey: 'undefined',
  dmg: ({ attr, calc, talent, cons }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗量2'][1] * 1)
},
{
  title: '仙力助推下落攻击伤害提升值',
  dmgKey: 'f',
  dmg: ({ calc, attr, cons }) => {
    let cons2 = cons * 1 >= 2 ? 2 : 1
    return {
      avg: Math.min( calc(attr.atk) * 200 / 100 , 9000 ) * cons2
    }
  }
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
},
{
  title: `${qName}完整伤害`,
  dmg: ({ talent, cons }, dmg) => {
  let qDmg = dmg(talent.q['技能伤害'] , 'q')
  let q2Dmg = dmg(talent.q['竹星伤害'], 'q')
   return {
     dmg: q2Dmg.dmg * 8 + qDmg.dmg ,
     avg: q2Dmg.avg * 8 + qDmg.avg
   }
  }
},
{
  title: `${qName}完整治疗`,
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let q1 = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
    let q2 = talent.q['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗量2'][1] * 1
    return heal(q1 + q2 * 6)
  }
},
{
  title: '单人站场18秒',
  dmgKey: 'dph',
  params: { btt: 3, q: true },
  dmg: ({ talent, cons }, dmg) => {
    let a1Dmg = dmg(talent.a['一段伤害'], 'a')
    let a2Dmg = dmg(talent.a['二段伤害'], 'a')
    let a3Dmg = dmg(talent.a['三段伤害'], 'a')
    let a4Dmg = dmg(talent.a['四段伤害'], 'a')
    let eDmg = dmg(talent.e['闲云冲击波伤害'][2], 'a3')
    let e2Dmg = dmg(talent.e['技能伤害'], 'e')
    let eCons = cons * 1 >= 6 ? 9 : 1
    let cons6 = cons * 1 >= 6 ? dmg(talent.e['闲云冲击波伤害'][2], 'a3') : dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
    let qDmg = dmg(talent.q['技能伤害'] , 'q')
    let q2Dmg = dmg(talent.q['竹星伤害'], 'q')
    let qCons = cons * 1 >= 6 ? { dmg: enqDmg.dmg , avg: enqDmg.avg } : { dmg: a1Dmg.dmg + a2Dmg.dmg + a3Dmg.dmg + a4Dmg.dmg , avg: a1Dmg.avg + a2Dmg.avg + a3Dmg.avg + a4Dmg.avg }
    return {
      dmg: q2Dmg.dmg * 8 + qDmg.dmg + eDmg.dmg + e2Dmg.dmg * eCons + cons6.dmg * 7 + qCons.dmg ,
      avg: q2Dmg.avg * 8 + qDmg.avg + eDmg.avg + e2Dmg.dmg * eCons + cons6.avg * 7 + qCons.avg
    }
  }
},
{
  title: '单人站场18秒治疗',
  dmgKey: 'hph',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let q1 = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
    let q2 = talent.q['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗量2'][1] * 1
    let q3 = 150 * calc(attr.atk) / 100
    let cons4 = cons * 1 >= 4 ? 3 : 0
    return heal(q1 + q2 * 6 + q3 * cons4)
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let consn = 0
  let weaponn = 0
  let weaponnn = 0
  let weaponconsn= 0
  if (weapon.name === '西风秘典') {
    weaponn = 3 * 2 * 2
  }
  if (weapon.name === '祭礼残章') {
    weaponn = 5 * 3
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
  if (weapon.name === '图莱杜拉的回忆') {
   weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 5 * 3 + weaponn + energy ) ) / ( 70 - weaponnn - ( 0.2732 * ( 4 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
}
]

export const defParams = { soda: 1 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '闲云天赋：[霜翎高逐祥风势] 朝起鹤云的闲云冲击波命中[buffCount]个敌人,使角色的下落攻击的暴击率提升[a3Cpct]%',
  data: {
    buffCount: ({ params }) => ( params.enemy == 0 ? 0 : ( params.enemy || 4 ) ) ,
    a3Cpct: ({ params }) => Math.min( 10 , ( params.enemy == 0 ? 0 : ( params.enemy || 4 ) ) * 2 + ( params.enemy == 0 ? 0 : 2 ) )
  }
},
{
  title: '闲云天赋：[细想应是洞中仙] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害提升[a3Plus]',
  check: ({ params }) => params.q === true,
  sort: 9,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 200 / 100 , 9000 )
  }
},
{
  title: '闲云1命：[借风洗尘缘] 朝起鹤云的可用次数增加[_eIncreases]次。',
  cons: 1,
  data: {
    _eIncreases: 1
  }
},
{
  title: '闲云2命：[鹤唳远人间] 施放朝起鹤云后,攻击力提升[atkPct]%',
  sort: 1,
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  title: '闲云2命：[鹤唳远人间] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害额外提升[a3Plus]',
  check: ({ params }) => params.q === true,
  sort: 9,
  cons: 2,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 200 / 100 , 9000 )
  }
},
{
  check: ({ params }) => params.btt !== undefined ,
  title: '闲云6命：[知是留云僊] 在一次朝起鹤云的鹤云幻化期间施展了[buffCount]次步天梯后,该次鹤云幻化期间的闲云冲击波的暴击伤害提升[a3Cdmg]%,若暮集竹星的竹星拥有仙力助推,则朝起鹤云不进入冷却',
  cons: 6,
  data: {
    buffCount: ({ params }) => ( params.btt == 0 ? 0 : ( params.btt || 0 ) ) ,
    a3Cdmg: ({ params }) => ( 5 / 3 ) * Math.pow( ( params.btt == 0 ? 0 : ( params.btt || 0 ) ) , 3 ) - ( 5 / 2 ) * Math.pow( ( params.btt == 0 ? 0 : ( params.btt || 0 ) ) , 2 ) + ( 95 / 6 ) * ( params.btt == 0 ? 0 : ( params.btt || 0 ) )
  }
},
 {title: `6.15最后修改：[6.15重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs93ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

