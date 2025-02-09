import { Format , LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs16ranking = cfg.gs16ranking
let energy = cfg.energymodel
let e1Dmg = { avg: 0 , dmg: 0 }
let e1qDmg = { avg: 0 , dmg: 0 }
let e1zDmg = { avg: 0 , dmg: 0 }
let e1zqDmg = { avg: 0 , dmg: 0 }
let e1rDmg = { avg: 0 , dmg: 0 }
let e1rqDmg = { avg: 0 , dmg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '逆焰之刃'
let eNameT = 'E'
let qName = '黎明'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '淬炼之剑'
  eNameT = '逆焰之刃'
  qNameT = '黎明'
 }  else if ( NamePath == 3 ) {
  eNameT = '逆焰之刃'
  qNameT = '黎明'
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
const miss = ['h', 'f', 'y', 'hph', 'hps', 'dps']
let ranking = 'undefined'
if (!cfg.gs16ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'dph'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'dph'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'dph'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[迪卢克] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs16ranking}`
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
  title: `${qNameT}后${aName}一段伤害`,
  dmgKey: 'undefined',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${aName}二段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${qNameT}后${aName}二段伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${aName}三段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${qNameT}后${aName}三段伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${aName}四段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${qNameT}后${aName}四段伤害`,
  dmgKey: 'a',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${a2Name}单段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
},
{
  title: `${qNameT}后${a2Name}单段伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
},
{
  title: `${a2Name}终结伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
},
{
  title: `${qNameT}后${a2Name}终结伤害`,
  dmgKey: 'z',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
},
{
  title: `${a3Name}期间伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `${qNameT}后${a3Name}期间伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `低空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `${qNameT}后低空${a3Name}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `高空${a3Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${qNameT}后高空${a3Name}伤害`,
  dmgKey: 'c',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${eName}第一段伤害`,
  dmg: ({ talent }, dmg) => {
    e1Dmg = dmg(talent.e['一段伤害'], 'e')
    return e1Dmg
  }
},
{
  title: `${eName}第一段蒸发`,
  dmg: ({ talent }, dmg) => {
    e1zDmg = dmg(talent.e['一段伤害'], 'e', 'vaporize')
    return e1zDmg
  }
},
{
  title: `${eName}第一段融化`,
  dmg: ({ talent }, dmg) => {
    e1rDmg = dmg(talent.e['一段伤害'], 'e', 'melt')
    return e1rDmg
  }
},
{
  title: `${eName}第二段伤害`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['二段伤害'], 'e')
},
{
  title: `${eName}第二段蒸发`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['二段伤害'], 'e', 'vaporize')
},
{
  title: `${eName}第二段融化`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['二段伤害'], 'e', 'melt')
},
{
  title: `${eName}第三段伤害`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'e')
},
{
  title: `${eName}第三段蒸发`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'e', 'vaporize')
},
{
  title: `${eName}第三段融化`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'e', 'melt')
},
{
  title: `${eName}完整伤害`,
  params: { e: true },
  dmg: ({ talent }, dmg ) => {
    let e1 = e1Dmg
    let e2 = dmg(talent.e['二段伤害'], 'e')
    let e3 = dmg(talent.e['三段伤害'], 'e')
    return {
      dmg: e1.dmg + e2.dmg + e3.dmg ,
      avg: e1.avg + e2.avg + e3.avg
    }
  }
},
{
  title: `${eName}完整蒸发`,
  params: { e: true },
  dmg: ({ talent }, dmg ) => {
    let e1 = e1zDmg
    let e2 = dmg(talent.e['二段伤害'], 'e', 'vaporize')
    let e3 = dmg(talent.e['三段伤害'], 'e', 'vaporize')
    return {
      dmg: e1.dmg + e2.dmg + e3.dmg ,
      avg: e1.avg + e2.avg + e3.avg
    }
  }
},
{
  title: `${eName}完整融化`,
  dmgKey: 'e',
  params: { e: true },
  dmg: ({ talent }, dmg ) => {
    let e1 = e1rDmg
    let e2 = dmg(talent.e['二段伤害'], 'e', 'melt')
    let e3 = dmg(talent.e['三段伤害'], 'e', 'melt')
    return {
      dmg: e1.dmg + e2.dmg + e3.dmg ,
      avg: e1.avg + e2.avg + e3.avg
    }
  }
},
{
  title: `${qName}爆发伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
},
{
  title: `${qName}爆发蒸发`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'vaporize')
},
{
  title: `${qName}爆发融化`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'melt')
},
{
  title: `${qName}每段伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
},
{
  title: `${qName}每段蒸发`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q', 'vaporize')
},
{
  title: `${qName}每段融化`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q', 'melt')
},
{
  title: `${qName}完整伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg ) => {
    let q1 = dmg(talent.q['斩击伤害'], 'q')
    let q2 = dmg(talent.q['持续伤害'], 'q')
    let q3 = dmg(talent.q['爆裂伤害'], 'q')
    e1qDmg = dmg(talent.e['一段伤害'], 'e')
    return {
      dmg: q1.dmg + q2.dmg * 8 + q3.dmg ,
      avg: q1.avg + q2.avg * 8 + q3.avg
    }
  }
},
{
  title: `${qName}完整蒸发`,
  params: { q: true },
  dmg: ({ talent }, dmg ) => {
    let q1 = dmg(talent.q['斩击伤害'], 'q', 'vaporize')
    let q2 = dmg(talent.q['持续伤害'], 'q')
    let q4 = dmg(talent.q['持续伤害'], 'q', 'vaporize')
    let q3 = dmg(talent.q['爆裂伤害'], 'q')
    e1zqDmg = dmg(talent.e['一段伤害'], 'e', 'vaporize')
    return {
      dmg: q1.dmg + q2.dmg * 6 + q3.dmg + q4.dmg * 2 ,
      avg: q1.avg + q2.avg * 6 + q3.avg + q4.avg * 2
    }
  }
},
{
  title: `${qName}完整融化`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg ) => {
    let q1 = dmg(talent.q['斩击伤害'], 'q', 'melt')
    let q2 = dmg(talent.q['持续伤害'], 'q')
    let q4 = dmg(talent.q['持续伤害'], 'q', 'melt')
    let q3 = dmg(talent.q['爆裂伤害'], 'q')
    e1rqDmg = dmg(talent.e['一段伤害'], 'e', 'melt')
    return {
      dmg: q1.dmg + q2.dmg * 6 + q3.dmg + q4.dmg * 2 ,
      avg: q1.avg + q2.avg * 6 + q3.avg + q4.avg * 2
    }
  }
},
{
  title: '单人站场12秒',
  params: { q: true , e: true },
  dmg: ({ talent , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'], 'a')
    let cons6 = cons * 1 >= 6 ? 2 : 1
    let e1 = e1qDmg
    let e2 = dmg(talent.e['二段伤害'], 'e')
    let e3 = dmg(talent.e['三段伤害'], 'e')
    let q1 = dmg(talent.q['斩击伤害'], 'q')
    let q2 = dmg(talent.q['持续伤害'], 'q')
    let q3 = dmg(talent.q['爆裂伤害'], 'q')
    return {
      dmg: ( a1.dmg + a2.dmg ) * 3 + ( a3.dmg + a4.dmg ) * cons6 + e1.dmg + e2.dmg + e3.dmg + q1.dmg + q2.dmg * 8 + q3.dmg ,
      avg: ( a1.avg + a2.avg ) * 3 + ( a3.avg + a4.avg ) * cons6 + e1.avg + e2.avg + e3.avg + q1.avg + q2.avg * 8 + q3.avg
    }
  }
},
{
  title: '单人站场12秒蒸发',
  params: { q: true , e: true },
  dmg: ({ talent , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'vaporize')
    let cons6 = cons * 1 >= 6 ? 2 : 1
    let e1 = e1zqDmg
    let e2 = dmg(talent.e['二段伤害'], 'e', 'vaporize')
    let e3 = dmg(talent.e['三段伤害'], 'e', 'vaporize')
    let q1 = dmg(talent.q['斩击伤害'], 'q', 'vaporize')
    let q2 = dmg(talent.q['持续伤害'], 'q')
    let q4 = dmg(talent.q['持续伤害'], 'q', 'vaporize')
    let q3 = dmg(talent.q['爆裂伤害'], 'q', 'vaporize')
    return {
      dmg: ( a1.dmg + a2.dmg ) * 3 + ( a3.dmg + a4.dmg ) * cons6 + e1.dmg + e2.dmg + e3.dmg + q1.dmg + q2.dmg * 6 + q4.dmg * 2 + q3.dmg ,
      avg: ( a1.avg + a2.avg ) * 3 + ( a3.avg + a4.avg ) * cons6 + e1.avg + e2.avg + e3.avg + q1.avg + q2.avg * 6 + q4.dmg * 2 + q3.avg
    }
  }
},
{
  title: '单人站场12秒融化',
  dmgKey: 'dph',
  params: { q: true , e: true },
  dmg: ({ talent , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'melt')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'melt')
    let cons6 = cons * 1 >= 6 ? 2 : 1
    let e1 = e1rqDmg
    let e2 = dmg(talent.e['二段伤害'], 'e', 'melt')
    let e3 = dmg(talent.e['三段伤害'], 'e', 'melt')
    let q1 = dmg(talent.q['斩击伤害'], 'q', 'melt')
    let q2 = dmg(talent.q['持续伤害'], 'q')
    let q4 = dmg(talent.q['持续伤害'], 'q', 'melt')
    let q3 = dmg(talent.q['爆裂伤害'], 'q', 'melt')
    return {
      dmg: ( a1.dmg + a2.dmg ) * 3 + ( a3.dmg + a4.dmg ) * cons6 + e1.dmg + e2.dmg + e3.dmg + q1.dmg + q2.dmg * 6 + q4.dmg * 2 + q3.dmg ,
      avg: ( a1.avg + a2.avg ) * 3 + ( a3.avg + a4.avg ) * cons6 + e1.avg + e2.avg + e3.avg + q1.avg + q2.avg * 6 + q4.dmg * 2 + q3.avg
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let consn = 0
  let weaponnn = 0
  let weaponconsn= 0
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
      weaponnn = 3 * 3
    }
    if (weapon.affix == 2) {
      weaponnn = 3.5 * 3
    }
    if (weapon.affix == 3) {
      weaponnn = 4 * 3
    }
    if (weapon.affix == 4) {
      weaponnn = 4.5 * 3
    }
    if (weapon.affix == 5) {
      weaponnn = 5 * 3
    }
  }
  if (weapon.name === '西风大剑') {
    weaponn = 3 * 2 * 2
  }
  if (weapon.name === '祭礼大剑') {
    weaponn = 4 * 3
  }
  if (cons >= 6) {
    consn = 2
  }
  if (weapon.name === '松籁响起之时') {
  weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  return {
    avg: Format.percent( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn ) ) / ( 40 - weaponnn - ( 0.2732 * ( 8 + consn + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
}]

export const defParams = { monv: 3 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '迪卢克天赋：[永不休止] 重击的体力消耗降低[_a2StaminaPct]%，持续时间延长[_a2SustainedPlus]秒',
  data: {
    _a2StaminaPct: 50 ,
    _a2SustainedPlus: 3
  }
},
{
  check: ({ params }) => params.q === true ,
  title: '迪卢克天赋：[熔毁之翼] 黎明提供的火元素附魔效果持续期间，获得[dmg]%火元素伤害加成',
  data: {
    dmg: 20
  }
},
{
  title: '迪卢克1命：[罪罚裁断] 对于生命值高于50%的敌人，造成伤害提高[dmg]%',
  cons: 1,
  data: {
    dmg: 15
  }
},
{
  title: '迪卢克2命：[罪罚裁断] 受到伤害时，攻击力提高[atkPct]%，攻击速度提高[_aSpeed]%',
  cons: 2,
  data: {
    atkPct: 10 * 3 ,
    _aSpeed: 5 * 3
  }
},
{
  check: ({ params }) => params.e === true ,
  title: '迪卢克4命：[罪罚裁断] 施放逆焰之刃的2秒后，下一段逆焰之刃的伤害提高[eDmg]%',
  cons: 4,
  data: {
    eDmg: 40
  }
},
{
  title: '迪卢克6命：[清算黑暗的炎之剑] 施放逆焰之刃后，普通攻击的攻击速度提升[_aSpeed]%，造成伤害提高[aDmg]%',
  cons: 6,
  data: {
    _aSpeed: 30 ,
    aDmg: 30
  }
},
 'vaporize',
{title: `5.25最后修改：[5.12重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs16ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

