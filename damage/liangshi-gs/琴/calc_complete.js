import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs3ranking = cfg.gs3ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '风压剑'
let eNameT = 'E'
let qName = '蒲公英之风'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '西风剑术'
  eNameT = '风压剑'
  qNameT = '蒲公英之风'
 }  else if ( NamePath == 3 ) {
  eNameT = '风压剑'
  qNameT = '蒲公英之风'
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
if (!cfg.gs3ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'hps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'hps'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'hps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[琴] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs3ranking}`
}
if (!cfg.energymodel) {
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
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
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
  title: `${aName}额外治疗害`,
  dmg: ({ calc, attr }, { heal }) => heal( calc(attr.atk) / 100 * 15 )
},
{
  title: `${eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `长按${eName}伤害`,
  check: ({ cons }) => cons >= 1,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${qName}爆发伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
},
{
  title: `${qName}领域伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['出入领域伤害'], 'q')
},
{
  title: `${qName}完整伤害`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => {
    let q = dmg(talent.q['爆发伤害'], 'q')
    let q1 = dmg(talent.q['出入领域伤害'], 'q')
    return {
      dmg: q.dmg * 1 + q1.dmg * 2 ,
      avg: q.avg * 1 + q1.avg * 2
    }
  }
},
{
  title: `${qName}爆发治疗`,
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['领域发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['领域发动治疗量2'][1] * 1)
},
{
  title: `${qName}持续治疗`,
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗2'][1] * 1)
},
{
  title: `${qName}完整治疗`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => {
    let q1 = talent.q['领域发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['领域发动治疗量2'][1] * 1
    let q2 = talent.q['持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗2'][1] * 1
    let q = q1 + q2 * 10
    return heal(q)
  }
},
{
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
},
{
  title: '单人站场21秒',
  dmgKey: 'dph',
  params: { e: true , q: true },
  dmg: ({ talent , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['技能伤害'], 'e')
    let q1 = dmg(talent.q['爆发伤害'], 'q')
    let q2 = dmg(talent.q['出入领域伤害'], 'q')
    return {
    dmg: 4 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg ) + e1.dmg * 2 + q1.dmg + q2.dmg * 2,
    avg: 4 * ( a1.avg + a2.avg + a3.avg + a4.avg + a5.avg ) + e1.avg * 2 + q1.avg + q2.avg * 2
    }
  }
},
{
  title: '单人站场21秒治疗',
  dmgKey: 'hph',
  dmg: ({ talent , calc , attr , cons }, { heal }) => {
    let q1 = talent.q['领域发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['领域发动治疗量2'][1] * 1
    let q2 = talent.q['持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗2'][1] * 1
    let a1 = calc(attr.atk) / 100 * 15
    let q = q1 + q2 * 10 + a1 * 10
    return heal(q)
  }
},
{
 	title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
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
    weaponn = 4.5 * 3
  }
  if (weapon.name === '天空之刃') {
    weaponconsn = 1
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 3.66 * 3 + weaponn + energy ) ) / ( 64 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  dmgKey: 'dps',
  params: { e: true , q: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['技能伤害'], 'e')
    let q1 = dmg(talent.q['爆发伤害'], 'q')
    let q2 = dmg(talent.q['出入领域伤害'], 'q')
    let weaponn = 0
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
      weaponn = 4.5 * 3
    }
    if (weapon.name === '天空之刃') {
      weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 3.66 * 3 + weaponn + energy ) ) / ( 64 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) )
    return {
    dmg: ( 4 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg ) + e1.dmg * 2 + qcn * ( q1.dmg + q2.dmg * 2 ) ) / 21 ,
    avg: ( 4 * ( a1.avg + a2.avg + a3.avg + a4.avg + a5.avg ) + e1.avg * 2 + qcn * ( q1.avg + q2.avg * 2 ) ) / 21
    }
  }
},
{
  title: '单人站场期望HPS',
  dmgKey: 'hps',
  dmg: ({ talent , calc , attr , weapon , cons }, { heal }) => {
    let q1 = talent.q['领域发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['领域发动治疗量2'][1] * 1
    let q2 = talent.q['持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗2'][1] * 1
    let a1 = calc(attr.atk) / 100 * 15
    let weaponn = 0
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
      weaponn = 4.5 * 3
    }
    if (weapon.name === '天空之刃') {
      weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 3.66 * 3 + weaponn + energy ) ) / ( 64 - weaponnn - ( 0.2212 * ( 20 + weaponconsn ) ) ) )
    let q = ( qcn * ( q1 + q2 * 10 ) + a1 * 10 ) / 21
    return heal(q)
  }
},
{
  title: `琴珐丽行 长按${eNameT}伤害`,
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `琴珐丽行 ${qNameT}爆发伤害`,
  params: { q: true , teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgKey = `${ranking}`
export const enemyName = '魔偶/女士/雷神'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '琴天赋：[顺风而行] 普通攻击命中时，有50%的几率为队伍中所有角色恢复生命值'
},
{
  title: '琴天赋：[听凭风引] 使用蒲公英之风后，恢复[_energyeveryPct]%元素能量.',
  data: {
    _energyeveryPct: 20
  }
},
{
  title: '琴1命：[流转剑脊的暴风] 风压剑长按超过1秒后，提升牵引速度，并使造成的伤害提升[eDmg]%',
  check: ({ params }) => params.e === true,
  cons: 1,
  data: {
    eDmg: 40
  }
},
{
  title: '琴2命：[守护众人的坚盾] 获得元素晶球或元素微粒时，队伍中所有角色获得[_aSpeed]%攻击速度和[_jSpeed]%移动速度提升',
  cons: 2,
  data: {
    _aSpeed: 15,
    _jSpeed: 15
  }
},
{
  title: '琴4命：[蒲公英的国土] 在蒲公英之风的领域内，所有敌人的风元素抗性下降[kx]%',
  check: ({ params }) => params.q === true,
  cons: 4,
  data: {
    kx: 40
  }
},
{
  title: '琴6命：[恩眷万民的狮牙] 在蒲公英之风的领域内，角色受到的伤害降低[_reduction]%',
  cons: 6,
  data: {
    _reduction: 35
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
  title: '丽莎武器：[讨龙英杰谭-精5] 主动切换角色时，新登场的角色攻击力提升[atkPct]% ',
  check: ({ params}) => params.teamA === true ,
  sort: 1,
  data: {
    atkPct: 48
  }
},
{
  title: '丽莎圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
  check: ({ params , artis }) => params.teamA === true && artis.昔日宗室之仪 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  check: ({ cons, params }) => params.teamA === true,
  title: '珐露珊圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效提升[shield]%',
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '珐露珊技能：[抟风秘道] 降低周围敌人[kx]%的风元素抗性,为附近的队伍中所有角色施加[dmg]%风元素伤害加成',
  data: {
    dmg: 38.25,
	  kx: 30
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '珐露珊天赋：[七窟遗智] 处于抟风秘道的「祈风之赐」效果下的角色的普通攻击、重击、下落攻击、元素战技或元素爆发对敌人造成风元素伤害时,伤害提升[aPlus]',
  sort: 9,
  data: {
	  aPlus: 278.4 ,
  	a2Plus: 278.4 ,
	  a3Plus: 278.4 ,
	  ePlus: 278.4 ,
	  qPlus: 278.4
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '珐露珊6命：[妙道合真] 处于抟风秘道的「祈风之赐」效果影响下的角色，造成风元素伤害时的暴击伤害提升[cdmg]%',
  data: {
    cdmg: 40
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '元素共鸣：[迅捷之风] 体力消耗降低[_stamina]%，移动速度提升[_jSpeed]%，技能冷却时间缩短[_cd]%',
  data: {
    _stamina: 15,
    _jSpeed: 10,
    _cd: 5
  }
},
'swirl',
{title: `6.10最后修改：[12.10重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs3ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

