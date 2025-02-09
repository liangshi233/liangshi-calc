import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs69ranking = cfg.gs69ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a2Name2 = '花筥箭'
let a3Name = '下落攻击'
let eName = '识果种雷'
let eNameT = 'E'
let qName = '造生缠藤箭'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '藏蕴破障'
  eNameT = '识果种雷'
  qNameT = '造生缠藤箭'
 } else if ( NamePath == 3 ) {
  eNameT = '识果种雷'
  qNameT = '造生缠藤箭'
 } else if ( NamePath == 4 ) {
  a2Name2 = '二段重击'
  eName = '元素战技'
  qName = '元素爆发'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a2Name2 = '二段重击'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  a2Name = 'Z'
  a2Name2 = 'Z2'
  a3Name = '戳'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['f', 'h', 'y','hph','hps']
let ranking = 'undefined'
if (!cfg.gs69ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'dps'
   }  else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[提纳里] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${gs69ranking}`
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
    let a1 = dmg(talent.a['三段伤害'] / 2 , 'a', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${aName}四段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
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
  title: '瞄准射击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'], 'a2', 'phy')
},
{
  title: `${a2Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段蓄力瞄准射击'], 'a2')
},
{
  title: `${a2Name}激化`,
  dmg: ({ talent }, dmg) => dmg(talent.a['一段蓄力瞄准射击'], 'a2', 'spread')
},
{
  title: `${a2Name2}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['花筥箭伤害'], 'a2')
},
{
  title: `${a2Name2}激化`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
},
{
  title: '单支藏蕴花矢伤害',
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['藏蕴花矢伤害'], 'a2')
},
{
  title: '单支藏蕴花矢激化',
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
},
{
  title: `${a2Name2}总伤害`,
  dmg: ({ talent, cons }, dmg) => {
    let d1 = dmg(talent.a['花筥箭伤害'], 'a2')
    let d2 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let count = cons * 1 >= 6 ? 5 : 4
    return {
      dmg: d1.dmg + d2.dmg * count,
      avg: d1.avg + d2.avg * count
    }
  }
},
{
  title: `${a2Name2}总激化`,
  dmgKey: 'z',
  dmg: ({ talent, cons }, dmg) => {
    let d1 = dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
    let d2 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let d3 = dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
    let count = cons * 1 >= 6 ? 4 : 3
    return {
      dmg: d1.dmg + d2.dmg * count + d3.dmg,
      avg: d1.avg + d2.avg * count + d3.avg
    }
  }
},
{
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {

  title: `${eName}激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  title: '缠藤箭伤害',
  params: { q: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['缠藤箭伤害'], 'q')
},
{
  title: '缠藤箭蔓激化伤害',
  params: { q: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['缠藤箭伤害'], 'q', 'spread')
},
{
  title: '次级缠藤箭伤害',
  params: { q: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['次级缠藤箭伤害'], 'q')
},
{
  title: '次级缠藤箭蔓激化',
  params: { q: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['次级缠藤箭伤害'], 'q', 'spread')
},
{
  title: `${qName}完整伤害`,
  params: { q: 1 },
  dmg: ({ talent, cons }, dmg) => {
    let q1 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q2 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    return {
      dmg: q1.dmg * 6 + q2.dmg * 6 ,
      avg: q1.avg * 6 + q2.avg * 6
    }
  }
},
{
  title: `${qName}完整激化`,
  dmgKey: 'q',
  params: { q: 2 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['缠藤箭伤害'] , 'q', 'spread')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q3 = dmg(talent.q['次级缠藤箭伤害'] , 'q', 'spread')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    return {
      dmg: q1.dmg * 2 + q2.dmg * 4 + q3.dmg * 2 + q4.dmg * 4,
      avg: q1.avg * 2 + q2.avg * 4 + q3.avg * 2 + q4.avg * 4
    }
  }
},
{
  title: '单人站场12秒',
  params: { q: 1 },
  dmg: ({ talent, cons }, dmg) => {
    let z1 = dmg(talent.a['花筥箭伤害'], 'a2')
    let zx1 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    let count = cons * 1 >= 6 ? 1 : 0
    return {
      dmg: count * ( z1.dmg * 1 + zx1.dmg * 5 ) + z1.dmg * 5 + zx1.dmg * 20 + q2.dmg * 6 + q4.dmg * 6 ,
      avg: count * ( z1.avg * 1 + zx1.avg * 5 ) + z1.avg * 5 + zx1.avg * 20 + q2.avg * 6 + q4.avg * 6
    }
  }
},
{
  title: '单人站场12秒激化',
  params: { q: 2 },
  dmg: ({ talent, cons }, dmg) => {
    let z1 = dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
    let zx1 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let zx2 = dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
    let q1 = dmg(talent.q['缠藤箭伤害'] , 'q', 'spread')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q3 = dmg(talent.q['次级缠藤箭伤害'] , 'q', 'spread')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    let count = cons * 1 >= 6 ? 1 : 0
    return {
      dmg: count * ( z1.dmg * 1 + zx1.dmg * 3 + zx2.dmg * 2 ) + z1.dmg * 5 + zx1.dmg * 13 + zx2.dmg * 7 + q1.dmg * 2 + q2.dmg * 4 + q3.dmg * 2 + q4.dmg * 4 ,
      avg: count * ( z1.avg * 1 + zx1.avg * 3 + zx2.avg * 2 ) + z1.avg * 5 + zx1.avg * 13 + zx2.avg * 7 + q1.avg * 2 + q2.avg * 4 + q3.avg * 2 + q4.avg * 4
    }
  }
},
{
 	title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let consn = 0
  let weaponnn = 0
  if (weapon.name === '西风猎弓') {
    weaponn = 3 * 2 * 2
  }
  if (weapon.name === '祭礼弓') {
    weaponn = 3.5 * 3
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 3.5 * 3 + weaponn + energy ) ) / 40 ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  params: { q: 1 },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let z1 = dmg(talent.a['花筥箭伤害'], 'a2')
    let zx1 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    let count = cons * 1 >= 6 ? 1 : 0
    let weaponn = 0
    let consn = 0
    let weaponnn = 0
    if (weapon.name === '西风猎弓') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼弓') {
      weaponn = 3.5 * 3
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 3.5 * 3 + weaponn + energy ) ) / 40 )
    return {
      dmg: ( count * ( z1.dmg * 1 + zx1.dmg * 5 ) + z1.dmg * 5 + zx1.dmg * 20 + ( q2.dmg * 6 + q4.dmg * 6 ) * qcn ) / 12 ,
      avg: ( count * ( z1.avg * 1 + zx1.avg * 5 ) + z1.avg * 5 + zx1.avg * 20 + ( q2.avg * 6 + q4.avg * 6 ) * qcn ) / 12
    }
  }
},
{
  title: '单人站场期望DPS激化',
  dmgKey: 'dps',
  params: { q: 2 },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
    let z1 = dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
    let zx1 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let zx2 = dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
    let q1 = dmg(talent.q['缠藤箭伤害'] , 'q', 'spread')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q3 = dmg(talent.q['次级缠藤箭伤害'] , 'q', 'spread')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    let count = cons * 1 >= 6 ? 1 : 0
    let weaponn = 0
    let consn = 0
    let weaponnn = 0
    if (weapon.name === '西风猎弓') {
      weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼弓') {
      weaponn = 3.5 * 3
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 3.5 * 3 + weaponn + energy ) ) / 40 )
    return {
      dmg: ( count * ( z1.dmg * 1 + zx1.dmg * 3 + zx2.dmg * 2 ) + z1.dmg * 5 + zx1.dmg * 13 + zx2.dmg * 7 + ( q1.dmg * 2 + q2.dmg * 4 + q3.dmg * 2 + q4.dmg * 4 ) * qcn ) / 12 ,
      avg: ( count * ( z1.avg * 1 + zx1.avg * 3 + zx2.avg * 2 ) + z1.avg * 5 + zx1.avg * 13 + zx2.avg * 7 + ( q1.avg * 2 + q2.avg * 4 + q3.avg * 2 + q4.avg * 4 ) * qcn ) / 12
    }
  }
},
{
  title: '提万妲eQ3ae3a激化伤害',
  params: { q: 2 , teamA: true , wan: true },
  dmg: ({ talent, cons }, dmg) => {
    let d1 = dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
    let d2 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let d3 = dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
    let q1 = dmg(talent.q['缠藤箭伤害'] , 'q', 'spread')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q3 = dmg(talent.q['次级缠藤箭伤害'] , 'q', 'spread')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    let count = cons * 1 >= 6 ? 4 : 2
    return {
      dmg: 3 * ( d1.dmg * count + d2.dmg * 6 + d3.dmg * 2 ) + q1.dmg * 2 + q2.dmg * 4 + q3.dmg * 2 + q4.dmg * 4 ,
      avg: 3 * ( d1.avg * count + d2.avg * 6 + d3.avg * 2 ) + q1.avg * 2 + q2.avg * 4 + q3.avg * 2 + q4.avg * 4
    }
  }
},
{
  title: '提八妲钟 重击总激化',
  params: { q: 2 , teamA: true , zhong: true },
  dmg: ({ talent, cons }, dmg) => {
    let d1 = dmg(talent.a['花筥箭伤害'], 'a2', 'spread')
    let d2 = dmg(talent.a['藏蕴花矢伤害'], 'a2')
    let d3 = dmg(talent.a['藏蕴花矢伤害'], 'a2', 'spread')
    let count = cons * 1 >= 6 ? 4 : 3
    return {
      dmg: d1.dmg + d2.dmg * count + d3.dmg,
      avg: d1.avg + d2.avg * count + d3.avg
    }
  }
},
{
  title: '提八妲钟 Q总激化',
  params: { q: 2 , teamA: true , zhong: true },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['缠藤箭伤害'] , 'q', 'spread')
    let q2 = dmg(talent.q['缠藤箭伤害'] , 'q')
    let q3 = dmg(talent.q['次级缠藤箭伤害'] , 'q', 'spread')
    let q4 = dmg(talent.q['次级缠藤箭伤害'] , 'q')
    return {
      dmg: q1.dmg * 2 + q2.dmg * 4 + q3.dmg * 2 + q4.dmg * 4,
      avg: q1.avg * 2 + q2.avg * 4 + q3.avg * 2 + q4.avg * 4
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '提纳里天赋：[眼识殊明] 提纳里发射花筥箭后，元素精通提升[mastery]点',
  sort: 1,
  data: {
    mastery: 50
  }
},
{
  title: '提纳里天赋：[诸叶辨通] 提纳里的每点元素精通,都会使其重击与造生缠藤箭造成的伤害提升[a2Dmg]%',
  sort: 9,
  data: {
    a2Dmg: ({ calc, attr }) => Math.min( 60 , calc(attr.mastery) * 0.06 ),
    qDmg: ({ calc, attr }) => Math.min( 60 , calc(attr.mastery) * 0.06 )
  }
},
{
  title: '提纳里1命：[由根须断定肇始] 提纳里重击的暴击率提高[a2Cpct]%',
  cons: 1,
  data: {
    a2Cpct: 15
  }
},
{
  title: '提纳里2命：[由茎干剖析来缘] 当识果种雷的识蕴领域中存在敌人时，提纳里获得[dmg]%草元素伤害加成',
  cons: 2,
  data: {
    dmg: 20
  }
},
{
  check: ({ params }) => params.q !== undefined ,
  title: '提纳里4命：[由片叶管窥枯荣] 施放造生缠藤箭时,队伍中附近的所有角色的元素精通提升[mastery]点',
  sort: 1,
  cons: 4,
  data: {
    mastery: ({ params }) => params.q * 60
  }
},
{
  title: '提纳里6命：[由硕实品论应果] 花筥箭所需的蓄力时间减少[_a2Speed]秒,并在命中后能产生1枚额外的藏蕴花矢',
  cons: 6,
  data: {
    _a2Speed: 0.9
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升和[atkPct]%攻击力',
  check: ({ params , cons }) => (cons < 6 && cons > 1) && params.wan === true,
  sort: 1,
  data: {
    atkPct: 20,
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16
  }
},
{
  title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升和[atkPct]%攻击力',
  check: ({ params , cons }) => cons >= 6 && params.wan === true,
  sort: 1,
  data: {
    atkPct: 40,
    aDmg: 32,
    a2Dmg: 32,
    a3Dmg: 32
  }
},
{
  title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
  check: ({ params , cons }) => cons >= 2 && params.wan === true,
  sort: 1,
  data: {
    mastery: 200
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
  title: '纳西妲圣遗物：[深林的记忆4] 元素战技或元素爆发命中敌人后,使命中目标的草元素抗性降低[kx]%',
  check: ({ params , artis }) => params.teamA === true && artis.深林的记忆 !== 4 ,
  data: {
    kx: 30
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
  title: '纳西妲2命：[正等善见之根] 处于纳西妲施加的蕴种印状态下的敌人,受到原激化、超激化、蔓激化反应影响后,防御力降低[enemyDef]%',
  check: ({ params , cons }) => cons >= 2 && params.teamA === true,
  data: {
    enemyDef: 30
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  check: ({ params }) => params.zhong === true,
  data: {
    kx: 20
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '元素共鸣：[蔓生之草] 元素精通合计提升[mastery]点,触发燃烧、原激化、绽放反应后,队伍中附近的所有角色元素精通提升,触发超激化、蔓激化、超绽放、烈绽放反应后,队伍中附近的所有角色元素精通再次提升',
  sort: 1,
  data: {
    mastery: 100
  }
},
 'spread',
{title: `5.22最后修改：[11.1重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs69ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

